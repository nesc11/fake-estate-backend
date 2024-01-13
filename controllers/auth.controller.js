import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import { hashPassword, comparePassword, createJWT } from '../modules/auth.js'

export const signup = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body
    // Error a corregir cuando viene vacio {}
    try {
        const newUser = new User({ username, email, password: hashPassword(password) })
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return next(errorHandler(404, 'Invalid credentials!!'))
        const validPassword = comparePassword(password, user.password)
        if (!validPassword) return next(errorHandler(401, 'Invalid credentials!'))
        const token = createJWT(user)
        const { password: pass, ...rest } = user._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const { username, email, photo } = req.body
    console.log('here')

    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = createJWT(user)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const generatedUsername = username.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4)
            const newUser = new User({ username: generatedUsername, email, password: hashPassword(generatedPassword), avatar: photo })
            await newUser.save()
            const token = createJWT(newUser)
            const { password: pass, ...rest } = newUser._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}