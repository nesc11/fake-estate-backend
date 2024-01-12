import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'

const hashPassword = (password) => bcryptjs.hashSync(password, 10)

const comparePassword = (password, hashedPassword) => bcryptjs.compareSync(password, hashedPassword)

const createJWT = (user) => {
    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET)
    return token
}

const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }

    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
        return
    } catch (error) {
        console.log(e)
        res.status(401)
        res.json({ message: 'Not valid token' })
    }
}

export { hashPassword, comparePassword, createJWT, protect }