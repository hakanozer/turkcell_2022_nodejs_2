import { adminModel } from "../../models/adminModel"
import { db } from "../../utils/db"

export const login = async ( email:string, password: string ) => {
    await db
    return await adminModel.findOne({ email, password })
}

export const save = async (name: string, email: string, password: string)  => {
    await db
    return await adminModel.create({name, email, password})
}
