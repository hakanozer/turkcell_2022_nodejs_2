import express from "express";
import { customerDelete, customerList, customerSave } from "../../services/admin/customerService";
import { EmitEnum, emitter } from "../../utils/useEvents";
export const dashboardController = express.Router()

dashboardController.get('/dashboard', async (req, res) => {
    await customerList().then(vals => {
        if (vals) {
            emitter.emit(EmitEnum.equals, vals.length )
            emitter.emit(EmitEnum.session, req )
            res.render('admin/dashboard', {customers: vals})
        }
    })
})


dashboardController.post('/customerAdd', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    await customerSave(name, email, phone).then( val => {
        if (val) {
            emitter.emit(EmitEnum.add, 1)
            res.redirect('../admin/dashboard')
        }
    })
})


dashboardController.get('/customerDelete', async (req, res) => {
    const id = req.query.id as string
    if (id) {
        customerDelete(id).then(val => {
            if (val) {
                emitter.emit(EmitEnum.remove, 1)
                res.redirect('../admin/dashboard')
            }
        })
    }
})