import express from "express";
import { IAdmin } from "../../models/IAdmin";
import { IRest } from "../../models/IRest";
import { login } from "../../services/admin/loginService";
export const adminRestcontroller = express.Router()

// Rest Login
adminRestcontroller.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const rItem:IRest = {
        status: false,
        result: undefined
    }
    await login(email, password).then(user => {
        if (user) {
            const userItem:IAdmin = {
                id: user.id,
                name: user.name!,
                email: user.email!,
                password: user.password!
            }
            req.session.item = userItem
            rItem.status = true
            rItem.result = userItem
        }else {
            rItem.message = 'Email or Password Not Valid!'
        }
    })
    res.json(rItem)
    
})