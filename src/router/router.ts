import {Router} from "express";
import {authRouter} from "./AuthRouter";
import {auth} from "../middleware/auth";
export  const router = Router()
router.use('/auth', authRouter)
router.use(auth)