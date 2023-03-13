import {AppDataSource} from "../data-source";
import {User} from "../model/user";

class UserService {
    private userRepository
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    editUser = async (id, newUser) => {
        let user = await this.userRepository.findOneBy({idUser: id})
        if (!user) {
            return null;
        }
        await this.userRepository.update({idUser: id}, newUser)
        return 'success'
    }
    getAll = async () => {
        let user = await this.userRepository.find()
        return user
    }
    getUser = async (id) => {
        let user = await this.userRepository.findOneBy({idUser: id})
        return user;
    }
    changePassword = async (user, newPass) => {
        return await this.userRepository.update({idUser: user.idUser}, {password:newPass})
    }
    findUser = async (id) => {
        let user = await this.userRepository.findOneBy({idUser: id})
        if (!user) {
            return null;
        }else{
            return user
        }
    }
}
export default new UserService()