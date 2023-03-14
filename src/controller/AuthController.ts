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
    register = async (req: Request, res: Response) => {
        try {
            let userRegister = req.body
            let checkEmail = await this.AuthService.checkEmail(userRegister.emailUser)
            let checkPhone = await this.AuthService.checkPhoneUser(userRegister.phoneUser)
            let user
            if (checkEmail === 'allow' && checkPhone === 'allow') {
                user = await this.AuthService.register(userRegister)
            } else {
                user = 'not allowed'
            }
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}
export default new AuthController()