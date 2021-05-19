const pino = require('pino')
exports.logger = pino({
  prettyPrint: { colorize: true }
})
