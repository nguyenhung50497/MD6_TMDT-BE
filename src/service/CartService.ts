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
   orderStatusConfirm = async (idCart,day) => {
      let cart = await this.cartRepository.findOneBy({idCart: idCart})
      if (!cart) {
         return null
      } else {
         await this.cartRepository.update({idCart: idCart}, {statusCart: 'confirm',timePayCart: day})
         return 'confirm'
      }
   }
   orderStatusSending = async (idCart) => {
      let cart = await this.cartRepository.findOneBy({idCart: idCart})
      if (!cart) {
         return null
      } else {
         let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'waiting'})
         return 'waiting'
      }
   }
   orderStatusComplete = async (idCart) => {
      let cart = await this.cartRepository.findOneBy({idCart: idCart})
      if (!cart) {
         return null
      } else {
         let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'complete'})
         return 'complete'
      }
   }
   orderStatusRefunds = async (idCart) => {
      let cart = await this.cartRepository.findOneBy({idCart: idCart})
      if (!cart) {
         return null
      } else {
         let order = await this.cartRepository.update({idCart: idCart}, {statusCart: 'cancel'})
         return 'cancel'
      }
   }
   removeCart = async (idCart) => {
      let cart = await this.cartRepository.findOneBy({idCart: idCart})
      if (!cart) {
         return null
      } else {
         await this.cartRepository.delete({idCart: idCart})
         return 'delete'
      }
   }
}
export default new CartService();




