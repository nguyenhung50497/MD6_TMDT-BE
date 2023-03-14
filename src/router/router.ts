import { Router } from "express";
import { productRouter } from "./product-router";
import { categoryRouter } from "./category-router";
export const router = Router();

router.use("/api/products", productRouter);
router.use("/api/categories", categoryRouter);
