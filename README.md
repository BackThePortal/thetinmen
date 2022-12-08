<!-- TOC -->
* [TheTinMen Posts Classifier](#thetinmen-posts-classifier)
    * [Creating the API](#creating-the-api)
      * [Posts parsing](#posts-parsing)
      * [Adding a new category](#adding-a-new-category)
      * [Handling errors](#handling-errors)
  * [Installation](#installation)
<!-- TOC -->

# TheTinMen Posts Classifier
_[TheTinMen](https://www.instagram.com/thetinmen/)_ is an Instagram account that wides perspectives around men and equality. His posts talk about men's issues (e.g. male victims of rape, men's mental health, disposable masculinity, and much more), while still defending women's rights.

Instagram isn't known for having advanced search features. That's why I made this webpage that classifies a 
selection of his posts in categories based on the topic.

**Note: The posts are stored in the repository because of limitations with Instagram's API. Only the thumbnails can 
be found. All images belong to TheTinMen. If the account's admin would like this repository to be taken down, please 
[email me](mailto:backtheportal@gmail.com) or open an issue.**

Uses Vue.js and TailwindCSS.

## Development
This section is for people interested in contributing to the project.

### Extending posts and categories
To make adding content to the website as easy as possible (both for myself and possible contributors), I created an 
API that reads a JSON file called [posts.json](posts.json) that contains all the necessary information. This is how 
it looks and how it's used:

````json
[
  {
    "name": "Name of the category 1",
    "description": "A brief text summarizing the topic.",
    "posts": [
      {
        "name": "Thoughts on Patriarchy",
        "source": 1,
        "link": "https://www.instagram.com/p/CjBEtjmNdu9/"
      },
      {
        "name": "Thoughts on Toxic Masculinity",
        "source": 2,
        "link": "https://www.instagram.com/p/Cc5E-QutuFo/"
      },
      7
    ]
  },
  {
    "name": "Name of the category 2",
    ...
  }
]
````
This system makes it surprisingly *smooth* to extend the website. Cool, right? I know, I know.

Sometimes my genius is... It's almost frightening.
#### Adding a post
Posts thumbnails are saved in the [posts](posts) folder in JPG format. The `source` key in each post object refers to 
the id of the image (filename), which must be a number. The extension mustn't be specified.

Adding a new post to a category is as simple as moving the image file to the posts folder and then adding an object 
to the category's posts array, specifying its name, source and link.

#### Adding a new category
Add a new object to the root array using an existing one as a template and replace the values.

#### Handling errors
The JSON's structure can be checked using `npm run test`. If anything's wrong, an error will be thrown.

## Installation
If you want to run the website locally, follow these steps. Make sure [Node.js](https://nodejs.org/) is installed in your computer.
1. Download the source code and decompress the zip.
2. Open a Command Prompt/Powershell (Windows) or Terminal (macOS/Linux) window in the source code root folder.
3. Install the dependencies using the following command:
```shell
npm i
```
4. Then, use this command to start the development server.
```shell
npm run dev
```
A link like _http:/127.0.0.1:5173/_ will appear. Open it
to see the website.

- Alternatively, you can use `npm run build` to compress and minify for use in production. If you don't know what 
  either of these two last words mean, ignore this and continue with your life :D
- You can also use `npm run dev -- --host` so everyone in your network can see the website. They'll have to use a 
  different link, though. It will appear next to *Network*.