# url-to-sha

> Plugin for semantic-action that fetches commit SHA from JSON at given URL

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]
[![next-update-travis badge][nut-badge]][nut-readme]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save url-to-sha
```

## Use

Use as a plugin to [semantic-release][semantic-release] and
[semantic-action][semantic-action]. Set in `package.json`

```json
{
  "release": {
    "getLastRelease": {
      "path": "url-to-sha",
      "url": "https://glebbahmutov.com/test-semantic-deploy/build.json"
    }
  }
}
```

When the url is fetched, there is probably an object, for example

```
$ curl https://glebbahmutov.com/test-semantic-deploy/build.json
{
  "id": "2233f222ff1ae15ca16d58121151a0fa17b561d7",
  "short": "2233f22",
  "savedAt": "2017-07-27T16:31:20.284Z",
  "version": "1.0.0"
}
```

This plugin will call back with object like

```json
{
  "gitHead": "2233f222ff1ae15ca16d58121151a0fa17b561d7",
  "lastRelease": "1.0.0"
}
```

Which will allow semantic action to proceed from that point.

[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-action]: https://github.com/bahmutov/semantic-action

## Debugging

Run with environment variable `DEBUG=url-to-sha ...`

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/url-to-sha/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/url-to-sha.svg?downloads=true
[npm-url]: https://npmjs.org/package/url-to-sha
[ci-image]: https://travis-ci.org/bahmutov/url-to-sha.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/url-to-sha
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[nut-badge]: https://img.shields.io/badge/next--update--travis-ok-green.svg
[nut-readme]: https://github.com/bahmutov/next-update-travis#readme
