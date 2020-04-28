import Router from "koa-router";
import axios from "./utils/axios";
import Menu from "../dbs/models/menu";


let router = new Router({
  prefix: "/geo"
});

//城市定位接口
router.get("/getPosition", async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});
//获取切换城市的省份
router.get("/province", async ctx => {
  let province = await Province.find();
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      };
    })
  };
  // let {
  //   status,
  //   data: { province }
  // } = await axios.get(`http://cp-tools.cn/geo/province`);
  // ctx.body = {
  //   province: status === 200 ? province : []
  // };
});

router.get("/province/:id", async ctx => {
  let city = await City.findOne({ id: ctx.params.id });

  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return { province: item.province, id: item.id, name: item.name };
    })
  };
  // let {
  //   status,
  //   data: { city }
  // } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`);
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   };
  // } else {
  //   ctx.body = {
  //     city: []
  //   };
  // }
});
//获取所有的城市列表
router.get("/city", async ctx => {
  let city = [];
  let result = await City.find();
  result.forEach(item => {
    city = city.concat(item.value);
  });
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name:
          item.name === "市辖区" || item.name === "省直辖县级行政区划"
            ? item.province
            : item.name
      };
    })
  };
  // let {
  //   status,
  //   data: { city }
  // } = await axios.get(`http://cp-tools.cn/geo/city`);
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   };
  // } else {
  //   ctx.body = {
  //     city: []
  //   };
  // }
});

//热门城市的推荐
router.get("/hotCity", async ctx => {
  let list = [
    "北京市",
    "上海市",
    "广州市",
    "深圳市",
    "天津市",
    "西安市",
    "杭州市",
    "南京市",
    "武汉市",
    "成都市"
  ];
  let result = await City.find();
  let nList = [];
  result.forEach(item => {
    nList = nList.concat(
      item.value.filter(k => list.includes(k.name) || list.includes(k.province))
    );
  });
  ctx.body = {
    hots: nList
  };
  // let {
  //   status,
  //   data: { hots }
  // } = await axios.get(`http://cp-tools.cn/geo/hotCity`);
  // if (status === 200) {
  //   ctx.body = {
  //     hots
  //   };
  // } else {
  //   ctx.body = {
  //     hots: []
  //   };
  // }
});

//首页左侧的大菜单
router.get("/menu", async ctx => {
  const result = await Menu.findOne();
  ctx.body = {
    menu: result.menu
  };
  // let {
  //   status,
  //   data: { menu }
  // } = await axios.get(`http://cp-tools.cn/geo/menu`);
  // if (status === 200) {
  //   ctx.body = {
  //     menu
  //   };
  // } else {
  //   ctx.body = {
  //     menu: []
  //   };
  // }
});

export default router;
