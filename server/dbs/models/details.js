import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Detail = new Schema({
  product: {
    type: Object,
    require: true
  },
  keyword: {
    type: String,
    require: true
  },
  more: {
    type: Array,
    require: true
  },
  login: {
    type: Boolean,
    require: true
  }
});

export default mongoose.model("Detail", Detail);
