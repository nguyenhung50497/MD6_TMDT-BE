import {Request, Response} from "express";
import CartService from "../service/CartService";

class CartController {
    private cartService
    constructor() {
        this.cartService = CartService;
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
}
export default new CartController()