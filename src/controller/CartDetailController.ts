import categoryService from "../service/CategoryService";
import { Request, Response } from "express";
import productService from "../service/ProductService";
import cartDetailService from "../service/CartDetailService";
import cartService from "../service/CartService";

class ProductController {
   private productService;
   private categoryService;
   private cartDetailService;
   private cartService;

   constructor() {
      this.productService = productService;
      this.categoryService = categoryService;
      this.cartDetailService = cartDetailService;
      this.cartService = cartService;
   }

   getAllCartDetail = async (req: Request, res: Response) => {
      try {
         let cartDetails = await cartDetailService.getAll();
         return res.status(200).json(cartDetails);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   findCartDetailById = async (req: Request, res: Response) => {
      try {
         let cartDetails = await cartDetailService.findById(req.params.id);
         return res.status(200).json(cartDetails);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   createCartDetail = async (req: Request, res: Response) => {
      try {
         let cartDetail = await cartDetailService.save(req.body);
         return res.status(200).json(cartDetail);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   updateCartDetail = async (req: Request, res: Response) => {
      try {
         let cartDetail = await cartDetailService.update(
            req.params.id,
            req.body
         );
         return res.status(200).json(cartDetail);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   deleteCartDetail = async (req: Request, res: Response) => {
      try {
         let cartDetail = await cartDetailService.remove(req.params.id);
         return res.status(200).json(cartDetail);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   findCartDetailByIdUser = async (req: Request, res: Response) => {
      try {
         let cartDetails = await cartDetailService.findByIdUser(req.params.id);
         return res.status(200).json(cartDetails);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

}

export default new ProductController();
