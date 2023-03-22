import { CartDetail } from "../model/cart-detail";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { cartDetailRouter } from "../router/cartDetail-router";

class CartDetailService {
   private cartDetailRepository;

   constructor() {
      this.cartDetailRepository = AppDataSource.getRepository(CartDetail);
   }

   getAll = async () => {
      let cartDetails = await this.cartDetailRepository.find();
      return cartDetails;
   };

   findById = async (id) => {
      let sql = `select * from product p 
      join shop s on p.idShop = s.idShop 
      join category c on p.idCategory = c.idCategory 
      join user u on s.idUser = u.idUser 
      join cart_detail cd on p.idProduct = cd.idProduct
      where p.idProduct = ${id} `;
      let cartDetail = await this.cartDetailRepository.query(sql);
      if (!cartDetail) {
         return null;
      }
      return cartDetail[0];
   };

   save = async (cartDetail) => {
      return this.cartDetailRepository.save(cartDetail);
   };

   update = async (id, newCartDetail) => {
      let cartDetail = await this.cartDetailRepository.findOneBy({
         idCartDetail: id,
      });
      if (!cartDetail) {
         return null;
      }
      return this.cartDetailRepository.update(
         { idCartDetail: id },
         newCartDetail
      );
   };

   remove = async (id) => {
      let cartDetail = await this.cartDetailRepository.findOneBy({
         idCartDetail: id,
      });
      if (!cartDetail) {
         return null;
      }
      return await this.cartDetailRepository.delete({ idCartDetail: id });
   };
   salesStats = async (req: Request, res: Response) => {
      let sql = `select * from cart_detail cd
                                     join product p on cd.idProduct = p.idProduct
                                     join shop s on p.idShop = s.idShop
                                     join cart c on cd.idCart = c.idCart
                                     join user u on c.idUser = u.idUser
                   where  statusCart not like '%chưa thanh toán%' and statusCart not like '%hủy đơn%'`;

      let allSalesStats = await this.cartDetailRepository.query(sql);
      if (!allSalesStats) {
         return null;
      }
      let salesStats = [];
      if (
         req.query.week !== undefined &&
         req.query.month !== undefined &&
         req.query.quarter !== undefined &&
         req.query.year !== undefined
      ) {
         for (let i = 0; i < allSalesStats.length; i++) {
            let day = allSalesStats[i].timePayCart;
            let month = new Date(day).getMonth() + 1;
            let year = new Date(day).getFullYear();
            let quarter;
            if (month === 1 || month === 2 || month === 3) {
               quarter = "1";
            }
            if (month === 4 || month === 5 || month === 6) {
               quarter = "2";
            }
            if (month === 7 || month === 8 || month === 9) {
               quarter = "3";
            }
            if (month === 10 || month === 11 || month === 12) {
               quarter = "4";
            }
            let getWeekOfMonth = function (day) {
               let firstWeekday = new Date(
                  day.getFullYear(),
                  day.getMonth(),
                  1
               ).getDay();
               let offsetDate = day.getDate() + firstWeekday - 1;
               return Math.ceil(offsetDate / 7);
            };
            let myDate = new Date(day);
            if (
               getWeekOfMonth(myDate) === +req.query.week &&
               month === +req.query.month &&
               quarter === req.query.quarter &&
               year === +req.query.year
            ) {
               salesStats.push(allSalesStats[i]);
            }
         }
      }
      if (
         req.query.week === undefined &&
         req.query.month !== undefined &&
         req.query.quarter !== undefined &&
         req.query.year !== undefined
      ) {
         for (let i = 0; i < allSalesStats.length; i++) {
            let day = allSalesStats[i].timePayCart;
            let month = new Date(day).getMonth() + 1;
            let year = new Date(day).getFullYear();
            let quarter;
            if (month === 1 || month === 2 || month === 3) {
               quarter = "1";
            }
            if (month === 4 || month === 5 || month === 6) {
               quarter = "2";
            }
            if (month === 7 || month === 8 || month === 9) {
               quarter = "3";
            }
            if (month === 10 || month === 11 || month === 12) {
               quarter = "4";
            }
            if (
               month === +req.query.month &&
               quarter === req.query.quarter &&
               year === +req.query.year
            ) {
               salesStats.push(allSalesStats[i]);
            }
         }
      }
      if (
         req.query.week === undefined &&
         req.query.month === undefined &&
         req.query.quarter !== undefined &&
         req.query.year !== undefined
      ) {
         for (let i = 0; i < allSalesStats.length; i++) {
            let day = allSalesStats[i].timePayCart;
            let month = new Date(day).getMonth() + 1;
            let year = new Date(day).getFullYear();
            let quarter;
            if (month === 1 || month === 2 || month === 3) {
               quarter = "1";
            }
            if (month === 4 || month === 5 || month === 6) {
               quarter = "2";
            }
            if (month === 7 || month === 8 || month === 9) {
               quarter = "3";
            }
            if (month === 10 || month === 11 || month === 12) {
               quarter = "4";
            }
            if (quarter === req.query.quarter && year === +req.query.year) {
               salesStats.push(allSalesStats[i]);
            }
         }
      }

      if (
         req.query.week === undefined &&
         req.query.month === undefined &&
         req.query.quarter === undefined &&
         req.query.year !== undefined
      ) {
         for (let i = 0; i < allSalesStats.length; i++) {
            let day = allSalesStats[i].timePayCart;
            let year = new Date(day).getFullYear();
            if (year === +req.query.year) {
               salesStats.push(allSalesStats[i]);
            }
         }
      }
      if (
         req.query.week === undefined &&
         req.query.month === undefined &&
         req.query.quarter === undefined &&
         req.query.year === undefined
      ) {
         salesStats = [...allSalesStats];
      }
      let sales = 0;
      for (let i = 0; i < salesStats.length; i++) {
         sales += salesStats[i].priceInCart * salesStats[i].quantityCart;
      }
      return salesStats;
   };
   findByIdUser = async (id) => {
      let sql = `select * from product p 
      join shop s on p.idShop = s.idShop 
      join category c on p.idCategory = c.idCategory 
      join cart_detail cd on p.idProduct = cd.idProduct
      join cart ct on cd.idCart = ct.idCart
      join user u on ct.idUser = u.idUser 
      where u.idUser = ${id} `;
      let cartDetails = await this.cartDetailRepository.query(sql);
      if (!cartDetails) {
         return null;
      }
      return cartDetails;
   };

   findByStatus = async (status, idUser) => {
      let sql = `select * from product p 
      join shop s on p.idShop = s.idShop 
      join category c on p.idCategory = c.idCategory 
      join cart_detail cd on p.idProduct = cd.idProduct
      join cart ct on cd.idCart = ct.idCart
      join user u on ct.idUser = u.idUser 
      where ct.statusCart = "${status}" and u.idUser = ${idUser}`;
      let cartDetails = await this.cartDetailRepository.query(sql);
      if (!cartDetails) {
         return null;
      }
      return cartDetails;
   };
}

export default new CartDetailService();
