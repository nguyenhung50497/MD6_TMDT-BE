import categoryService from "../service/CategoryService";
import { Request, Response } from "express";
import productService from "../service/ProductService";
import cartDetailService from "../service/CartDetailService";

class ProductController {
   private productService;
   private categoryService;
   private cartDetailService;

   constructor() {
      this.productService = productService;
      this.categoryService = categoryService;
      this.cartDetailService = cartDetailService;
   }

   getAllCartDetail = async (req: Request, res: Response) => {};

    createCartDetail = async (req: Request, res: Response) => {
        try {
            let cartDetail = await cartDetailService.save(req.body);
            return res.status(200).json(cartDetail);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    salesStatsCartDetail = async (req: Request, res: Response) => {
        try {

            let cartDetails = await cartDetailService.salesStats(req, res);
            return res.status(201).json(cartDetails);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
}

export default new ProductController();
