import {Router} from "express";
import AuthController from "../Controllers/AuthController.js";
import {check} from 'express-validator'
import {RoleMiddleware} from "../middleware/RoleMiddleeware.js"
import {AuthMiddleware} from "../middleware/AuthMiddleware.js";

const AuthRouter = new Router()

AuthRouter.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть от 4 до 8 символов').isLength({min: 4, max: 8})
    ],
    AuthController.registration)
AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/users', RoleMiddleware(['ADMIN']), AuthController.getUsers)
AuthRouter.get('/users/me', AuthMiddleware, AuthController.getMe)

export default AuthRouter