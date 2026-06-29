import shopModel from "../models/shopModel.js";
import userModel from "../models/userModel.js";

const getIsAdmin = async (userId) => {
  const user = await userModel.findById(userId);
  return user && user.role === "admin";
};

const addShop = async (req, res) => {
  try {
    const isAdmin = await getIsAdmin(req.userId);
    if (!isAdmin) {
      return res.json({ success: false, message: "You are not admin" });
    }

    const { name, image = "", categories = [], rating, eta } = req.body;
    if (!name || !Array.isArray(categories) || categories.length === 0) {
      return res.json({
        success: false,
        message: "Shop name and categories are required",
      });
    }

    const normalizedCategories = categories
      .map((item) => String(item).trim())
      .filter(Boolean);

    const shop = new shopModel({
      name: String(name).trim(),
      image,
      categories: normalizedCategories,
      rating: Number(rating) || 4.2,
      eta: eta || "25-35 min",
    });

    await shop.save();
    return res.json({ success: true, message: "Shop added", data: shop });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

const listShops = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };

    if (category && category !== "All") {
      query.categories = category;
    }

    const shops = await shopModel.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, data: shops });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

const removeShop = async (req, res) => {
  try {
    const isAdmin = await getIsAdmin(req.userId);
    if (!isAdmin) {
      return res.json({ success: false, message: "You are not admin" });
    }

    await shopModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: "Shop removed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export { addShop, listShops, removeShop };
