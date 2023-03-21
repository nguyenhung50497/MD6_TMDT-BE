import {Cart} from "../model/cart";
import {AppDataSource} from "../data-source";

class CartService {
    private cartRepository;

    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart);
    }

    detailCart = async (idCart, idShop) => {
        let sql = `SELECT *
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN product p on cd.idProduct = p.idProduct
                   WHERE c.idCart = ${idCart} AND p.idShop = ${idShop}`
        let cart = await this.cartRepository.query(sql);
        return cart;
    }
    searchByPhone = async (id, phone) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE au.phoneAddress LIKE '%${phone}%'
                     AND p.idShop = ${id}
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName
        `
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByName = async (id, name) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND u.fullName LIKE '%${name}%'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByIdCart = async (idShop, idCart) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${idShop}
                     AND c.idCart = ${idCart}
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByStatus = async (id, statusCart) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart = "${statusCart}"
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    searchByCategory = async (id, category) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                            JOIN category c2 on p.idProduct = c2.idCategory
                   WHERE p.idShop = ${id}
                     AND c2.nameCategory LIKE '%${category}%'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart,
                            idAddressUser,
                            u.fullName`
        let carts = await this.cartRepository.query(sql);
        return carts;
    }
    getAllCart = async (id) => {
        let sql = `SELECT c.idCart,
                          statusCart,
                          timePayCart,
                          idAddressUser,
                          au.idAddress,
                          phoneAddress,
                          province,
                          district,
                          typeAddress,
                          descriptionAddress,
                          receiver,
                          u.fullName
                   FROM cart c
                            JOIN cart_detail cd on c.idCart = cd.idCart
                            JOIN address_user au on c.idAddressUser = au.idAddress
                            JOIN product p on cd.idProduct = p.idProduct
                            JOIN user u on c.idUser = u.idUser
                   WHERE p.idShop = ${id}
                     AND c.statusCart != 'chưa thanh toán'
                   GROUP BY c.idCart, statusCart, timePayCart, idAddressUser, au.idAddress, statusCart, timePayCart, idAddressUser,
                       u.fullName`
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
            await this.cartRepository.update({idCart: idCart}, {statusCart: 'hủy đơn'})
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




