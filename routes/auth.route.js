import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

export const router = Router()

router.post('/sign-up', signup)