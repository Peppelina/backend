import express from 'express'
import mongoose from "mongoose";

const PORT = 5000
const DB_URL = `mongodb+srv://root:root@cluster0.iomjm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(express.json()) /*в ти json*/

app.get('/', (req, res) => {
    res.status(200).json('Сервер работает')
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('сервер работает ' + PORT))
    }
    catch(e) {
        console.log(e)
    }
}

startApp()

