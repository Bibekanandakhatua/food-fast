import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    categories: { type: [String], required: true, default: [] },
    rating: { type: Number, default: 4.2 },
    eta: { type: String, default: "25-35 min" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const shopModel = mongoose.models.shop || mongoose.model("shop", shopSchema);

export default shopModel;
