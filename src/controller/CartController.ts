import {Request, Response} from "express";
import CartService from "../service/CartService";

class CartController {
    private cartService
    constructor() {
        this.cartService = CartService;
    }
    getAllCartShop = async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let carts = await this.cartService.getAllCart(id)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    orderStatusConfirm = async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let idUser = req.body.idUser
            let today = new Date()
            let day = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
            let cart = await this.cartService.orderStatusConfirm(id, day)
            if (cart === 'confirm') {
                await this.cartService.saveCart(idUser)
                return res.status(200).json('confirm');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    orderStatusSending = async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let cart = await this.cartService.orderStatusSending(id)
            return res.status(200).json(cart);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    orderStatusComplete = async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let cart = await this.cartService.orderStatusComplete(id)
            return res.status(200).json(cart);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    orderStatusRefunds = async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let cart = await this.cartService.orderStatusRefunds(id)
            return res.status(200).json(cart);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    removeCart =  async (req: Request, res: Response) => {
        try {
            let id =  req.params.id;
            let idUser = req.body.idUser
            let cart = await this.cartService.removeCart(id)
            if (cart === 'delete') {
                await this.cartService.saveCart(idUser)
                return res.status(200).json('delete');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    searchByStatusCart = async (req: Request, res: Response) => {
        try {
            let idCart =  req.params.id;
            let status = req.body.statusCart
            let carts = await this.cartService.searchByStatus(idCart, status)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    searchPhone = async (req: Request, res: Response) => {
        try {
            let idShop =  req.params.id;
            let phone = req.body.valueInput
            let carts = await this.cartService.searchByPhone(idShop, phone)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    searchName = async (req: Request, res: Response) => {
        try {
            let idShop =  req.params.id;
            let name = req.body.valueInput
            let carts = await this.cartService.searchByName(idShop, name)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    searchIdCart = async (req: Request, res: Response) => {
        try {
            let idShop =  req.params.id;
            let idCart = req.body.valueInput
            let carts = await this.cartService.searchByIdCart(idShop, idCart)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    getDetailCart = async (req: Request, res: Response) => {
        try {
            let cart =  req.body
            let carts = await this.cartService.detailCart(cart.idCart, cart.idShop)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    searchCategory = async (req: Request, res: Response) => {
        try {
            let idShop =  req.params.id;
            let idCart = req.body.valueInput
            let carts = await this.cartService.searchByCategory(idShop, idCart)
            return res.status(200).json(carts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}
export default new CartController()