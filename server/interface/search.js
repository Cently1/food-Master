import Router from "koa-router";
import axios from "./utils/axios";
import Poi from "../dbs/models/poi";
import Detail from "../dbs/models/details";
import Product from "../dbs/models/products";

let router = new Router({
  prefix: "/search"
});

//search
router.get("/top", async ctx => {
  try {
    let top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    });
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      }),
      type: top.length ? top[0].type : ""
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    };
  }
  // console.log("woshizuibangde");

  // let {
  //   status,
  //   data: { top }
  // } = await axios.get(`http://cp-tools.cn/search/top`, {
  //   params: {
  //     input: ctx.query.input,
  //     city: ctx.query.city
  //   }
  // });
  // ctx.body = {
  //   top: status === 200 ? top : []
  // };
  // console.log(top);

  // for (let index in top) {
  //   let name = top[index].name;
  //   let type = top[index].type;
  //   let city = "武汉";
  //   let province = "湖北";
  //   let county = "洪山";
  //   let longtide = 114.3;
  //   let latitude = 30.6;
  //   let areaCode = 898;
  //   let create_Product = await Poi.create({
  //     name,
  //     type,
  //     city,
  //     province,
  //     county,
  //     longtide,
  //     latitude,
  //     areaCode
  //   });
  //   console.log(create_Product);
  // }
});

//hotPlace
router.get("/hotPlace", async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || "美食"
    }).limit(10);

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      })
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    };
  }
  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  // let {
  //   status,
  //   data: { result }
  // } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
  //   params: {
  //     city: city
  //   }
  // });
  // ctx.body = {
  //   result: status == 200 ? result : []
  // };
});
//product
router.get("/products", async ctx => {
  let keyword = ctx.query.keyword || "旅游";
  let city = ctx.query.city || "北京";
  // let {
  //   status,
  //   data: { product, more, login }
  // } = await axios.get("http://cp-tools.cn/search/products", {
  //   params: {
  //     keyword,
  //     city
  //   }
  // });
  // login = false;
  // // const { keyword, city } = ctx.request.body;
  // let create_Product = await Detail.create({
  //   keyword,
  //   product,
  //   more,
  //   login
  // });
  // if (create_Product) {
  //   console.log("添加成功");
  // }
  let { product, more } = await Detail.findOne({
    keyword
  });
  let status = 200;
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      //isAuthenticated检测用户登录状态
      login: ctx.isAuthenticated()
    };
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    };
  }
});

//footer上面的关键字的搜索
router.get("/resultsByKeywords", async ctx => {
  const { city, keyword } = ctx.query;
  let { count, pois } = await Product.findOne({
    city,
    keyword
  });
  // let {
  //   status,
  //   data: { count, pois }
  // } = await axios.get("http://cp-tools.cn/search/resultsByKeywords", {
  //   params: {
  //     city,
  //     keyword
  //   }
  // });

  // let create_Product = await Product.create({
  //   count,
  //   pois,
  //   keyword,
  //   city
  // });
  // console.log(create_Product);

  let status = 200;
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : 0
  };
});

export default router;
