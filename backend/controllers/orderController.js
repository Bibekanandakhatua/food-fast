import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DELIVERY_FEE = 2;

const isAdmin = async (userId) => {
  const userData = await userModel.findById(userId);
  return userData && userData.role === "admin";
};

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontendUrl =
    process.env.FRONTEND_URL || "https://food-delivery-frontend-s2l9.onrender.com";

  try {
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const normalizedItems = req.body.items
      .map((item) => ({
        foodId: item._id || item.foodId || item.id,
        quantity: Number(item.quantity) || 0,
      }))
      .filter((item) => item.foodId && item.quantity > 0);

    if (!normalizedItems.length) {
      return res.json({ success: false, message: "Invalid cart items" });
    }

    const foodIds = normalizedItems.map((item) => item.foodId);
    const foods = await foodModel.find({ _id: { $in: foodIds } });
    const foodMap = new Map(foods.map((food) => [food._id.toString(), food]));

    const orderItems = [];
    let subtotal = 0;

    for (const item of normalizedItems) {
      const food = foodMap.get(item.foodId.toString());
      if (!food) {
        return res.json({
          success: false,
          message: "One or more food items are unavailable",
        });
      }

      const lineTotal = food.price * item.quantity;
      subtotal += lineTotal;
      orderItems.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: item.quantity,
      });
    }

    const amount = subtotal + DELIVERY_FEE;
    const newOrder = new orderModel({
      userId: req.userId,
      items: orderItems,
      amount,
      address: req.body.address,
    });

    await newOrder.save();

    const lineItems = orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/verify?orderId=${newOrder._id}&canceled=true`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: req.userId,
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, sessionId } = req.body;

  try {
    if (!orderId || !sessionId) {
      return res.json({ success: false, message: "Missing verification data" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.orderId !== orderId) {
      return res.json({ success: false, message: "Invalid session for order" });
    }

    if (session.payment_status !== "paid") {
      await orderModel.findByIdAndUpdate(orderId, { status: "Payment Failed" });
      return res.json({ success: false, message: "Payment not completed" });
    }

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Food Processing",
    });
    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

    res.json({ success: true, message: "Paid" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    if (await isAdmin(req.userId)) {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    if (await isAdmin(req.userId)) {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status Updated Successfully" });
    } else {
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
