import express from "express";
import { IRest } from "../../models/IRest";
export const customerRestcontroller = express.Router()

// customer save
customerRestcontroller.post('customer/save', (req, res) => {
    const item: IRest = {
        status: false,
        result: undefined
    }
    res.json(item)
})