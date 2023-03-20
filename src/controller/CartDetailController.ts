import categoryService from "../service/CategoryService";
import {Request, Response} from "express";
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

    getAllCartDetail = async (req: Request, res: Response) => {
    };

    createCartDetail = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            let cartDetail = await cartDetailService.save(req.body);
            return res.status(200).json(cartDetail);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    searchCartDetail = async (req: Request, res: Response) => {
        try {
            let limit = 20;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let cartDetails = await cartDetailService.search(req, res, limit, offset);
            return res.status(201).json({
                cartDetails: cartDetails.cartDetails,
                currentPage: page,
                totalPage: cartDetails.totalPage,
            });
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
