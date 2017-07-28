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

module.exports = (pluginConfig, config, cb) => {
  la(is.url(pluginConfig.url), 'missing url in the plugin config', pluginConfig)
  debug('plugin config %j', pluginConfig)

  const property = pluginConfig.property || 'id'
  const extract = json => {
    const gitHead = json[property]
    debug('build property "%s" has SHA %s', property, gitHead)
    const result = {
      gitHead: gitHead
    }
    const lastRelease = json.version || json.lastRelease
    if (lastRelease) {
      result.lastRelease = lastRelease
    }
    return result
  }

  got(pluginConfig.url, { json: true })
    .then(r => r.body)
    .then(tap(printObject))
    .then(extract)
    .then(result => {
      cb(null, result)
    })
    .catch(cb)
}
