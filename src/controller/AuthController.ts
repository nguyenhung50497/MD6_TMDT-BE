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
            let userCheck = {username: '', idGoogle: ''}
            if (checkEmail === 'not allowed') {
                userCheck.username = userGoogle.email
                userCheck.idGoogle = userGoogle.id
            } else {
                const baseString =
                    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

                const getRandomInt = (min, max) => {
                    return Math.floor(Math.random() * (max - min)) + min;
                };

                const getRandomString = (length, base) => {
                    let result = ''
                    const baseLength = base.length;

                    for (let i = 0; i < length; i++) {
                        const randomIndex = getRandomInt(0, baseLength);
                        result += base[randomIndex];
                    }

                    return result;
                };
                let passwordGoogle = getRandomString(8, baseString)
                let googleRegister = {
                    username: userGoogle.email,
                    password: passwordGoogle,
                    emailUser: userGoogle.email,
                    fullName: userGoogle.given_name,
                    avatar: userGoogle.picture,
                    idGoogle: userGoogle.id,
                }
                await this.AuthService.registerGoogle(googleRegister)
                userCheck.username = userGoogle.email
                userCheck.idGoogle = userGoogle.id
            }
            let user = await this.AuthService.checkUserGoogle(userCheck)
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController()