import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Poi = new Schema({
  name: {
    type: String //景点名
  },
  province: {
    type: String //省份名
  },
  city: {
    type: String //城市
  },
  county: {
    type: String //区县
  },
  areaCode: {
    type: String //区号
  },
  tel: {
    type: String //电话
  },
  area: {
    type: String //商圈
  },
  addr: {
    type: String //地址
  },
  type: {
    type: String //类型(丽人，景点)
  },
  module: {
    //子分类
    type: String
  },
  longitude: {
    //精度
    type: Number
  },
  latitude: {
    //纬度
    type: Number
  }
});

export default mongoose.model("Poi", Poi);
