import { adminModel } from "../../models/adminModel"
import { db } from "../../utils/db"

export const login = ( email:string, password: string ) => {
    if (email === 'ali@mail.com' && password === '12345' ) {
        return true
    }else {
        return false
    }
}

export const save = async (name: string, email: string, password: string)  => {
    await db
    return await adminModel.create({name, email, password})
}
