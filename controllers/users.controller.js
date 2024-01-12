export class UserController {
    static async getAll(req, res) {
        res.json({ users: [] })
    }
    static async getById(req, res) {
        res.json({ user: {} })
    }
}