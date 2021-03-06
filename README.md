pass-angularjs
==============
## Getting Started

To get you started you can simply clone the project repository and install the dependencies:

### Prerequisites

You need git to clone the project repository. 

We also use a number of node.js tools to initialize and test pass-angularjs. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone the project

Clone the the project repository using [git][git]:

```
git clone https://github.com/MauF/pass-angularjs.git
cd pass-angularjs
```

If you just want to start a new project without the pass-angularjs commit history then you can do:

```bash
git clone --depth=1 https://github.com/MauF/pass-angularjs.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
pass-angularjs changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

### Create menu/submenu and corresponding page content

1. Register the menu in the app/menu.json
2. Create a new folder under app/ which contains i) a html page ii) a javascript file contains angularjs part of the new view
3. Register the module created in the app/app.js
4. Import the javascript file created in step 2 in the app/index.html

In step 1, if the child/children menu has been registered, repetition from step 2 to step 4 is required for each child menu.
