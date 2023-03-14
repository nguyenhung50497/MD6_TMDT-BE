import AuthController from "../controller/AuthController";
import {Router} from "express";

export const authRouter = Router()
authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)