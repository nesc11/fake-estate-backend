import { hashSync } from 'bcryptjs'
import User from '../models/user.model'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}