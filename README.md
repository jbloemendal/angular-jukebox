# Angular Jukebox

Simple **music album search web app** built with **AngularJS**.

## Features ##

* **Autocomplete** with highlighting
* **Paginated search results** with album cover thumbs
* **I18N**: both english and french languages are supported
* **Unit tests** and **end-to-end tests** with Karma and Jasmine
* Cover
* Responsive Design

## Quick Start ##

* `git clone https://github.com/jbloemendal/angular-jukebox`
* Open the `app/index.html` file into Firefox


## Powered by ##

This project depends on several other open source projects:

* **[AngularJS](http://angularjs.org/)**: the popular Google MVC JavaScript framework
* **[Angular Seed](https://github.com/angular/angular-seed)**: application skeleton for a typical [AngularJS](http://angularjs.org/) web app
* **[Bootstrap](Bootstrap)**: front-end framework for developing responsive
* **[Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/)**: Bootstrap components written in pure AngularJS
* **[jQuery](http://jquery.com/)**: only used to asynchronously load JS files at runtime


## Running unit tests

[Jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) have been used for unit tests/specs.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files