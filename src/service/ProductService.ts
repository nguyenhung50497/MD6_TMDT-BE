
import {Request, Response} from "express";

import { AppDataSource } from "../data-source";
import { Product } from "../model/product";

class ProductService {
   private productRepository;

   constructor() {
      this.productRepository = AppDataSource.getRepository(Product);
   }

   getAllProduct = async (limit, offset) => {
      let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser LIMIT ${limit} OFFSET ${offset}`;
      let products = await this.productRepository.query(sql);
      if (!products) {
         return "No products found";
      }
      return products;
   };

   save = async (product) => {
      return this.productRepository.save(product);
   };

   findById = async (idProduct) => {
      let sql = `select * from product p join shop s on p.idShop = s.idShop join category c on p.idCategory = c.idCategory join user u on s.idUser = u.idUser where p.idProduct = ${idProduct}`;
      let product = await this.productRepository.query(sql);
      if (!product) {
         return null;
      }
      return product[0];
   };

   update = async (idProduct, newProduct) => {
      let product = await this.productRepository.findOneBy({
         idProduct: idProduct,
      });
      if (!product) {
         return null;
      }
      return this.productRepository.update(
         { idProduct: idProduct },
         newProduct
      );
   };

   delete = async (idProduct) => {
      let products = await this.productRepository.findOneBy({
         idProduct: idProduct,
      });
      if (!products) {
         return null;
      }
      return this.productRepository.delete({ idProduct: idProduct });
   };

   count = async (limit) => {
      let sql = `select COUNT(idProduct) c from product`;
      let products = await this.productRepository.query(sql);
      let totalPage = Math.ceil(+products[0].c / limit);
      return totalPage;
   };

   checkUser = async (idUser, idProduct) => {
      let sql = `select u.idUser from product p join shop s on p.idShhop = s.idShop join user u on s.idUser = u.idUser where p.idProduct = ${idProduct}`;
      let checkIdUser = await this.productRepository.query(sql);
      if (checkIdUser === idUser) {
         return true;
      }
      return false;
   };
   getAll = async () => {
      let sql = `select idProduct, nameProduct, price, image, addressShop, nameCategory
                   from product p
                            join category c on p.idCategory = c.idCategory
                            join shop s on p.idShop = s.idShop
                            join user u on s.idUser = u.idUser
                   order by idProduct DESC`;
      let product = await this.productRepository.query(sql);
      return product;
   };
   search = async (req: Request, res: Response) => {
      let sql = `select *
                   from product p
                            join category c on p.idCategory = c.idCategory
                            join shop s on p.idShop = s.idShop
                            join user u on s.idUser = u.idUser
                   where (1 = 1) `;
      if (req.query.nameProduct !== undefined) {
         sql += `and nameProduct like '%${req.query.nameProduct}%'`;
      }
      if (req.query.idProduct !== undefined) {
         sql += `and idProduct like '%${req.query.idProduct}%'`;
      }
      if (
         req.query.minPrice !== undefined &&
         req.query.maxPrice !== undefined
      ) {
         sql += `and price between '${req.query.minPrice}' AND '${req.query.maxPrice}' `;
      } else if (
         req.query.minPrice !== undefined &&
         req.query.maxPrice === undefined
      ) {
         sql += `and price between '${req.query.minPrice}' AND '1000000000000000000' `;
      } else if (
         req.query.minPrice === undefined &&
         req.query.maxPrice !== undefined
      ) {
         sql += `and price between '0' AND '${req.query.maxPrice}'`;
      }
      if (
         req.query.addressShop !== undefined &&
         typeof req.query.addressShop === "string"
      ) {
         sql += `and addressShop like '%${req.query.addressShop}%'`;
      }
      if (
         req.query.addressShop !== undefined &&
         typeof req.query.addressShop === "object"
      ) {
         sql += `and (addressShop like '%${req.query.addressShop[0]}%'`;
         for (let i = 1; i < req.query.addressShop.length; i++) {
            sql += ` or addressShop like '%${req.query.addressShop[i]}%'`;
         }
         sql += `)`;
      }
      if (req.query.nameCategory !== undefined) {
         sql += `and nameCategory like '%${req.query.nameCategory}%'`;
      }
      if (req.query.keyword !== undefined) {
         sql += `and ( nameProduct like '%${req.query.keyword}%' or addressShop like '%${req.query.keyword}%' or nameCategory like '%${req.query.keyword}%')`;
      }
      sql += `order by idProduct DESC`;
      console.log(sql);
      let product = await this.productRepository.query(sql);
      return product;
   };
}

export default new ProductService();
