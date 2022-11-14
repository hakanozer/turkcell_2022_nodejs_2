import express from 'express'
import path from 'path'
const app = express()

// EJS config
app.set( "views", path.join( __dirname, "views" ) )
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    const appTitle = "App Title"
    const arr = ['İstanbul', 'Ankara', 'Samsun', 'Antalya']
    res.render('site/home', { title: appTitle, cities: arr })
})

const port = 8080
app.listen(port, () => {
  console.log('http://localhost:'+port)
})