import express from "express";
import { ILogin } from "../../models/loginModel";
import { login } from "../../services/admin/loginService";

export const loginController = express.Router()

let errorMessage = ''

loginController.get('/', (req, res) => {
    res.render('admin/login', {errorMessage})
    errorMessage = ''
})

loginController.post('/login', (req, res) => {
    const item: ILogin = req.body
    if (item.email === undefined || item.password === undefined) {
        errorMessage = 'Email or Password Undefined'
    }else {
        const status = login(item.email, item.password)
        if ( status ) {

        }else {
            errorMessage = 'Email or Password Error'
        }
    }
    res.redirect('../admin/')
})