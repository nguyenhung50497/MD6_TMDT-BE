import { productRouter } from "./product-router";
import { categoryRouter } from "./category-router";
import {searchRouter} from "./search-router";
import {authRouter} from "./AuthRouter";
import {auth} from "../middleware/auth";
import {userRouter} from "./User-router";
import {shopRouter} from "./ShopRouter";
import {transportRouter} from "./TransportRouter";
import {Router} from "express";
export  const router = Router()
router.use('/api/auth', authRouter)
router.use(auth)
router.use("/api/products", productRouter);
router.use("/api/categories", categoryRouter)
router.use("/api/search",searchRouter)
router.use("/api/categories", categoryRouter);
router.use('/api/users', userRouter)
router.use('/api/shops', shopRouter)
router.use('/api/transport', transportRouter)