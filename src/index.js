const got = require('got')
const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('url-to-sha')

function tap (fn) {
  return function (value) {
    fn(value)
    return value
  }
}

function printObject (object) {
  debug('fetched object')
  debug(object)
}

const defaultResult = {
  type: 'initial'
}

function urlToSha (pluginConfig, config, cb) {
  la(is.url(pluginConfig.url), 'missing url in the plugin config', pluginConfig)
  debug('plugin config %j', pluginConfig)

  const property = pluginConfig.property || 'id'
  const extract = json => {
    const gitHead = json[property]
    debug('build property "%s" has SHA %s', property, gitHead)
    const result = {
      gitHead: gitHead
    }
    const version = json.version || json.lastRelease
    if (version) {
      result.version = version
      debug('set version to', version)
    }
    return result
  }

  got(pluginConfig.url, { json: true })
    .then(r => r.body)
    .then(tap(printObject))
    .then(extract)
    .then(result => {
      debug('success from url', pluginConfig.url)
      cb(null, result)
    })
    .catch(err => {
      debug('got an error from', pluginConfig.url)
      debug(err)
      cb(null, defaultResult)
    })
}

module.exports = urlToSha
