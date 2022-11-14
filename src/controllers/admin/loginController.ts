import express from "express";

export const loginController = express.Router()

loginController.get('/', (req, res) => {
    res.render('admin/login')
})