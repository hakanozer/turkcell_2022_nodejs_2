import { customerModel } from "../../models/customerModel";
import {db} from '../../utils/db'

// save
export const customerSave = async (name: string, email: string, phone: string) => {
    await db
    return await customerModel.create({name, email, phone})
}

// list
export const customerList = async () => {
    await db
    return await customerModel.find()
}

// delete
export const customerDelete = async (id: string) => {
    await db
    return await customerModel.findByIdAndDelete(id)
}