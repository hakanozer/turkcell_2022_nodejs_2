import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { IAdmin } from './models/IAdmin'
import { findId } from './services/admin/loginService'
import { decrypt } from './utils/util'
import { Bilgiler } from './models/IProduct'
import { IRest } from './models/IRest'
import { logger } from './utils/logger'
import { call } from './utils/userPromise'
import { cache, ECache } from './utils/useCache'
const app = express()

// swagger
import  swaggerDocument from './swagger.json'
const options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// cache Test
/*
const obj = {name: 'Ali', age: 40}
const cacheStatus = cache.set(ECache.sample, obj)
if ( cacheStatus ) {
  console.log('Cache Create');
}
*/


// logger Test
try {
  const obj:any = {}
  //throw new Error("Sum Method Error");
  obj.sum(500, 40)
} catch (err:any) {
  logger.error(err.message)
  logger.info('Info Logger')
}

// use Promise
call()


/*
import { save } from './services/admin/loginService'
// db insert
save("Zehra", "zehra@mail.com", "12345").then( item => {
  console.log(item);
})
*/

// cookie Config
app.use(cookieParser())

// session Config
declare module 'express-session' {
  interface SessionData {
    item: IAdmin,
    productItem: Bilgiler,
    size: number
  }
}
app.use(session({
  secret: 'key123',
  resave: false,
  saveUninitialized: true
}))

// bodyParser Config
app.use(bodyParser.urlencoded({ extended: false })) // form
app.use(bodyParser.json()) // json

// EJS Config
app.set( "views", path.join( __dirname, "views" ) )
app.set('view engine', 'ejs')



// global filter
let globalUrl = ''
app.use( async (req, res, next) => {
  const url = req.url  
  globalUrl = url
  if ( url.includes('/api/v1') ) {
    if ( url === '/api/v1/login' ) {
      next()
    }else {
      const userItem = req.session.item
      if (userItem) {
        next()
      }else {
        const item: IRest = {
          status: false,
          result: undefined,
          message: "Login Session Fail"
        }
        res.status(401).json(item)
      }
    }
    
  }else {
    const urls = ['/admin', '/admin/login']
    let sessionStatus = true
    urls.forEach( urlItem => {
      if (urlItem === url) {
        sessionStatus = false
      }
    })
    if (sessionStatus === true) {
      // cookie control
      const cookieAdmin = req.cookies.admin
      if ( cookieAdmin ) {
        try {
          const id = decrypt(String(cookieAdmin))
          await findId(id).then(user => {
            if (user) {
              req.session.item = {
                id: user.id,
                name: user.name!,
                email: user.email!,
                password: user.password!
              }
            }
          })
        } catch (error) {
          console.log("Cookie Fail");
          // res.cookie('admin', '', {maxAge: 0} )
          res.clearCookie('admin')
        }
      }
      const userItem = req.session.item
      if (userItem) {
        res.locals.user = userItem
        next()
      }else {
        res.redirect('../admin')
      }
    }else {
      next()
    }
  }
  
})

// site import controller
import {homeController}  from './controllers/site/homeController'
app.use('/', [
    homeController
])

// admin import controller
import { loginController } from './controllers/admin/loginController'
import { dashboardController } from './controllers/admin/dashboardController'
import { productController } from './controllers/admin/productController'
app.use('/admin', [
  loginController,
  dashboardController,
  productController
])

// import Rest Controller
import { adminRestcontroller } from './controllers/api/adminRestController'
import { customerRestcontroller } from './controllers/api/customerRestController'
app.use('/api/v1', [
  adminRestcontroller,
  customerRestcontroller
])

// 404 not found
app.use('*', (req, res) => {
  if (globalUrl.includes('/api/v1')) {
    const item: IRest = {
      status: false,
      result: "404 Not Found"
    }
    res.status(404).json(item)
  }else {
    res.render('404')
  }
})

const port = 8080
app.listen(port, () => {
  console.log('http://localhost:'+port)
})