import {Request, Response} from "express";
import AuthService from "../service/AuthService";

class AuthController {
    private AuthService

    constructor() {
        this.AuthService = AuthService;
    }

    login = async (req: Request, res: Response) => {
        try {
            let user = await this.AuthService.checkUser(req.body)
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    checkEmail = async (req: Request, res: Response) => {
        try {
            let check = req.body
            let email = check.emailUser
            let checkEmail = await this.AuthService.checkEmail(email)
            res.status(200).json(checkEmail)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    checkPhone = async (req: Request, res: Response) => {
        try {
            let check = await this.AuthService.checkPhoneUser(req.body)
            res.status(200).json(check)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    register = async (req: Request, res: Response) => {
        try {
            let userRegister = req.body
            let user = await this.AuthService.register(userRegister)
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    loginGoogle = async (req: Request, res: Response) => {
        try {
            let userGoogle = req.body
            let checkEmail = await this.AuthService.checkEmail(userGoogle.email)
            let userCheck = {username: '', password: ''}
            if (checkEmail === 'not allowed') {
                userCheck.username = userGoogle.email
                userCheck.password = userGoogle.id
            } else {
                let googleRegister = {
                    username: userGoogle.email,
                    password: userGoogle.id,
                    emailUser: userGoogle.email,
                    fullName: userGoogle.given_name,
                    avatar: userGoogle.picture
                }
                await this.AuthService.register(googleRegister)
                userCheck.username = userGoogle.email
                userCheck.password = userGoogle.id
            }
            let user = await this.AuthService.checkUser(userCheck)
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController()