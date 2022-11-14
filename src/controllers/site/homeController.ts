import express from "express";
import { cities, title } from "../../services/site/homeService";

export const homeController = express.Router()

homeController.get('/', (req, res) => {
    res.render('site/home', { title, cities })
})