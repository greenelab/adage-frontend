![](https://github.com/greenelab/adage-frontend/workflows/ci/badge.svg)

<!-- https://stackoverflow.com/questions/42966641/how-to-transform-black-into-any-given-color-using-only-css-filters -->
<img style="width: 100px; height: 100px; display: block; margin: 0 auto; filter: invert(44%) sepia(86%) saturate(362%) hue-rotate(101deg) brightness(100%) contrast(90%);" src="https://raw.githubusercontent.com/greenelab/adage-frontend/master/src/images/logo.svg?sanitize=true"/>

## Adage front end

[~ Use the app ~](https://adage.greenelab.com)

Adage is a tool that helps you explore gene expression data and discover new insights from machine learning models.
This repository contains the code for the "front end", ie the web app itself.
The "back end", where the model data is loaded and then provided to the web app, can be found [here](https://github.com/greenelab/py3-adage-backend).



### About

This app was built with the [React framework](https://reactjs.org/).
Specifically, it was created using [Create React App](https://github.com/facebook/create-react-app), a template/starting point for making React apps with minimal setup.

To edit this source code, you'll likely need to understand some fundamentals of [Git](https://git-scm.com/), [GitHub](https://github.com/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [modern](https://www.modernjs.com/) [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [React](https://reactjs.org/), [JSX](https://reactjs.org/docs/introducing-jsx.html), [Redux](https://redux.js.org/), the [Node](https://nodejs.org/en/) environment.

If want to make changes to the behavior of this app for your own purposes and you need help, you can [contact the team](mailto:team@greenelab.com). If you just want to suggest a change to us, you can [create an issue in this repository](https://github.com/greenelab/adage-frontend/issues).



### Making changes

Set up the necessary infrastructure:

1) [Install Git](https://git-scm.com/) (the system that tracks changes to the app source code)
2) [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) this repository, and [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) it to your computer (so you have a local copy of the code to make your own changes to)
3) [Install Node.js](https://nodejs.org/en/download/) (the environment that tests, builds, and packages the app)
4) [Install Yarn](https://classic.yarnpkg.com/en/docs/install/) (the package manager that installs all the third party dependencies for the app)
5) Pick and install your favorite command-line interface and text editor for your operating system

In your command line, navigate to the directory where you cloned the repository.
All commands listed below should be run from there.

"Install" the app:

1) Run `yarn install`.
This may take several minutes.

Run a local test version of the app:

1) Run `yarn start`.
This will open a new browser tab with a live preview of the app.
This command continuously watches for changes in the source code, and automatically updates the preview right in the browser.
Press `ctrl+c` (or something else, depending on your command line interface) to stop this live preview and run a different command.

Execute all included tests to see if any critical behavior of the app broke due to recent changes:

1) Run `yarn test`.
Like the previous command, this continuously watches for changes in the source code.
Press `ctrl+c` to stop the process and run a different command.

Build the app, ie make a bundled, optimized version of the app that can be put on a website:

1) Run `yarn build`.
