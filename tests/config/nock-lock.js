const fs = require('fs')
const nock = require('nock')
const app = require('../../config/express')

const appendLogToFile = content => {
  fs.appendFileSync('record.txt', content)
}
nock.recorder.rec({
  logging: appendLogToFile,
})


app.listen(3000, console.log)
