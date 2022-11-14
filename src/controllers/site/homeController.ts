import express from "express";

export const homeController = express.Router()

homeController.get('/', (req, res) => {
    const appTitle = "App Title"
    const arr = ['İstanbul', 'Ankara', 'Samsun', 'Antalya']
    res.render('site/home', { title: appTitle, cities: arr })
})