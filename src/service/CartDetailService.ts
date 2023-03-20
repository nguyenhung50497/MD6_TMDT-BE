import { CartDetail } from "../model/cart-detail";
import { AppDataSource } from "../data-source";

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
}
export default new CartDetailService();
