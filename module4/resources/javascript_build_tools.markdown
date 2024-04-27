---
layout: page
title: Intro to JavaScript Build Tools
length: 60 mins
tags: javascript, gulp, webpack, grunt
---

Intro to JavaScript Build Tools
===============

Goals
--------------

By the end of this lesson, you will know/be able to:

*   Understand the purpose of client side build tools
*   Understand what Webpack is and what it does for us

Warm Up
--------------

Read this [article](https://x-team.com/blog/webpack-can-absolute-beginners/) for an overview of Webpack.

What is Webpack?
--------------

[Webpack](https://webpack.github.io/) is a module bundler. Think of it as the Asset Pipeline, but _way_ better and without Rails.

If you remember, in Quantified Self, your `html` code may have looked like this:

![Imgur](http://i.imgur.com/Fr5xoLk.png)

With a semi-simple application like Quantified Self, you may need to add script tags for each individual JavaScript or CSS file. Imagine what this would be like if we continued to add complexity to Quantified Self. This will most likely get messy - it already is looking pretty messy! Enter: Webpack.

Webpack is going to allow us to load a single JS file. This is one of the major benefits of Webpack (or another frontend build tool) -- it will package all of our JS files and their dependencies into a single bundle that we can load.

Install Some Command Line Tools
--------------

Before we get started, let's install some command line tools. We'll also use local versions of these packages, but the in order to use global commands, we'll need to install them globally as well.

```
npm install -g webpack webpack-dev-server mocha
```

This will install [Webpack](http://webpack.github.io/) and [Mocha](https://mochajs.org/) command line tools globally -- hence the `-g` flag -- on your file system.

You'll be able to run these tools with the `webpack`, `webpack-dev-server`, and `mocha` command respectively.

Creating your first Webpack project

First, create a directory for your project:

```
mkdir webpack-walkthrough
cd webpack-walkthrough
git init
```

Setting Up npm
-----

At this point, we have a very simple project. Basically, we have a folder. Let's initialize `npm` and then install some dependencies.

First, create your project with:

```
npm init
```

You'll be guided through a command-line setup "wizard", prompting you for some info on your project such as its:

*   Name
*   Author
*   Version
*   Description
*   License, etc.

For most of these items you can use the default option by pressing `Enter`.

Finally, install our libary dependencies with `npm install`:

```
npm install --save-dev webpack webpack-dev-server mocha mocha-loader chai
```

We installed a few development dependencies:

*   [Webpack](http://webpack.github.io/)
*   [Webpack Development Server](http://webpack.github.io/docs/webpack-dev-server.html)
*   [Mocha](https://mochajs.org/)
*   A Webpack loader for Mocha
*   [Chai](http://chaijs.com/)

### Recommended: sane `.gitignore` defaults

*   [NPM](https://www.npmjs.com/) vs. [Bundler](http://bundler.io/) dependency storage
*   Git strategy -- keeping diffs meaningful and project churn low
*   Git problems caused by versioning dependencies or other frequently
  changing files

For these reasons, it's often helpful to start with a `.gitignore` file which includes "sane defaults" for NPM projects.
One example is provided on github, and we can easily include it in our newly created project by pulling the file down with
`curl`:

```
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore > .gitignore
```

### Adding a README.md

We'll also want to add a README.md documentation file.

```
touch README.md
```

As we continue along in the coding process, we should leave breadcrumbs for ourselves in this file.

Here's a good start for our README.md

```
# Webpack Walkthrough

To install the dependencies:

npm install
```

Filling out the Project
-----------

Next, let's create some empty files and folders for our future code:

```
mkdir lib test
touch lib/index.js test/index.js
```

Our directory structure should look like this:

```
lib/
  index.js
node_modules/
test/
  index.js
.gitignore
package.json
README.md
```

Setting Up Our HTML
---------------

__Discussion: Application Entry Points__

*   What is needed to trigger an application to "run" in its most standard configuration?
*   How do we run a rails project? It's test suite?

You'll want an HTML page that loads up each of your bundles in the browser.

We'll create two HTML files: `touch index.html test.html` 
These will provide entry points to our application and test suite, respectively

Below is an example of the basic structure you can use:

__index.html__

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Webpack Walkthrough</title>
</head>
<body>
  <script src="main.bundle.js"></script>
</body>
</html>
```

The important part is the third line from the bottom:

```
<script src="main.bundle.js"></script>
```

This is the line that loads up your bundle. Notice that we only have to load a single JS file. This is one of the major benefits of Webpack (or another frontend build tools) -- it will package all of our JS files and their dependencies into a single bundle that we can load.

Since the `index.html` file is the entry point for our application, we're loading in the "main" bundle.

For our `test.html` file, we'll have almost the same thing, except we'll load in the test bundle:

__test.html__

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Webpack Walkthrough Tests</title>
</head>
<body>
  <script src="test.bundle.js"></script>
</body>
</html>
```

Note that these pages won't work yet, since the bundles themselves have not yet been built.

Setting Up Webpack
----------------

We installed Webpack it earlier, but let's add a configuration file:

```
touch webpack.config.js
```

In that file, add the following contents:

```js
const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  }
}
```

In the above configuration, we're telling Webpack that we'd like it to build two different bundles: our main application and our test suite (these are the 2 distinct bundles we referenced from our 2 entry point `html` files).

We can build the files once with `webpack` or we can set up a development server that will reload our changes with `webpack-dev-server`.

Let's fire up `webpack-dev-server` and head over to `http://localhost:8080/`.

Our First Test
-------------

In `test/index.js`, let's write our first test:

```js
const assert = require('chai').assert;

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});
```

Visit `http://localhost:8080/test.html` to confirm that it works.

__Note:__ You can require additional test files by using `require('other-test-file')`. As your project becomes more complicated, you'll probably want to keep your actual tests broken up into separate files, and simply use `test/index.js` to
pull them all together.

**Keep in mind:**

*   Requiring files is path-relative to the file you are requiring _from_ (i.e. if you want to require a file in your project root into `lib/index.js`, you'll need to step up one directory level to access it)

__Your Turn -- additional test files__

*   Create 2 additional test files in your `test` directory
*   To each one, add a basic example test similar to the one we added to `test/index.js`. Make sure your tests have different names so we can tell them apart.
*   Require your 2 new files from `index.js`
*   Refresh your `test.html` file and make sure all 3 tests appear (the original one plus the 2 you added)

__Your Turn -- additional JS files__

* Create 2 additional JS files in your `lib` directory. See if you can get them to load using webpack (remember you'll need to require them)

Additional Loaders
--------------

Like the Asset Pipeline in Rails, Webpack can transpile assets during the build process. An example of this is if we want to write in SCSS. The browser can only run CSS, so we have to convert our assets for the browser. 

Webpack handles this using _loaders_. There are many loaders on npm. We'll discuss just a few of them. Loaders allow you to preprocess files as you require or load them. Loaders can transform files from a different language like CoffeeScript to JavaScript or SCSS to CSS.

The first step is to download and install the dependencies for the loaders you'd like to use.

```
npm install --save-dev css-loader style-loader sass-loader node-sass
```

In our `webpack.config.js`, we can add another property called `module`:

```js
const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
    ]
  }
}
```

Here, "test" is a regular expression that tests what kind of files to run through the loader specified. Above, we're declaring that any files ending in `css` or `scss` will be run through the loader specified. You might be wondering what the bangs are within the loader section - those are just separating which loaders we want to use. We can now require a CSS file with `require('my-file-name.css')` or a SCSS files with `require('my-file-name.scss')`.

__Your Turn: Using SCSS__

*   Create a new scss stylesheet file and add some styling to it:
```
$color: #F00;
body { background-color: $color; }
```
*   In your `index.js`, require this file
*   load your main page and see if your styles are present

As an added bonus, we can also tell Webpack to resolve the file extensions on our behalf.

```js
const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css']
  }
}
```

### Using Babel

[Babel](https://babeljs.io/) is a transpiler that allows us to use features from ES6 and ES7 in our JavaScript applications today.

To install the dependency, use the following:

```
npm install --save-dev babel-loader babel-core
```

We'll add another loader into your `webpack.config.js`.

```js
const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css']
  }
}
```

Notice that we exclude our `node_modules` folder. We want to process all files that end in `.js`, but _not_ the ones we didn't write.

__Your Turn__

Practice using the ES6 `let` feature in one of your tests. Make sure it still runs. (Recall that `let` works similarly to `var`, but has stricter rules around where the new variable will be in scope).

[Babel](http://babeljs.io)
