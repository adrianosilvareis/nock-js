const axios = require('axios');
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
    const client = new HttpClient('localhost')
    expect(HttpClient[kInstance]).toBeFalsy()
    expect(client).not.toEqual(HttpClient[kInstance])
  });
  it('should throw if call any static methods before call start', async () => {
    const promise = HttpClient.get()
    await expect(promise).rejects.toThrowError(new Error("start the http client"))
  });
  it('should call get with correct data', async () => {
    const getSpy = jest.spyOn(clientStub, 'get')
    HttpClient.start('localhost', { create: () => clientStub })
    
    await HttpClient.get('url', { options: null })
    expect(getSpy).toHaveBeenCalledWith('url', { options: null })
  });
  it('should call patch with correct data', async () => {
    const patchSpy = jest.spyOn(clientStub, 'patch')
    HttpClient.start('localhost', { create: () => clientStub })
    
    await HttpClient.patch('url', { data: null }, { options: null })
    expect(patchSpy).toHaveBeenCalledWith('url', { data: null }, { options: null })
  });
  it('should call delete with correct data', async () => {
    const deleteSpy = jest.spyOn(clientStub, 'delete')
    HttpClient.start('localhost', { create: () => clientStub })
    
    await HttpClient.delete('url', { options: 'first call' })
    expect(deleteSpy).toHaveBeenCalledWith('url', { data: { options: 'first call' } })
    
    await HttpClient.delete('url', { data: { options: 'second call' } })
    expect(deleteSpy).toHaveBeenCalledWith('url', { data: { options: 'second call' } })
  });
  it('should call post with correct data', async () => {
    const postSpy = jest.spyOn(clientStub, 'post')
    HttpClient.start('localhost', { create: () => clientStub })
    
    await HttpClient.post('url', { options: 'first call' })
    expect(postSpy).toHaveBeenCalledWith('url', { options: 'first call' }, {})    
  });
});

const clientStub = {
  get: jest.fn,
  patch: jest.fn,
  post: jest.fn,
  delete: jest.fn,
  interceptors: {
    response: {
      use: jest.fn,
    }
  }
}