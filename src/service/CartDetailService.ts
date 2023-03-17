import { CartDetail } from "../model/cart-detail";
import { AppDataSource } from "../data-source";

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


}
export default new CartDetailService();
