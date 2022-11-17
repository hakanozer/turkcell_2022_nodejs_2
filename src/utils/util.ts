import CryptoJS from 'crypto-js'

const key = process.env.Aes_key
export const encrypt = (plainText : string)  => {
    const cipherText = CryptoJS.AES.encrypt(plainText, key!)
    return cipherText.toString()
}

export const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, key!)
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}