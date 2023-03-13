import {Router} from "express";
import {authRouter} from "./AuthRouter";
import {auth} from "../middleware/auth";
import {userRouter} from "./User-router";
export  const router = Router()
router.use('/api/auth', authRouter)
router.use(auth)
router.use('/api/users', userRouter)