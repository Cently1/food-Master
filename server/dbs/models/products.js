import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Product = new Schema({
  count: {
    type: Number,
    require: true
  },
  pois: {
    type: Array,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  keyword: {
    type: String,
    require: true
  }
});
export default mongoose.model("Product", Product);
