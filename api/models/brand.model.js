import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  make: { type: String, required: true },
  logo: { type: String, required: true },
  facts: { type: String, required: true },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
