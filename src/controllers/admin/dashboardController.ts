import express from "express";
export const dashboardController = express.Router()

dashboardController.get('/dashboard', (req, res) => {
    if (!req.session.item) {
        res.redirect('../admin')
    }
    res.render('admin/dashboard')
})