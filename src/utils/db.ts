import mongoose from 'mongoose';
const url = "mongodb://localhost:27017/node_2"
const option = {
    useNewUrlParser: true,
    dbName: "node_2",
}
export const db = mongoose.connect(url,option)