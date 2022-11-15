import express from "express";
export const productController = express.Router()

productController.get('/product', (req, res) => {
    res.render('admin/product')
})