import express from "express";
export const dashboardController = express.Router()

dashboardController.get('/dashboard', (req, res) => {

    res.render('admin/dashboard', { user: req.session.item })
})