# middleplate
A feature-rich boilerplate for Middleman

## TOC

1. [Installation](#installation "Installation")
2. [Development](#development "Development")
	1. [File structure](#file-structure "File Structure")
2. [Checklist](#checklist "Checklist")
2. [Deployment](#deployment "Deployment")
2. [Troubleshooting](#troubleshooting "Troubleshooting")
3. [Contributors and origin](#contributors-and-origin "Contributors and origin")

## Installation

Download this repo as a zip, drop it into your desired project folder. For example’s sake we’ll say we’re creating `hello_app`.

Once you’ve unzipped Middleplate into your folder, `cd` to that folder in Terminal, and run `bundle install` (you may need to `sudo` it):

```
cd example/path/to/folder/hello_app
bundle install
```

If all is well you’ll get a `Your bundle is complete!` message and you’re good to go.

From there you just need set it on its way:

```
bundle exec middleman
```

This will load Middleman and allow you to access your site at `http://0.0.0.0:4567` or `localhost:4567` (unless you’ve set a different default port).

## Development

### File Structure

While the majority of these will be similar to a standard Middleman install, some have been adapted to reflect the way the Fueled boilerplate works, and others to add other features to Middleplate that Middleman doesn’t offer out of the box.

#### Data

In the `data` directory, you’ll find (and you should store) any YAML data files that are referred to throughout your build. For example, if you were to create a directory you’d store the `people.yml` file in here using a structure similar to this (or you can brush up on it [here](http://www.yaml.org/ "Visit the YAML site"):

```
people:
    -   name: "Joe Bloggs"
        title: "CEO"
        dob: "01/01/1959"
        pets:
            -   species: "Dog"
                type: "Pug"
                name: "Captain Pugwash"
    -		name: "Josephine Doe"
    		title: "CFO"
    		dob: "01/01/1963"
```

#### Source

The `source` directory will be your main port of call and contains almost all of the working parts of your Middleplate build. Read on and you’ll find out exactly what’s in here and what it does.

#### Articles

#### Assets

This is where your site assets live (obviously), read the [assets section](#assets "Assets") to find out more about the individual filesets in action here.

#### Content

Inside `content` is where you’re going to want to store any page-specific assets, or blog content that isn’t something that’s accessed on a global level. For example, your SVG logo? That’ll live in `assets/images/…`; but that awesome selfie of you in a beach in the Bahamas for your blog post about how amazing 2014 was? That definitely lives in `content`.

The way the file structure works in `content` is pretty simple – years and months. You’ll see that it comes default with `content/2015` and `content/2015/01`, but you can create them as and when you need them. So if your blog post was posted on 14 February 2013 (because who doesn’t love a retrospective Valentine’s day post) then you’d create a `2013` folder in `content` and then a `02` folder within that.

Just remember that when you reference images from here, that you need to include the content directory in the image helper:

```
<%= image_tag '#{content_dir}bahamas_selfie.jpg', alt: "Sunset in the bahamas" %>
```

This isn’t necessarily just for images, you could put all kinds of things in here: PDF documents, video attachments, or even super awesome PDFs that prove you’re a front-ender who can design.

#### Layouts

There’s a subtle difference between layouts and templates. Templates are the content of the page, that are then wrapped in the layouts. So you’d have the cool, gorgeous, wizzy stuff in templates (which we’ll get onto [later](#templates "Templates")); and the meta data, `<head>` items etc all in the layout.

The main layout file you’ll be using is `source/layouts/layout.erb` and this forms the main page wrap.

You’ll notice that there’s also a `blog_layout.erb` file in there as well, which when defined in the `config.rb` file overrides the regular `layout.erb` file; but here is where the magic happens: line one of `blog_layout.erb` has a little ruby function that wraps that layout, with the the `layout.erb` file:

```
<% wrap_layout :layout do %>
```

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

##### Custom pages

All of the files that end in `html.erb` in the root `source` folder are custom pages and will be created (without defining them in the `data/pages.yml`). For example `404.html.erb` is our 404 page, and has a custom layout so has its own file.

Use this to create one off pages, or to have ones that use the basic general structure, but have some custom trickery in the middle.

##### robots.txt

This is a simple robots file that allows easy crawling of your site.

__Make sure you go into this one and change it to be your details because it’s not handled by any ruby config magic__. Don’t say I didn’t warn you.

##### feed.xml.builder

If your `config.rb` file is set up properly (and it is), this file will create a smashing RSS feed when you [hit build](#deployment "Deployment") on your project.

Similarly to the `robots.txt` file __make sure you go into this one and change it to be your details__.

##### .htaccess.apache.erb

This generates a wizzy .htaccess file (using the information you’ve set in `data/htaccess.yml`) and basically covers redirects, gzipping etc etc. You’ll probably not need to change much on this one (just in it’s relevant data file).

### Assets

## Checklist

## Deployment

## Troubleshooting

For any issues, first check the [Middleman docuimentation](https://middlemanapp.com/basics/install/ "Read the Middleman docs"), as it’s likely that there will be an answer in there (especially for installation).

If you’re still having problems feel free to ping me [on Twitter](https://twitter.com/robsterlini "Get in touch via Twitter") or via [my site](https://robsterlini.co.uk/contact/ "Get in touch via my website").

## Contributors and origin

Middleplate is built on the [Fueled boilerplate](https://github.com/fueled/fueled-boilerplate). Find out more about Fueled at [fueled.com](http://fueled.com "Visit the Fueled website").
