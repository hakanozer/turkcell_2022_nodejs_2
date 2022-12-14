import express from "express";
import { IAdmin } from "../../models/IAdmin";
import { ILogin } from "../../models/loginModel";
import { login } from "../../services/admin/loginService";
import { encrypt } from "../../utils/util";

export const loginController = express.Router()

let errorMessage = ''

loginController.get('/', (req, res) => {
    if ( req.session.item ) {
        res.redirect('../admin/dashboard')
    }else {
        res.render('admin/login', {errorMessage})
        errorMessage = ''
    }
})

loginController.post('/login', async (req, res) => {
    const itemLogin: ILogin = req.body
    if (itemLogin.email === undefined || itemLogin.password === undefined) {
        errorMessage = 'Email or Password Undefined'
        res.redirect('../admin/')
    }else {
        await login(itemLogin.email, itemLogin.password).then(item => {
            if (item) {
                const user:IAdmin = {
                    id: item.id,
                    name: item.name!,
                    email: item.email!,
                    password: item.password!
                }
                req.session.item = user
                if ( itemLogin.remember ) {
                    // cookie create
                    res.cookie('admin', encrypt(item.id), {maxAge: 1000 * 60 * 60} )
                }
                res.redirect('../admin/dashboard')
            }else {
                errorMessage = 'Email or Password Error'
                res.redirect('../admin/')
            }
        })
        
    }
    
})

// logout
loginController.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('admin')
            res.redirect('../admin')
        }
    })
})