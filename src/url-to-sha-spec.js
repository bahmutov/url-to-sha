'use strict'

/* eslint-env mocha */
const urlToSha = require('.')
const nock = require('nock')
const la = require('lazy-ass')
const snapshot = require('snap-shot-it')

describe('url-to-sha', () => {
  describe('handles missing file', () => {
    beforeEach(() => {
      nock('https://fake-domain.com')
        .get('/build.json')
        .reply(404)
    })

    it('returns initial type', done => {
      const pluginConfig = {
        url: 'https://fake-domain.com/build.json'
      }
      const cb = (err, results) => {
        la(results, 'there should be results, error', err)
        snapshot(results)
        done()
      }
      urlToSha(pluginConfig, null, cb)
    })
  })

  describe('just id property', () => {
    const json = {
      id: 'foo'
    }
    beforeEach(() => {
      nock('https://fake-domain.com')
        .get('/build.json')
        .reply(200, json)
    })

    it('returns SHA', done => {
      const pluginConfig = {
        url: 'https://fake-domain.com/build.json'
      }
      const cb = (err, result) => {
        la(err === null, 'got an error', err)
        snapshot(result)
        done()
      }
      urlToSha(pluginConfig, null, cb)
    })
  })

  describe('id and version', () => {
    const json = {
      id: 'foo',
      version: '1.0.1'
    }
    beforeEach(() => {
      nock('https://fake-domain.com')
        .get('/build.json')
        .reply(200, json)
    })

    it('returns SHA', done => {
      const pluginConfig = {
        url: 'https://fake-domain.com/build.json'
      }
      const cb = (err, result) => {
        la(err === null, 'got an error', err)
        la(result.version === json.version, 'wrong version', result)
        snapshot(result)
        done()
      }
      urlToSha(pluginConfig, null, cb)
    })
  })
})
