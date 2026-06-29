import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import shopModel from "../models/shopModel.js";

// add food items

const addFood = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      if (!req.file) {
        return res.json({ success: false, message: "Image is required" });
      }

      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
        shopId: req.body.shopId || null,
      });

      if (!food.shopId || !mongoose.Types.ObjectId.isValid(food.shopId)) {
        return res.json({ success: false, message: "Valid shop is required" });
      }

      const shop = await shopModel.findById(food.shopId);
      if (!shop) {
        return res.json({ success: false, message: "Selected shop not found" });
      }
      if (!shop.categories.includes(req.body.category)) {
        return res.json({
          success: false,
          message: "Selected shop does not provide this category",
        });
      }

      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const { category, shopId } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (shopId && shopId !== "all") {
      if (!mongoose.Types.ObjectId.isValid(shopId)) {
        return res.json({ success: false, message: "Invalid shop id" });
      }
      query.shopId = shopId;
    }

    const foods = await foodModel
      .find(query)
      .populate("shopId", "name image rating eta categories");

    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.json({ success: false, message: "Food item not found" });
      }

      const imagePath = path.join("uploads", food.image);
      await fs.unlink(imagePath).catch(() => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
