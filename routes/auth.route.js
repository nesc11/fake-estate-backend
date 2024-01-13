import { Router } from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

export const router = Router()

router.post('/sign-up', signup)
router.post('/sign-in', signin)
router.post('/google', google)