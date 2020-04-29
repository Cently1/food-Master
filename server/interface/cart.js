import Router from "koa-router";
import axios from "./utils/axios";
import Cart from "../dbs/models/cart";
import md5 from "crypto-js/md5";

let router = new Router({ prefix: "/cart" });
//创建购物车
router.post("/create", async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: "please login"
    };
  } else {
    let time = Date();
    let cartNo = md5(Math.random() * 1000 + time).toString();
    let {
      params: { id, detail }
    } = ctx.request.body;
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    });
    //保存到数据库
    let result = await cart.save();
    console.log(result);
    
    if (result) {
      ctx.body = {
        code: 0,
        msg: "",
        //返回购物车的id
        id: cartNo
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "create fail"
      };
    }
  }
});
//获取购物车信息
router.post("/getCart", async ctx => {
  let { id } = ctx.request.body;
  try {
    let result = await Cart.findOne({ cartNo: id });
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    };
  }
});

export default router;
