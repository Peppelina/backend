import jwt from "jsonwebtoken";
import {config} from '../config.js'

export const AuthMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS")
        next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) /*если не содержит*/
            return res.status(403).json({ message: "Пользователь не авторизован"})

        const decodedData = jwt.verify(token, config.secretKey) /*вернет payload*/
        req.user = decodedData // {id, roles[]}
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "Пользователь не авторизован"})
    }
}