import express from "express";
import { Bilgiler } from "../../models/IProduct";
import { allProduct } from "../../utils/service";
import { EmitEnum, emitter, fncSize } from "../../utils/useEvents";
export const productController = express.Router()

let arr:Bilgiler[] = []
productController.get('/product', (req, res) => {
    emitter.emit(EmitEnum.size )
    console.log("Basket Count : ", req.session.size);
    
    allProduct().then(items => {
        arr = items.data.Products[0].bilgiler
        res.render('admin/product', {arr})
    })
})

productController.get('/productDetail', (req, res) => {
    const stIndex = req.query.index as string
    const index = parseInt(stIndex)
    const item = arr[index]
    //req.session.productItem = item
    res.render('admin/productDetail', {item})
})

