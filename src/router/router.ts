
import { productRouter } from "./product-router";
import { categoryRouter } from "./category-router";

import {Router} from "express";
import {authRouter} from "./AuthRouter";
import {auth} from "../middleware/auth";
export  const router = Router()
router.use('/auth', authRouter)
router.use(auth)
router.use("/api/products", productRouter);
router.use("/api/categories", categoryRouter);