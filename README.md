# middleplate

A feature-rich boilerplate for Middleman by [Rob Sterlini](https://robsterlini.co.uk "Visit my website").

### Contents

1. [Installation](#installation "Installation")
1. [Development](#development "Development")
    1. [File structure](#file-structure "File Structure")
    1. [Assets](#assets-1 "Assets") 
    1. [Config](#pages "Config")
    1. [Pages](#pages-1 "Pages")
    1. [Blogging](#blogging-1 "Blogging")
1. [Deployment](#deployment "Deployment")
    1. [Checklist](#checklist "Checklist")
    1. [Build](#build-1 "Build")
1. [Troubleshooting](#troubleshooting "Troubleshooting")
1. [Examples](#examples "Examples")
1. [Contributors and origin](#contributors-and-origin "Contributors and origin")
 
## Installation
 
For full Middleman installation instructions head to [their site](https://middlemanapp.com/basics/install/ "Read about installing Middleman on their site"), but here are the basics.

Jump into terminal and lob this command at it (you may need to `sudo` it):

    $ gem install middleman

This gives us use of three main commands: `middleman init`, `middleman server` and `middleman build`; we’ll only need the latter two, but we’ll come back to them.

### Installing Middleplate

There’s probably a command-line way of doing this (if you want to write it up and submit a <abbr class="sc" title="pull request">PR</abbr> then I’d love to include it).

The easiest way (and the way I like doing it) is [downloading the .zip file](https://github.com/robsterlini/middleplate "Download the Middleman repo from GitGub") and unpacking it into your desired directory. We’ll imagine we’re building a food blog. Once you’ve done that, cd into the folder and run the server command:

    $ cd ~/sites/food_blog
    $ middleman server

If all goes well you’ll get this:

<pre><code class="hljs nohighlight">== The Middleman is loading
== LiveReload is waiting for a browser to connect
== The Middleman is standing watch at http://0.0.0.0:4567
== Inspect your site configuration at http://0.0.0.0:4567/__middleman/</code></pre>

Navigate to [http://0.0.0.0:4567/](http://0.0.0.0:4567/) or [http://localhost:4567](http://localhost:4567/) (the former sometimes has issues in Chrome), and you’ll see your brand new Middleplate development in action!

## Development

### File Structure

While the majority of these will be similar to a standard Middleman install, some have been adapted to reflect the way the Fueled boilerplate works, and others to add other features to Middleplate that Middleman doesn’t offer out of the box.

#### Data

In the `data` directory, you’ll find (and you should store) any YAML data files that are referred to throughout your build. For example, if you were to create a directory you’d store the `people.yml` file in here using a structure similar to this (or you can brush up on it [here](http://www.yaml.org/ "Visit the YAML site")):

    people:
        -   name: "Joe Bloggs"
            title: "CEO"
            dob: "01/01/1959"
            pets:
                -   species: "Dog"
                    type: "Pug"
                    name: "Captain Pugwash"
        -   name: "Josephine Doe"
            title: "CFO"
            dob: "01/01/1963"

#### Source

The `source` directory will be your main port of call and contains almost all of the working parts of your Middleplate build. Read on and you’ll find out exactly what’s in here and what it does.

#### Articles

This is where the markdown files that power your blog posts live.

The filename is important (and is defined in the blog settings of the `config.rb` file), and should be done as such:

<pre><code class="hljs nohighlight">YYYY-MM-DD-SLUG.html.md.erb
Example: 1991-11-25-this-is-a-blog-post.html.md.erb</code></pre>

Within them you just use standard markdown, write your piece and save it up. Ensure that the date in the frontmatter matches the one in the filename or you’ll get a lovely ruby error.

#### Assets

This is where your site assets live (obviously), read the [assets section](#assets-1 "Assets") to find out more about the individual filesets in action here.

Out of the box, Middleplate ships with the `css`, `js`, and `images`; if you add fonts, or the like then this is where to stick them in.

#### Content

Inside `content` is where you’re going to want to store any page-specific assets, or blog content that isn’t something that’s accessed on a global level. For example, your SVG logo? That’ll live in `assets/images/…`; but that awesome selfie of you in a beach in the Bahamas for your blog post about how amazing 2014 was? That definitely lives in `content`.

The way the file structure works in `content` is pretty simple – years and months. You’ll see that it comes default with `content/2015` and `content/2015/01`, but you can create them as and when you need them. So if your blog post was posted on 14 February 2013 (because who doesn’t love a retrospective Valentine’s day post) then you’d create a `2013` folder in `content` and then a `02` folder within that.

Just remember that when you reference images from here, that you need to include the content directory in the image helper:

    <%= image_tag '#{content_dir}bahamas_selfie.jpg', alt: "Sunset in the bahamas" %>;

This isn’t necessarily just for images, you could put all kinds of things in here: PDF documents, video attachments, or even super awesome PDFs that prove you’re a front-ender who can design.

#### Layouts

There’s a subtle difference between layouts and templates. Templates are the content of the page, that are then wrapped in the layouts. So you’d have the cool, gorgeous, wizzy stuff in templates (which we’ll get onto [later](#templates "Templates")); and the meta data, `<head>` items etc all in the layout.

The main layout file you’ll be using is `source/layouts/layout.erb` and this forms the main page wrap.

You’ll notice that there’s also a `blog_layout.erb` file in there as well, which when defined in the `config.rb` file overrides the regular `layout.erb` file; but here is where the magic happens: line one of `blog_layout.erb` has a little ruby function that wraps that layout, with the the `layout.erb` file:

    <% wrap_layout :layout do %>

This little bit of layout-ception means that we can use a specific layout for this blog page (and indeed any other page if we define it in the config file), whilst still keeping the main wrapping layout file where we define all of our global magic. Cool, huh?

#### Pages

The `pages` directory is similar to the `articles` directory in that this is where we keep the content that powers the dynamic pages (the ones we’ve got defined in `data/pages.yml`). Just ensure that the filenames match and away you go.

Like the articles, these use markdown as well, and should be saved with the `.md.erb` file extension, but we’ve covered all that already!

#### Partials

This is where declare anything that we’ll be using in multiple locations, like our masthead (`partials/_masthead.html.erb`) or our footer (`partials/_footer.html.erb`).

These are pretty straight forward to use, but you can do scaleable things with them by passing variables through them as well. Give the [Middleman partial documentation](https://middlemanapp.com/basics/partials/ "Read about partials in the Middleman docs") a read for more information.

Make sure you name them with the `_filename.html.erb` underscore naming structure or the name police will come and get you (I’m not sure why they have an underscore, they just do).

#### Templates

`templates` is where dynamic page templates live. In the example build we’ve got the `generic-page.html.erb`, which in turn calls the relevant file from the `source/pages` directory via a partial (clever, eh?). Anything you put in here will be inserted into the page (wrapped by the layout). Simples.

#### Remaining files

The remaining miscelanious files fall into a few categories:

- *Custom pages* –
All of the files that end in `html.erb` in the root `source` folder are custom pages and will be created (without defining them in the `data/pages.yml`). For example `404.html.erb` is our 404 page, and has a custom layout so has its own file.
Use this to create one off pages, or to have ones that use the basic general structure, but have some custom trickery in the middle.

- *robots.txt* – 
This is a simple robots file that allows easy crawling of your site. __Make sure you go into this one and change it to be your details because it’s not handled by any ruby config magic__. Don’t say I didn’t warn you.

- *feed.xml.builder* – If your `config.rb` file is set up properly (and it is), this file will create a smashing RSS feed when you [hit build](#deployment "Deployment") on your project.
Similarly to the `robots.txt` file __make sure you go into this one and change it to be your details__.

- *.htaccess.apache.erb* –
This generates a wizzy `.htaccess` file (using the information you’ve set in `data/htaccess.yml`) and basically covers redirects, gzipping etc etc. You’ll probably not need to change much on this one (just in it’s relevant data file).

### Assets

#### CSS

The <span class="sc">CSS</span> is compiled using (Scss flavoured) [Sass](http://sass-lang.com/ "Read up on Sass") out of the box, and an almost identical file structure to the [Fueled Boilerplate](https://github.com/fueled/fueled-boilerplate "Check out the Fueled Boilerplate repo").

It’s split up into three directories, within which the partials live:

    – framework
      – _all.scss
      – _base.scss
      – _bezier.scss
      – …
    – modules
      – _all.scss
      – _buttons.scss
      – _code.scss
      – …
    – ui
      – _all.scss
      – _footer.scss
      – _masthead.scss
      – …
    screen.scss

Each of the folders compiles into their respective `_all.scss`, which in turn compile into our `screen.scss` file. This keeps our file structure clean, and scaleable, whilst still being able to reduce it down into one concise <span class="sc">CSS</span> file.

For more information on how we structure these Sass files at Fueled, read up on it in the [boilerplate Readme](https://github.com/fueled/fueled-boilerplate#scss "Read up on how we use Sass at Fueled").

#### Javascript

The Javascript uses the Fueled Boilerplate methodology with a tweak to function within Middleman. The most important two javascript files in the `assets/js` directory are: `main.js` and `_g.js`.

`main.js` calls the `g._init()` function defined in `_g.js`, which loops through the `g.partials` in the `assets/js` directory defined in `_g.js`.

Let’s say for example you wanted to create a new JS function that alerted users when they clicked any button (purely hypothetical. __Please__ don’t do that!), you’d create a new partial:

<pre><code class="javascript">g.btnAlert = function() {
  var self = g.btnAlert;

  self.selectors = {
    buttons: '.btn'
  }

  $(document).on('click', self.selectors.buttons, function() {
    alert('Holllaaaaa!');
  });

};</code></pre>

You’ll then need to add it to the `g.partials` array in the `_g.js` file; and finally `//= require` it in `main.js`.

There are a few preset partials, as well as Modernizr and our plugins file (where all plugins should be added into), that you can use as examples to create more.

For more information on how we structure these javascript files at Fueled, read up on it in the [boilerplate Readme](https://github.com/fueled/fueled-boilerplate#js "Read up on how we use javascript at Fueled").

#### Images

This one’s pretty self explanitory, and is up to you how you arrange your files, but I tend to create subfolders within images to keep it from becoming one big image soup.

### Config

The `config.rb` file is the most powerful Middleman file there is. It handles pretty much everything, but the Middleplate version ships with some added extras that Middleman doesn’t.

#### Livereload, relative_assets, directory_indexes and autoprefixing

Livereload is turned on by default, if (for whatever reason) you want to turn this off just comment out the following lines:

    configure :development do
      activate :livereload
    end

Relative assets and directory indexes are general Middleman settings and mean you can link in a more scaleable way across the build.

#### Helpers

The only helper that Middleplate comes with is the `to_slug` helper. It’ll convert any string into a sluggified version. For example:

    <%= current_page.title.to_slug %>

#### Default variables

We set a few directories, base URLs, and some general defaults. These are used around the site, and just need updating. They’re all relatively straight forward.

#### Blogging

The blog settings are kept within:

    activate :blog do |blog|
      …
    end

This dictates the naming structure for our article files among other things. Tweak them as you wish.

#### Build

This is where you can control the technologies that run when you come to build it. Out of the box, Middleplate will minify your CSS, javascript and your HTML to save you those precious bytes.

There are a few settings commented out that ship with Middleman, but you can check their documentation for more information.

### Pages

#### Structure and creation

There are two types of pages that come with Middleplate: custom and dynamic.

Custom pages should be saved as their slug in the `source` directory – for example, to create an *About* us page you’d need to create `source/about-us.html.erb`.

Dynamic pages (set up as the two example pages in Middleplate) – use the template (from the `source/templates` directory) defined in the `data/pages.yml` data file. They take their content from their respective markdown files in the `source/content` directory.

To create more template-based pages simply add more entries into the `pages.yml` file in the `data` directory, ensuring that you have declared a valid template.

You can read more about the dynamic pages in the [Middleman docs](https://middlemanapp.com/advanced/dynamic_pages/ "Read up on dynamic pages in the Middleman docs").

#### Front-matter

Each custom page needs front-matter at the top of head of the file:

<pre><code class="hljs nohighlight">---
title: Made with Middleplate
description: This is the description for the home page, and will be used in the meta and Twitter description fields
priority: 1.0
---</code></pre>

This is used throughout the templates, but mostly in `layouts/layout.erb` to populate the various page-specific information.

### Blogging

The blogging is ridiculous simple. It just works.

To give the post a category, set it in the frontmatter of your blog post:

<pre><code class="hljs nohighlight">tags: CATEGORY HERE</code></pre>

You can also set a <abbr class="sc" title="Too long; didn’t read">TL;DR</abbr> for the post; use it to summarise the post for readers to get a feel for the article without having to read it. Totally up to you, it’s optional.

## Deployment

### Checklist

Before going on to the build stage, make sure you’ve given [this little checklist](https://robsterlini.co.uk/middleplate/documentation#checklist "Check over the pre-build list in the Middleplate documentation") to make sure you’ve covered all of the settings that need updating with your information.

### Build

It’s go time. If everything’s looking ready to ship (or you just want to build out some static HTML that you can stick on a developmental site) then you need the other Middleman command from the start:

    $ middleman build

If this is the first time you’ve done the command, it’ll create a new directory in the root called `build`. This, if everything has gone to plan, now houses your totally static build. Open up your <span class="sc">FTP</span> and upload it.

Bosh!

<h2 id="troubleshooting">Trouble&shy;shooting</h2>

For any issues, first check the [Middleman documentation](https://middlemanapp.com/basics/install/ "Read the Middleman docs"), as it’s likely that there will be an answer in there (especially for installation).

If you’re still having problems feel free to ping me [on Twitter](https://twitter.com/robsterlini "Get in touch via Twitter") or via [my site](https://robsterlini.co.uk/contact/ "Get in touch via my website").

## Examples

Here’s just a little list of sites running Middleman that have an public repo:

#### Built on Middleman

- [robsterlini.co.uk](github.com/robsterlini/robsterlini.co.uk "The GitHub repo for robsterlini.co.uk")
- fueled.com (has a private repo)

#### Built on Middleplate

- Noone has taken the plunge yet. Be the first!

If there are any sites that you want added to either of this list just [get in touch](https://robsterlini.co.uk/contact "Get in touch about getting your site added to these lists").

## Contributors and origin

Middleplate is built on the [Fueled boilerplate](https://github.com/fueled/fueled-boilerplate). Find out more about Fueled at [fueled.com](http://fueled.com "Visit the Fueled website").

And so far everything has been done by me, Rob Sterlini; but that’s only one pull request away! I’d love your contributions if you see anything that needs correcting, or have any improvements to make. Collaborate, collaborate, collaborate!