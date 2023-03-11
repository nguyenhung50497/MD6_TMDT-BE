import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";

class AuthService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    checkEmail = async (email) => {
        try {
            let emailCheck = await this.userRepository.findOneBy({emailUser: email})
            if (!emailCheck) {
                return 'allow'
            } else {
                return 'not allowed'
            }
        } catch (e) {
            console.log(e)
        }
    }
    checkPhoneUser = async (numberPhone) => {
        try {
            let phoneCheck = await this.userRepository.findOneBy({phoneUser: numberPhone})
            if (!phoneCheck) {
                return 'allow'
            } else {
                return 'not allowed'
            }
        } catch (e) {
            console.log(e)
        }
    }
    register = async (user) => {
        try {
            user.password = await bcrypt.hash(user.password, 10)
            return this.userRepository.save(user)
        } catch (e) {
            console.log(e)
        }
    }
    checkUser = async (user) => {
        try {
            let userCheck = await this.userRepository.findOneBy({username: user.username})
            if (!userCheck) {
                return 'user not found'
            } else {
               let passwordCompare = await bcrypt.compare(user.password, userCheck.password)
                if (!passwordCompare) {
                    return 'Password does not match'
                }else {
                    let payload = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role
                    }
                    const token = jwt.sign(payload, SECRET, {
                        expiresIn: 3600000
                    })
                    const check = {
                        token: token,
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                    }
                    return check;
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}
export default new AuthService()