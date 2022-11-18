import express from "express";
import { Bilgiler } from "../../models/IProduct";
import { allProduct } from "../../utils/service";
import { cache, ECache } from "../../utils/useCache";
import { EmitEnum, emitter, fncSize } from "../../utils/useEvents";
export const productController = express.Router()

let arr:Bilgiler[] = []
productController.get('/product', async (req, res) => {
    emitter.emit(EmitEnum.size )
    console.log("Basket Count : ", req.session.size);
    
    const productArr = cache.get(ECache.allProduct)
    if (productArr == undefined) {
        await allProduct().then(items => {
            arr = items.data.Products[0].bilgiler
            cache.set(ECache.allProduct, arr)
        })
    }else {
        arr = productArr as Bilgiler[]
    }

    res.render('admin/product', {arr})
})

productController.get('/productDetail', (req, res) => {
    const stIndex = req.query.index as string
    const index = parseInt(stIndex)
    const item = arr[index]
    //req.session.productItem = item
    res.render('admin/productDetail', {item})
})

