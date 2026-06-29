import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import shopModel from "../models/shopModel.js";
import foodModel from "../models/foodModel.js";

const categories = [
  "Salad",
  "Rolls",
  "Deserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
];

const shopSeed = [
  { name: "Green Bowl Kitchen", categories: ["Salad"], rating: 4.6, eta: "20-30 min" },
  { name: "Wrap Wagon", categories: ["Rolls"], rating: 4.4, eta: "25-35 min" },
  { name: "Sweet Studio", categories: ["Deserts", "Cake"], rating: 4.7, eta: "30-40 min" },
  { name: "Toast & Co.", categories: ["Sandwich"], rating: 4.3, eta: "20-28 min" },
  { name: "Leafy Garden", categories: ["Pure Veg", "Salad"], rating: 4.5, eta: "22-32 min" },
  { name: "Pasta Piazza", categories: ["Pasta"], rating: 4.6, eta: "24-34 min" },
  { name: "Noodle Nest", categories: ["Noodles"], rating: 4.5, eta: "18-28 min" },
  { name: "Urban Multi-Cuisine", categories, rating: 4.2, eta: "30-45 min" },
];

const foodTemplates = {
  Salad: ["Greek Salad", "Veg Crunch Bowl", "Clover Salad", "Chicken Caesar Salad"],
  Rolls: ["Lasagna Roll", "Peri Peri Roll", "Chicken Roll", "Paneer Roll"],
  Deserts: ["Ripple Ice Cream", "Fruit Ice Cream", "Jar Ice Cream", "Vanilla Scoop"],
  Sandwich: ["Grilled Sandwich", "Chicken Sandwich", "Club Sandwich", "Vegan Sandwich"],
  Cake: ["Cup Cake", "Vegan Cake", "Butterscotch Cake", "Chocolate Slice"],
  "Pure Veg": ["Garlic Mushroom", "Fried Cauliflower", "Mix Veg Pulao", "Rice Zucchini"],
  Pasta: ["Cheese Pasta", "Tomato Pasta", "Creamy Pasta", "Chicken Pasta"],
  Noodles: ["Butter Noodles", "Veg Noodles", "Somen Noodles", "Spicy Wok Noodles"],
};

const seed = async () => {
  await connectDB();

  await shopModel.deleteMany({});
  const shops = await shopModel.insertMany(shopSeed);

  const imageByCategory = {};
  const existingFoods = await foodModel.find({});
  for (const food of existingFoods) {
    if (!imageByCategory[food.category] && food.image) {
      imageByCategory[food.category] = food.image;
    }
  }

  // assign shop to older foods where missing
  for (const food of existingFoods) {
    if (!food.shopId && food.category) {
      const match = shops.find((shop) => shop.categories.includes(food.category));
      if (match) {
        food.shopId = match._id;
        await food.save();
      }
    }
  }

  const newFoods = [];
  for (const category of categories) {
    const templates = foodTemplates[category];
    const categoryShops = shops.filter((shop) => shop.categories.includes(category));
    for (let i = 0; i < templates.length; i += 1) {
      const selectedShop = categoryShops[i % categoryShops.length];
      newFoods.push({
        name: templates[i],
        description: `${templates[i]} prepared by ${selectedShop.name}`,
        price: 10 + i * 2,
        image: imageByCategory[category] || "placeholder.png",
        category,
        shopId: selectedShop._id,
      });
    }
  }

  await foodModel.insertMany(newFoods);
  console.log("Seed complete: shops and foods created.");
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.connection.close();
  process.exit(1);
});
