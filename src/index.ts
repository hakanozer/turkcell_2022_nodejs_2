import express from 'express'
import path from 'path'
const app = express()

// EJS config
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