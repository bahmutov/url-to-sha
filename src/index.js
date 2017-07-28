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
  got(pluginConfig.url, { json: true })
    .then(r => r.body)
    .then(tap(printObject))
    .then(build => build[property])
    .then(sha => {
      debug('build property "%s" has SHA %s', property, sha)
      cb(null, { gitHead: sha })
    })
    .catch(cb)
}
