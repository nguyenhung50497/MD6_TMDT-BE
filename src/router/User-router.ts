import {Router} from "express";
import UserController from "../controller/userController";
export const userRouter = Router()
userRouter.get('/', UserController.showListUser)
userRouter.put('/:id', UserController.editUser)
userRouter.put('/password/:id', UserController.changePassword)
userRouter.get('/profile/:id', UserController.showProfile)