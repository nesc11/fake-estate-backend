import { Router } from "express"
import { UserController } from "../controllers/users.controller.js"

export const router = Router()

router.get('/', UserController.getAll)