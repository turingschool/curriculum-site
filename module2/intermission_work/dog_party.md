---
title: Dog Party
---
## Overview

It's a dog party! As a Software developer, you're going to need to be able to accurately build out the UI (user interface) for websites based on [comps](https://en.wikipedia.org/wiki/Comprehensive_layout) provided by a designer. For this project, you'll build a 1-page static site to practice writing well structured, semantic HTML with clean, precise CSS.

Similar to what you might be asked to do on the job, we've given you a comp with a set of technical specs to go along with it and your challenge is to build it.
## Learning Goals

- Practice accurately building a comp
- Write well structured, semantic HTML
- Craft clean, DRY CSS

## Design Comp

#### Hex Codes:

* Light blue: #75e2e6
* Dark blue: #048eaa
* Background color: #ffffff
* White text: #ffffff
* Body text: #000000

# ![Dog Party](./assets/dog-party-js-edition.jpg)


## Steps to Set Up Your Project Files
- Create a new directory called `dog_Party`.
- In your dog_party directory create a new sub-directory called `assets`.
- You will also need to [download the image assets](https://drive.google.com/drive/folders/0B_lPnjyMN6-CamRRV0xPRmZNOFU?usp=sharing) and insert them into your `images` directory
- In the `dog_party` directory, you are going to make 3 files. 
- `index.html`
- `style.css`
- `main.js`
## Phase One: Basic Requirements
Start by building the HTML and using semantic tags to create a clean structure for your page. Work to craft your HTML according to the [Turing HTML Style Guide](https://github.com/turingschool-examples/html)
##### Step 1:
Here is a basic outline of the HTML you'll need to start with this project.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog Party</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>
```
In here you are seeing the basic outline of the HTML you will need to start with this project. 
- The `<DOCTYPE html>` declaration defines the document.
- The `<html></html>` element is the root of an HTML.
- The `<head></head>` element is the container for meta tags. 
- The `<title></title>` element sets the title of the application. 
- The `<link rel="stylesheet" href="style.css">` This line links the HTML document to an external CSS file named "style.css". It allows the HTML to use the styles defined in "style.css" for layout and design.
- The `<body></body>` element is the container for all the content on the page. 
Wow that's a lot of code, but it's all very important. 
let's move on to adding more content to our HTML file. But before we do that, let's talk about how to look at our page in the browser. 
<section class="note">
## Viewing Your HTML File in the Browser

To see how your HTML file looks in a web browser, follow these steps:

1. **Save Your File**: Ensure that your `index.html` file is saved in your `dog_party` directory.

2. **Open the File**:
    - **Using File Explorer/Finder**:
        - Navigate to the directory where your `index.html` file is located.
        - Double-click on the `index.html` file. This should open the file in your default web browser.
    - **Using a Web Browser**:
        - Open your preferred web browser.
        - Press `Ctrl + O` (Windows/Linux) or `Cmd + O` (Mac) to open a file.
        - Navigate to your `index.html` file and select it to open.

3. **Using a Code Editor**:
    - If you are using a code editor like Visual Studio Code, you can right-click on the `index.html` file and select "Open with Live Server" (if you have the Live Server extension installed). This will open your file in the browser and automatically refresh it whenever you make changes.

By following these steps, you can view your HTML file in the browser and see how your code renders on the web. This is crucial for testing and ensuring that your webpage looks and behaves as expected.
</section>

##### Step 2:
Time to add more content to our HTML file. 
- Let's add the header, main, and footer to this page to add more structure to it. In the body of your HTML file, add the following tags:
- `<header></header>`
- `<main></main>`
- `<footer></footer>`

Now your HTML file should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog Party</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <!--  we need to add the logo and the nav bar in here -->
    </header>
    <main>
        <!--  Here is where we add are 3 dogs with -->
    </main>
    <footer>
        <!-- Here is where we add learn about dogs online with twitter, instagram, facebook, and LinkedIn -->
    </footer>
</body>
</html>

```
##### Step 3:
Alright, let's start by adding the logo to our header.We need to use a [image tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) to add the logo to our header. 

```html
    <img src="assets/dog-icon.svg" alt="Dog Party Logo" class="logo">
```
Next, we need to add the navigator bar to our header, for that we are using the nav tag. with an unordered list to our code. 

```html
<nav>
    <ul class="nav-list">
        <li>
            <a href="#how-to-dog">How to Dog</a>
        </li>
        <li>
            <a href="#what-is-dogs">What is Dogs</a>
        <li>
        <li>
            <a href="#facts-from-dogs">Facts From Dogs</a>
        </li>
    </ul>
</nav>
```
##### Step 4:
Don't worry if your code is not perfect, and the style doesn't look like the comp. We are going to work on that in the next phase. 
Now we need to add the hero section where we have a title, a paragraph, and a button. 
Let's add a section tag to our main section. 

```html
<section class="hero">
    <h1>A Site About <strong>Some Dogs</strong></h1>
    <img src="assets/dog1-sq.jpg" alt="Dog Image" class="hero-image">
    <form>
        <label for="dog-name">Name</label>
        <input type="text" id="dog-name" name="dog-name">
        <button type="submit">Name This Dog</button>
    </form>
</section>
```
There are few primary things we did in here. 
- Add a section tag with a class of hero. 
- Add a h1 tag with a strong tag inside of it. 
- Add an image tag with a class of hero-image.
- Add a form tag with a label tag, input tag, and button tag.

##### Step 5:
Alright, now we are done with our hero section, let's add the rest of our content to our page. We'll need another section here to add our dogs in it. But this section is going to be a little more complex. 
It looks like we need to add 3 images for dogs, with a title and some description for each one. But it they all look the same just the image is different but the style looks similar. Great I will show you how to make it happen for one and your job is to add the other 2 in it. 
To do this we are going to need to use a `section` tag. 
- Add a section tag with a class of dogs. 
- Add 1 `div` tag with a class of dog. 
- Within that `div` tag, add an image tag with a class of dog-image. 
- After the image tag, add a `h2` tag with the title of the dog. 
- After the h2 tag, add a `p` tag with the description for the dog. 
- it looks like each dog has a button that says "name this dog" and when we click on it, probably it opens another page, but for now we are not going to worry about that. 
After making one dog div, it looks like we need to add the rest of our dogs, which they all kind of look similar, only the image and the description is different. I'll let you add those dog-info divs to your work. 
<section class="dropdown">

#### Here is how your body section of your HTML should look like:

```html
<body>
    <header>
        <!-- Add the logo -->
        <img src="assets/dog-icon.svg" alt="Dog Party Logo" class="logo">
        <!-- Add the navigation bar -->
        <nav>
            <ul class="nav-list">
                <li><a href="#how-to-dog">How to Dog</a></li>
                <li><a href="#what-is-dogs">What is Dogs</a></li>
                <li><a href="#facts-from-dogs">Facts From Dogs</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <!-- Here is where we add our 3 dogs -->
        <section class="hero">
            <h1>A Site About <strong>Some Dogs</strong></h1>
            <img src="assets/dog1-sq.jpg" alt="Dog Image" class="hero-image">
            <form>
                <label for="dog-name">Name</label>
                <input type="text" id="dog-name" name="dog-name">
                <button type="submit">Name This Dog</button>
            </form>
        </section>
        <section class="info">
            <div class="dog-info">
                <img src="assets/dog2-sq.jpg" alt="Dog 1">
                <h2>How To Dog</h2>
                <p>Context about this Dog</p>
                <button>How</button>
            </div>
            <!-- add the rest of the dogs here, but make sure to add a class to the div tag -->
        </section>
    </main>
    <footer>
        <!-- Here is where we add learn about dogs online with twitter, instagram, facebook, and LinkedIn -->
    </footer>
</body>
```
</section>
Well done, now we are almost done with our HTML file.We'll comeback to footer section after we are done with some styling. 

## Phase Two: Styling 

#### Step 1:
Now we are going to start styling out page. Let's open up our style.css file and start styling our page. 
- First, we need to add some global styling to our page. We can start by adding a body selector to the css. 
```css
body { 
    font-family : Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
}
```
Next step is to look into our banner section, it looks like the background color is #75e2e6, which is a hex color code for the light blue we have. Awesome, let's add that to our css.  Header is where we want to have that blue color. Let's add that selector to our CSS. 
```css
header {
    background-color: #75e2e6;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```
I've added few other properties to the header, like padding, display, justify-content, and align-items. Don't worry you will learn about these in M2. Here is a link to learn more about [Flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) box and it's usage. Flex box is really helpful in creating layouts, and centering items. I would suggest you all to play around with flex box, and the padding size, change the padding to 40px, and see what changes, take notes and be ready to share this with you cohort. 
Let's add styling for our logo and nav-list. Since the image in our header has a class of logo, we can add a selector for that, by adding a .logo to our css. 
```css
.logo {
    height: 50px;
}
```
Now let's add the rest, what is the class of nav-list?

```css
.nav-list {
    list-style-type: none;
    display: flex;
    gap : 20px;
}
 li a {
    text-decoration: none;
    color: #000000;
    font-weight: bold;
} 
```
The line `li a` is a CSS descendant selector. It targets `<a>` elements that are descendants of `<li>` elements. This means it will apply the specified styles to all anchor (`<a>`) tags that are inside list item (`<li>`) tags.
Now is your turn, try to add the hero class styling, if you get stock, try to do some googling to find out how to add the styling for it. 
<!-- OOOOOOOOOOOOOOO -->