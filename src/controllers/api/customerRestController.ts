import express from "express";
import { IRest } from "../../models/IRest";
import { customerDelete, customerFind, customerList, customerSave } from "../../services/admin/customerService";
export const customerRestcontroller = express.Router()

// customer save
customerRestcontroller.post('/customer/save', async (req, res) => {
    const item: IRest = {
        status: false,
        result: undefined
    }
    const name = req.body.name as string
    const email = req.body.email as string
    const phone = req.body.phone as string

    await customerSave(name, email, phone).then(customer => {
        if (customer) {
            item.status = true
            item.result = customer
        }
    })
    res.json(item)
})

// customer list
customerRestcontroller.get('/customer/list', async (req, res) => {
    const item: IRest = {
        status: true,
        result: undefined
    }
    await customerList().then( list => {
        item.result = list
    })
    res.json(item)
})

// customer delete
customerRestcontroller.delete('/customer/delete', async (req, res) => {
    const item: IRest = {
        status: false,
        result: undefined
    }
    const id = req.body.id as string
    await customerDelete(id).then(customer => {
        if (customer) {
            item.status = true
            item.result = customer
        }
    })
    res.json(item)
})

// Customer find
customerRestcontroller.get('/customer/find', async (req, res) => {
    const q = req.body.q as string
    const item: IRest = {
        status: true,
        result: undefined
    }
    await customerFind(q).then(customers => {
        item.result = customers
    })
    res.json(item)
})