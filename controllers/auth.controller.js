import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const signup = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body
    // Error a corregir cuando viene vacio {}
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}