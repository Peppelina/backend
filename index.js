import express from 'express'
import mongoose from "mongoose";
import Post from "./Post.js";
import router from "./router.js";

const PORT = 5000
const DB_URL = `mongodb+srv://root:root@cluster0.iomjm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(express.json()) /*в ти json*/
app.use('/api', router)



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

