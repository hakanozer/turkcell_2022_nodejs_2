export const login = ( email:string, password: string ) => {
    if (email === 'ali@mail.com' && password === '12345' ) {
        return true
    }else {
        return false
    }
}