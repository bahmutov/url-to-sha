const got = require('got')
const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('url-to-sha')

module.exports = (pluginConfig, config, cb) => {
  la(is.url(pluginConfig.url), 'missing url in the plugin config', pluginConfig)
  debug('plugin config %j', pluginConfig)

  const property = pluginConfig.property || 'id'
  got(pluginConfig.url, {json: true})
    .then(r => r.body)
    .then(build => build[property])
    .then(sha => {
      debug('build property "%s" has SHA %s', property, sha)
      cb(null, {gitHead: sha})
    })
}
