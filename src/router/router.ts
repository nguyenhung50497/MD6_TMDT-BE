import {Router} from "express";
import { productRouter } from "./product-router";
export  const router = Router()

router.use("/api/products", productRouter);