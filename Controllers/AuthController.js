import User from "../Models/User.js";
import bcrypt from 'bcryptjs'
import Role from "../Models/Role.js";
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {config} from '../config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secretKey, {expiresIn: "24h"})
}

class AuthController {
    static async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {username, password} = req.body

            const candidat = await User.findOne({username})
            if (candidat) { /*что то содержит*/
                return res.status(400).json({message: "Пользоваель с таким ником уже существует"})
            }

            const hashPassword = bcrypt.hashSync(password, 7) /*кеширование пароля*/
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username: username, password: hashPassword, roles:[userRole.value]})
            await user.save()
            return res.status(200).json({message: "Пользователь был успешно зарегестрирован"})
        }
        catch (e) {
            res.status(400).json({message: "Registration error"})
        }
    }

    static async login(req, res) {
        try {
            const {username, password} = req.body

            const user = await User.findOne({username})
            if (!user) { /*не содержит ничего*/
                return res.status(400).json({message: `Пользоваель с ${username} не был найден`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            /*сравнение паролей: введеный и из бд, вернет тру или фолс*/
            if (!validPassword) {
                return res.status(400).json({message: "Введен неверный пароль"})
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})

        }
        catch (e) {
            res.status(400).json({message: "Login error"})
        }
    }
    static async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        }
        catch (e) {

        }
    }

    static async getMe(req, res) {
        try {
            const {id} = req.user
            const user = await User.findById(id)
            res.json(user)
        }
        catch (e) {

        }
    }
}

export default AuthController