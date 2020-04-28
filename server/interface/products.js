import Router from "koa-router";
import Redis from "koa-redis";
import Product from "../dbs/models/products";

let router = new Router({
  prefix: "/products"
});
//添加线上数据
router.post("/createProduct", async ctx => {
  const { count,pois } = ctx.request.body;
  let create_Product = await Product.create({
    count,
    pois
  });
  if (create_Product) {
    console.log("添加成功");   
    }  
});

//导出路由
export default router;
