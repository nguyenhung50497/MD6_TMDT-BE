import { Cart } from "../model/cart";
import { AppDataSource } from "../data-source";

class CartService {
   private cartRepository;
   constructor() {
      this.cartRepository = AppDataSource.getRepository(Cart);
   }

   getAllCart = async () => {
      let carts = await this.cartRepository.find();
      return carts;
   };

   saveCart = async (cart) => {
    return this.cartRepository.save(cart);
   }
}
export default new CartService();
