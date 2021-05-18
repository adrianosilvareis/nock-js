const axios = require('axios')

const kInstance = Symbol('instance')
const kClient = Symbol('client')
const kIntercept = Symbol('intercept')

class HttpClient {
  [kInstance] = null

  constructor(baseURL, client = axios) {
    this.baseUrl = baseURL
    this[kClient] = client.create({ baseURL })

    this[kIntercept]()
  }

  [kIntercept] () {
    const successFn = ({ data }) => data
    const errorFn = (error) => Promise.reject(error)
    
    this[kClient].interceptors.response.use(successFn, errorFn)
  }

  static start(baseUrl, client){
    this[kInstance] = new HttpClient(baseUrl, client)
  }

  static async get(url, options = {}) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kInstance][kClient].get(url, options)
  }

  static async patch(url, data, options = {}) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kInstance][kClient].patch(url, data, options)
  }

  static async delete(url, options = {}) {
    if (!this[kInstance]) throw new Error('start the http client')
    if (!options.data) {
      return this[kInstance][kClient].delete(url, { data: options })
    }
    return this[kInstance][kClient].delete(url, options)
  }

  static async post(url, data, options = {}) {
    if (!this[kInstance]) throw new Error('start the http client')
    return this[kInstance][kClient].post(url, data, options)
  }

  static clearConfig() {
    this[kInstance] = null
  }
}

module.exports = {
  HttpClient,
  kInstance
}