<p align="center">
<a href="https://github.com/BackThePortal/thetinmen/actions/workflows/deploy.yml"><img src="https://github.com/BackThePortal/thetinmen/actions/workflows/deploy.yml/badge.svg"/></a>
<a href="https://github.com/BackThePortal/thetinmen/releases"><img src="https://img.shields.io/github/v/release/backtheportal/thetinmen?logo=github&style=plastic"/></a>
<a href="https://github.com/BackThePortal/thetinmen/releases"><img src="https://img.shields.io/github/v/release/backtheportal/thetinmen?logo=github&style=plastic&include_prereleases"/></a>
</p>

<!-- TOC -->

- [TheTinMen Posts Classifier](#thetinmen-posts-classifier)
    - [Installation](#installation)
    - [Development](#development)
      _ [Extending posts and topics](#extending-posts-and-topics)
      _ [Adding a post](#adding-a-post)
      _ [Adding a new topic](#adding-a-new-topic)
      _ [Checking errors](#checking-errors) \* [Contribution guide](#contribution-guide)
  <!-- TOC -->

# TheTinMen Posts Classifier

_[TheTinMen](https://www.instagram.com/thetinmen/)_ is an Instagram account that wides perspectives around men and
equality. His posts talk about men's issues (e.g. male victims of rape, men's mental health, disposable masculinity, and
much more), while still defending women's rights.

Instagram isn't known for having advanced search features. That's why I made this website that classifies a selection of
his posts in categories based on the topic.

**Note: The posts are stored in the repository because of limitations with Instagram's API. Only the thumbnails can
be found. All images belong to TheTinMen. This project has been created with their permission. If the account's admin
would like this repository to be taken down, please
[email me](mailto:backtheportal@gmail.com) or open an issue.**

Uses Vue.js and TailwindCSS.

## Installation

If you want to run the website locally, follow these steps. Make sure [Node.js](https://nodejs.org/) is installed in
your computer.

1. Clone the repository or download the source code and decompress the zip.
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
  different link, though. It will appear next to _Network_.
