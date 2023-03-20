import {CartDetail} from "../model/cart-detail";
import {AppDataSource} from "../data-source";
import {Request, Response} from "express";

class CartDetailService {
    private cartDetailRepository;

    constructor() {
        this.cartDetailRepository = AppDataSource.getRepository(CartDetail);
    }

    getAllCart = async () => {
        let cartDetails = await this.cartDetailRepository.find();
        return cartDetails;
    };

    save = async (cartDetail) => {
        return this.cartDetailRepository.save(cartDetail);
    };

    salesStats = async (req: Request, res: Response) => {
        console.log(req.query)
        let sql = `select * from cart_detail cd
                            join product p on cd.idProduct = p.idProduct
                            join shop s on p.idShop = s.idShop
                            join cart c on cd.idCart = c.idCart
                            join user u on c.idUser = u.idUser
                   where (1 = 1)`

        let allSalesStats = await this.cartDetailRepository.query(sql);
        if (!allSalesStats) {
            return null;
        }
        let salesStats = []
        if (req.query.week !== undefined && req.query.month !== undefined && req.query.year !== undefined) {
            for (let i = 0; i < allSalesStats.length; i++) {
                let day = allSalesStats[i].timeCartDetail
                let getWeekOfMonth = function (day) {
                    let firstWeekday = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
                    let offsetDate = day.getDate() + firstWeekday - 1;
                    return Math.ceil(offsetDate / 7);
                }
                let myDate = new Date(day)
                if (getWeekOfMonth(myDate) === +req.query.week) {
                    salesStats.push(allSalesStats[i])
                }
            }
        }
        if (req.query.week === undefined && req.query.month !== undefined && req.query.year !== undefined) {
            for (let i = 0; i < allSalesStats.length; i++) {
                let day = allSalesStats[i].timeCartDetail
                let month = new Date(day).getMonth() + 1;
                if (month === +req.query.month) {
                    salesStats.push(allSalesStats[i])
                }
            }
        }
        if (req.query.week === undefined && req.query.month === undefined && req.query.year !== undefined) {
            for (let i = 0; i < allSalesStats.length; i++) {
                let day = allSalesStats[i].timeCartDetail
                let year = new Date(day).getFullYear();
                if (year === +req.query.year) {
                    salesStats.push(allSalesStats[i])
                }
            }
        }
        if(req.query.week === undefined && req.query.month === undefined && req.query.year === undefined){
            salesStats = [...allSalesStats]
        }
        let sales = 0
        for (let i = 0; i < salesStats.length; i++) {
            sales += salesStats[i].priceInCart * salesStats[i].quantityCart
        }
        return salesStats
    };
}

export default new CartDetailService();
