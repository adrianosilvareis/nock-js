const { HttpClient, kInstance } = require('../../config/http')

describe('HttpClient Config', () => {
  beforeEach(() => {
    HttpClient.clearConfig()
  })
  it('should create a instance if call start method', async () => {
    HttpClient.start('localhost')
    expect(HttpClient[kInstance]).toBeTruthy()
  });
  it('should not create a instance directly', async () => {
    const client = new HttpClient()
    expect(HttpClient[kInstance]).toBeFalsy()
    expect(client).not.toEqual(HttpClient[kInstance])
  });
  it('should throw if call any static methods before call start', async () => {
    const promise = HttpClient.get()
    await expect(promise).rejects.toThrowError(new Error("start the http client"))
  });
});