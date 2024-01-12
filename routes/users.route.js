import { Router } from "express"
import { UserController } from "../controllers/users.controller"

export const router = Router()

router.get('/', UserController.getAll())