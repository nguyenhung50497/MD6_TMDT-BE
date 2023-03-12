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
    let product = await this.productRepository.findOneBy({ idProduct: idProduct });
    return product;
  };

  update = async (idProduct, newProduct) => {
    let product = await this.productRepository.findOneBy({ idProduct: idProduct });
    if (!product) {
      return null;
    }
    return this.productRepository.update({ idProduct: idProduct }, newProduct);
  };

  delete = async (idProduct) => {
    let products = await this.productRepository.findOneBy({ idProduct: idProduct });
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
    let sql = `select u.idUser from product p join shop s on p.idShhop = s.idShop join user u on s.idUser = u.idUser where p.idProduct = ${idProduct}`
    let checkIdUser = await this.productRepository.query(sql);
    if (checkIdUser === idUser) {
      return true;
    }
    return false;
  };

}

export default new ProductService();
