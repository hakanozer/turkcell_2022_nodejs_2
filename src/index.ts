import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
const app = express()

import { save } from './services/admin/loginService'
// db insert
save("Erkan", "erkan@mail.com", "12345").then( item => {
  console.log(item);
})


// bodyParser Config
app.use(bodyParser.urlencoded({ extended: false })) // form
app.use(bodyParser.json()) // json

// EJS Config
app.set( "views", path.join( __dirname, "views" ) )
app.set('view engine', 'ejs')


// site import controller
import {homeController}  from './controllers/site/homeController'
app.use('/', [
    homeController
])

// admin import controller
import { loginController } from './controllers/admin/loginController'
app.use('/admin', [
  loginController
])

const port = 8080
app.listen(port, () => {
  console.log('http://localhost:'+port)
})