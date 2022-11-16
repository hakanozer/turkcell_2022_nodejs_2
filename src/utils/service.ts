import axios from 'axios'
import { IProduct } from '../models/IProduct'

const baseURL = 'https://www.jsonbulut.com/json/'
const ref = 'd1becef32825e5c8b0fc1b096230400b'

// axios config
const config = axios.create({
    baseURL: baseURL,
    params: { ref: ref },
    timeout: 15000,
    //headers: { 'token': '1231231231' }
})

// all Product
export const allProduct = async () => {
    const sendParams = {
        start: '0'
    }
    return await config.get<IProduct>('product.php', {params: sendParams})
}