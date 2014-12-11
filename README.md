# pascal.js

A Pascal compiler written in JavaScript... just for fun.


## Purpose

The purpose of this project is to provide a web-based solution for compiling Pascal code. As such, the final version of project should be accessible to all users without having to install and fiddle with additional software -- just an Internet connection and a *modern* browser (see [Installation Requirements: General Installation](#general-installation)).


## Installation Requirements

### General Installation

1.  An Internet connection to load the web page.
2.  A web browser capable of using the [File API](http://caniuse.com/#feat=fileapi). An error will pop-up on the web page if your browser does not.


### Development Installation

1.  A web server must be installed to serve the main web page. Any web server is fine (Python's [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html), [Apache HTTP Server](http://httpd.apache.org/), PHP 5.4.0's [built-in web server](http://php.net/manual/en/features.commandline.webserver.php), Node.js with [http-server](https://github.com/nodeapps/http-server), [XAMPP](https://www.apachefriends.org/index.html)/LAMP/WAMP/MAMP, ...you get the idea).
2.  Clone this repository and its contents to your web server directory.
3.  Visit the web page from your browser of choice. Browser must support the [File API](http://caniuse.com/#feat=fileapi). An error will pop-up on the web page if your browser does not.
4.  **(OPTIONAL)** For utilizing the development build process:
  1.  Install [Node.js](http://nodejs.org/).
  2.  Open a terminal in project's root directory (same directory where this readme is located in).
  3.  `npm install` to install project's Node dependencies.
  4.  See [Usage: Development Usage: Terminal Commands](#terminal-commands) for build commands.
5. Done!


## Usage

### General Usage

1.  Go to web page.
2.  Click on "Browse" button.
3.  Select a [Pascal] file to compile.
4.  ???
5.  Profit!

### Development Usage

#### Terminal Commands

* `gulp docs`: Generate or update project documentations. Documentations can be found in `PROJECT_ROOT/docs/`.

#### Directory Structure

TODO


## Resources

### References

* [Notes on How Parsers and Compilers Work](http://parsingintro.sourceforge.net/)

### Documentations

* [W3C File API Specification](http://www.w3.org/TR/FileAPI/)


## License and Credits

TODO
