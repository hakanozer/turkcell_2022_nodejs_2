import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import { IAdmin } from './models/IAdmin'
const app = express()


/*
import { save } from './services/admin/loginService'
// db insert
save("Zehra", "zehra@mail.com", "12345").then( item => {
  console.log(item);
})
*/

// session Config
declare module 'express-session' {
  interface SessionData {
    item: IAdmin
  }
}
app.use(session({
  secret: 'key123',
  resave: false
}))

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
import { dashboardController } from './controllers/admin/dashboardController'
app.use('/admin', [
  loginController,
  dashboardController
])

const port = 8080
app.listen(port, () => {
  console.log('http://localhost:'+port)
})