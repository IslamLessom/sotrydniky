const { prisma } = require('../prisma/prisma-client')
const brypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/*
    @route POST /api/user/login
    @desc Логин
    @access Public
*/

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Пожалуйста , заполните обязательные поля' })
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        })

        const isPasswordCorrect = user && (await brypt.compare(password, user.password)) //мы сравниваем два пароля пароль который пришел с клиента и хэш пароля который в текушем пользователе хранится и записываем ответ  впеременной
        const secret = process.env.JWT_SECRET;

        if (user && isPasswordCorrect) { // если пароль верный и пользователь нашёлся
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({ message: 'Неверно введён логин или пароль' })
        }

    } catch {
        res.status(400).json({ message: 'Что-то пошло не так' })
    }

}

/*
    @route POST /api/user/register
    @desc Регистрация
    @access Public
*/

const register = async (req, res, next) => {
    const { email, password, name } = req.body

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Пожалуйста заполните обязательные поля' })
        }

        const registeredUser = await prisma.user.findFirst() //проверям если такой email в нашей бд

        if (registeredUser) {
            return res.status(400).json({ message: 'Такой email уже существует' })
        }

        const salt = await brypt.genSalt(10) //строка которая будетт добавляться к хэшу для усиления безопасности пароля
        const hashedPassword = await brypt.hash(password, salt) //шифруем пароль 

        const user = await prisma.user.create({ //создаем пользователя
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({ message: 'Не удалось создать пользователя' })
        }

    } catch {
        res.status(400).json({ message: 'Что-то пошло не так' })
    }

}

/*
    @route POST /api/user/current
    @desc Текуший пользователь
    @access Private
*/

const current = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch {
        res.status(400).json({ message: 'Что-то пошло не так' })
    }
}


module.exports = {
    login,
    register,
    current
}