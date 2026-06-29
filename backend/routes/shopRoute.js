import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addShop, listShops, removeShop } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get("/list", listShops);
shopRouter.post("/add", authMiddleware, addShop);
shopRouter.post("/remove", authMiddleware, removeShop);

export default shopRouter;
