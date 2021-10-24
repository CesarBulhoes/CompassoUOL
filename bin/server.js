require('dotenv').config()
const app = require('../app')
const connection = require('../api/models')
const http = require('http')
const port = process.env.API_PORT || 80

connection.sequelize
.sync()
.then(() => {

  console.log('Connected successfully to database')

  http.createServer(app).listen(port, (err) => {
      if (err) throw new Error(err)
      console.log('Listening on ' + port)
    })
})
.catch(console.log)