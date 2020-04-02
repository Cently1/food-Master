import Router from "koa-router";
import axios from "./utils/axios";
import Poi from "../dbs/models/poi";

let router = new Router({
  prefix: "/search"
});

//search
router.get("/top", async ctx => {
  let {
    status,
    data: { top }
  } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  });
  ctx.body = {
    top: status == 200 ? top : []
  };
});
//hotPlace
router.get("/hotPlace", async ctx => {
  let city = ctx.store ? ctx.store.geo.positon.city : ctx.query.city;
  let {
    status,
    data: { result }
  } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      city
    }
  });
  ctx.body = {
    result: status == 200 ? result : []
  };
});
//footer上面的关键字的搜索
router.get("/resultsByKeywords", async ctx => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: { count, pois }
  } = await axios.get(`http://cp-tools.cn/search/results`, {
    params: {
      city,
      keyword
    }
  });
  ctx.body = {
      count:status===200?count:0,
      pois:status===200?pois:0
  };
});

export default router;
