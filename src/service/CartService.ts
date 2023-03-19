import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";

class CartService {
    private cartRepository;

    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    searchByPhone = async (id, phone) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          au.idAddress,
                          receiver,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          u.idUser,
                          fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE au.phoneAddress LIKE '%${phone}%'
                     AND p.idShop = ${id}`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByName = async (id, name) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          au.idAddress,
                          receiver,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          u.idUser,
                          fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND u.fullName = '${name}'`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByIdCart = async (idShop, idCart) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          au.idAddress,
                          receiver,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          u.idUser,
                          fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${idShop}
                     AND c.idCart = ${idCart}`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByStatus = async (id, statusCart) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          au.idAddress,
                          receiver,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          u.idUser,
                          fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart = "${statusCart}"`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    getAllCart = async (id) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          au.idAddress,
                          receiver,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          u.idUser,
                          fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart != 'chưa thanh toán'`
        let carts = await this.cartRepository.query(sql);
        return carts;
    };
    saveCart = async (cart) => {
        return this.cartRepository.save(cart);
    }
    orderStatusConfirm = async (idCart, day) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart})
        if (!cart) {
            return null
        } else {
            await this.cartRepository.update({idCart: idCart}, {statusCart: 'chờ xác nhận', timePayCart: day})
            return 'chờ xác nhận'
        }
    }
    orderStatusSending = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart})
        if (!cart) {
            return null
        } else {
            let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'đang xử lý'})
            return 'đang xử lý'
        }
    }
    orderStatusComplete = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart})
        if (!cart) {
            return null
        } else {
            let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'hoàn thành'})
            return 'hoàn thành'
        }
    }
    orderStatusRefunds = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart})
        if (!cart) {
            return null
        } else {
            let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'hủy đơn'})
            return 'hủy đơn'
        }
    }
    removeCart = async (idCart) => {
        let cart = await this.cartRepository.findOneBy({idCart: idCart})
        if (!cart) {
            return null
        } else {
            await this.cartRepository.delete({idCart: idCart})
            return 'delete'
        }
    }
}

export default new CartService();




