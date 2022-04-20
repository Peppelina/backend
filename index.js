import express from 'express'
import mongoose from "mongoose";
import PostRouter from "./Routes/PostRouter.js";
import {cors} from "./middleware/CORS-middleware.js"
import AuthRouter from "./Routes/AuthRouter.js";

const PORT = 5000
const DB_URL = `mongodb+srv://root:root@cluster0.iomjm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use(cors)
app.use(express.json()) /*в тип json*/
app.use('/api', PostRouter)
app.use('/auth', AuthRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('сервер работает ' + PORT))
        /*console.log(await User.find())*/
    }
    catch(e) {
        console.log(e)
    }
}

startApp()


