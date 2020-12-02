require('./functions')
require('./dotenv')
require('colors')
require('./globals')

require('./Entities')

global.Express.listen(process.env.SERVER_PORT, () => {
  console.log(`Backend listening at port ${process.env.SERVER_PORT}`.green)
})