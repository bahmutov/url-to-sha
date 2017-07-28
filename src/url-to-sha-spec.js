'use strict'

/* eslint-env mocha */
const urlToSha = require('.')
const nock = require('nock')
const la = require('lazy-ass')
const snapshot = require('snap-shot')

describe('url-to-sha', () => {
  const json = {
    id: 'foo'
  }
  beforeEach(() => {
    nock('https://fake-domain.com').get('/build.json').reply(200, json)
  })

  it('returns SHA', done => {
    const pluginConfig = {
      url: 'https://fake-domain.com/build.json'
    }
    const cb = (err, sha) => {
      console.log('err', err, 'sha', sha)
      la(err === null, 'got an error', err)
      snapshot(sha)
      done()
    }
    urlToSha(pluginConfig, null, cb)
  })
})
