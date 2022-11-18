import fs from 'fs'

const path = 'sample.txt'

// append Data
export const addData = (data: string) => {
    fs.appendFile(path, data+'\n', (err) => {
        if (!err) {
            console.log("Append Data Success");
        }
    })
}

// read Data
export const readData = () => {
    const data = fs.readFileSync(path, 'utf-8' )
    console.log(data);
}