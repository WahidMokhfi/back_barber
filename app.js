const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const cors = require('cors')
// const sequelize = require('./db/sequelize')
// const Service = require('./routes/service')
const app = express()
const port = 3001

app
    .use(morgan('dev'))
    // .use(serveFavicon(__dirname + '/favicon.png'))
    .use(express.json())
    .use(cors())
    // .use('/api/service', Service)
    .listen(port, () => {
        console.log(`L'app sur le port ${port}`)
    }) 

// sequelize.initDb()