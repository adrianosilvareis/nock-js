const axios = require('axios')

const kInstance = Symbol('instance')
const kBaseUrl = Symbol('baseUrl')
const kClient = Symbol('client')

class HttpClient {
  constructor(baseUrl, client) {
    this[kBaseUrl] = baseUrl;
    this[kClient] = client;
  }

  static [kInstance] = null

  static start (baseUrl, client = axios) {
    if (!baseUrl) throw new Error('baseUrl cannot be empty')
    HttpClient[kInstance] = new HttpClient(baseUrl, client)
  }

  static async get(url, options) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kClient].call(this, this[kBaseUrl] + url, options)
  }

  static async delete (url, options) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kClient].call(this, this[kBaseUrl] + url, options)
  }

  static async post(url, data, options) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kClient].call(this, this[kBaseUrl] + url, data, options)
  }

  static async patch(url, data, options) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kClient].call(this, this[kBaseUrl] + url, data, options)
  }

  static clearConfig() {
    this[kInstance] = null
  }
}

module.exports = {
  HttpClient,
  kInstance
}