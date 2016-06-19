# Web Clipper for Trello
[![Build Status](https://img.shields.io/travis/oskarjakiela/trello-web-clipper/master.svg?style=flat-square)](http://travis-ci.org/oskarjakiela/trello-web-clipper)
[![Coverage Status](https://img.shields.io/codecov/c/github/oskarjakiela/trello-web-clipper.svg?style=flat-square)](http://codecov.io/github/oskarjakiela/trello-web-clipper?branch=master)
[![devDependency Status](https://david-dm.org/oskarjakiela/trello-web-clipper/dev-status.svg?style=flat-square)](https://david-dm.org/oskarjakiela/trello-web-clipper#info=devDependencies)

JavaScript core for [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/trello-web-clipper/) and [Chrome Extension](https://chrome.google.com/webstore/detail/trello-web-clipper-for-ch/bgldhlkimfdidhgmndninednbehpcenk).

Clip web pages directly to Trello.

## Features
* **Free** forever and ever.
* **Secure** authorization officially supported by Trello. Extension **does not** store your credentials.
* **User-friendly** interface takes an inspiration straight from Trello to be more familiar.
* Just **2 clicks** to save the current tab as a new card in Trello.
* **Open source** approach allows everyone to audit the code or submit a new feature.

## Soon
* **Settings view** to customize some of Web Clipper options.
* Support **more language**.

## Ideas
* Clipping text selection and image from context menu.
* Clipping entire page content.

## Building
### Pre-requirements
Before start make sure you have installed and configured (e.g. executable paths added to enviroment variable PATH) following packages.
* git
* node 4.4.x
* npm 2.x
* ruby 2.x

### Instruction
To build sources type following commands. You will find minified code in dist directory.
```
$ npm install -qg bower gulp
$ gem install bundler
$ bundle install
$ bower install
$ gulp build
```

## Disclaimer
I **do not** affiliated, associated, authorized, endorsed by or in any way officially connected to Trello, Inc. ([www.trello.com](https://www.trello.com)).

I **do not** the author of the design - all the credit belongs to Trello, Inc. ([www.trello.com](https://www.trello.com)) and its great designers! I only use some part of it to make user experience as familiar as possible for Trello users. If you have only any copyright doubts, please let me know first.
