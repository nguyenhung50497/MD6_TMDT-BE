import {Router} from "express";
import CartController from "../controller/CartController";

export const cartRouter = Router();
cartRouter.get('/:id',CartController.getAllCartShop)
cartRouter.post("/:id", CartController.searchByStatusCart)
cartRouter.post('/search-by-name/:id', CartController.searchName)
cartRouter.post('/search-by-idCart/:id', CartController.searchIdCart)
cartRouter.post('/search-by-phone/:id', CartController.searchPhone)
cartRouter.get('/detail-cart/:id', CartController.getDetailCart)
cartRouter.get('/order-status-sending/:id', CartController.orderStatusSending)
cartRouter.get('/order-status-refunds/:id',CartController.orderStatusRefunds)
cartRouter.post('/search-by-category/:id', CartController.searchCategory)