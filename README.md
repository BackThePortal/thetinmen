<!-- TOC -->
* [TheTinMen Posts Classifier](#thetinmen-posts-classifier)
  * [Installation](#installation)
  * [Development](#development)
    * [Extending posts and topics](#extending-posts-and-topics)
      * [Adding a post](#adding-a-post)
      * [Adding a new topic](#adding-a-new-topic)
      * [Handling errors](#handling-errors)
<!-- TOC -->

# TheTinMen Posts Classifier
_[TheTinMen](https://www.instagram.com/thetinmen/)_ is an Instagram account that wides perspectives around men and equality. His posts talk about men's issues (e.g. male victims of rape, men's mental health, disposable masculinity, and much more), while still defending women's rights.

Instagram isn't known for having advanced search features. That's why I made this website that classifies a 
selection of his posts in categories based on the topic.

**Note: The posts are stored in the repository because of limitations with Instagram's API. Only the thumbnails can 
be found. All images belong to TheTinMen. If the account's admin would like this repository to be taken down, please 
[email me](mailto:backtheportal@gmail.com) or open an issue.**

Uses Vue.js and TailwindCSS.

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

- Alternatively, you can use `npm run build` to compress and minify for use in production.
- You can also use `npm run dev -- --host` so everyone in your network can see the website. They'll have to use a
  different link, though. It will appear next to *Network*.
## Development
This section is for people interested in contributing to the project.

### Extending posts and topics
*Note: The word "topic" is used to refer to a collection of posts. The word "category" refers to the thumbnails that link to the topics in the home page.*


To make adding content to the website as easy as possible (both for myself and possible contributors), I created an 
API that reads a JSON file called [posts.json](posts.json) that contains all the necessary information. This is how 
it looks:

````json
[
	{
		"name": "Name of the category 1",
		"description": "A brief text summarizing the topic",
		"posts": [
			{
				"title": "Thoughts on Patriarchy",
				"source": 1,
				"link": "https://www.instagram.com/p/CjBEtjmNdu9/"
			},
			{
				"title": "Thoughts on Toxic Masculinity",
				"source": 2,
				"link": "https://www.instagram.com/p/Cc5E-QutuFo/"
			}
		]
	}
]
````

Please read the contribution guide to learn how to add data to this file.
#### Adding a post
Adding a new post to a category is as simple as moving the image file of the thumbnail to the [posts](posts) folder and then adding an object
to the category's posts array. The post object supports many properties, but you'll want to specify at least `"title"`, `"source"` and `"link"`. See the API reference for the full list.

The image filename must be `{NUMBER}.jpg`. The `"source"` key refers to the number. The extension mustn't be specified.

#### Adding a new topic
Add a new object to the root array and declare the properties `"name"`, `"description"` and `"posts"`. See the API reference for the full list of properties.

The first post of the category will be used as a thumbnail for the category. Alternatively, you can also add the property `"thumbnail"` to override this behaviour and specify any image you want. The value is treated the same way as the `"source"` key in the post object.

#### Checking errors
The JSON structure can be checked using `npm run test`. If anything's wrong, an error will be thrown.

#### Contribution guide
