import Router from "koa-router";
import axios from "./utils/axios";
import AlipayFormData from "alipay-sdk/lib/form";

const AlipaySdk = require("alipay-sdk").default;

const alipaySdk = new AlipaySdk({
  appId: "2021001154679132",
  privateKey:
    "MIIEpAIBAAKCAQEA32RgdVjoD9X/ZBg4f6fJOriP0fconnSbrEpuBxU6YBPLXIULItp/i4T4kakQ4MJcl2W2oHbVy79BWheqq4kPd+EbYv0Oi7MGgr5puVblMcCKCRIr6wCJNwAOL3nAQVFtk9lor+g7a8HBlWinL2V9cqBU/Av854mD4+0Qgqj9ZdXpihuTiSDeRhoxj39MWvfrepOTD1YS+2p6NNhbXU1tW49CNFNPcVk4ltHDWHC33swNtUp321vHEtJZvKA0i1uatFCgI7hLj//MV2JBDmDfdsFurfcXfi9lru2I8p0289256W4BrMcqEstXowI4rn1Qc2fomwixsSD2nsG2AiJ8EQIDAQABAoIBAF4Iv73FzfGUkCvPMkEyHLe2JvwoQRXqWfk9X3Fl0yvMSUdJzbU/Kn9NWuDdvPgPeLBWJXkIbNiWSmklGzeXu0YoIMIbabsOgggZJSHaXSIDPVeyKYCDuj7HrDD53B7iqvCYjMO3SwQCDH3bDr0ZyKOur/dlCHFiZn1UNiX6AqiRiEPfuP4CmwlHhoigQFlaGsMPnrshtIfoWvZ+nTsMbTA/D2LxeLqeyMF3HoqbCArusWz6BFBRhL6o+IXfYzBrfxfflQTTAqKMNQuAw2aVYc99veBmGdIzQxXeuDrIN9vpyOl/JY+o/YFYVwNrPsIU+y0eEeNaQhxegSpTTi5wVK0CgYEA/nz7viqjCacQeAqYnmomgBq1slQJaJ5bpXRfBY0KdM9A6y1Fv8jIFjOt8bo9noG+CQd6cZZP2bKdGR2XGNxogs0wvedJZzx7eLvIvy4HNg/Z6TTM9LrLCSjlJBFFFaOikF4PglqNV/ok8fnec5n927DedXx6GK+DfhJg6KK3t/cCgYEA4LgaghYC4ggR8GEoVXPtXBIW9/0sGMShTbbt1eVBa0IE+lBO+h+95XHntsPVOCKrTBItlt9oQC++G7U5aJh6G9WBXksFSMYwIqaPj3ML2PY3KBltAOYR0yeKAM/uazKKDQjSQJBsPGbca57a+lx7sgYXUXU1tkvuSHsdC9PkOjcCgYBeF4nggtUrEXj2WTyafbbkcHuzhnzAEKTj5MXpQH+YNrTS/zcltK+9/beXg3ua6m9/2SL9ckztuat6CMW/7GY7zm/yFty97c/dENklTnheFbhFED+jUJkXNuaZ0kTPvmOxqwVi9eYCnDsiuHb2GP6SRq/Jko92Jxaf+12XRepVewKBgQCx+78rF0nzQpcKv7kVbXsq+Dzu77u0ZlCn3+IiDrEwxZpxs5fJ7cgW6Y+wJw1Cp9rqpl8rZwkIBYhaI8Azgsj8MK+FQoAN8sL/PtLnuCRDFEf9X54BHzgw+NkJ6aaZiu7iggEdGAZSFNox9yDTONrT1pUzdFU1bJBvIeuQiaPzIwKBgQDuDTqkfPtleZW0qns/ojXgKVvr+oNa6MywX1ctCPpobd66NWmzOMPLRftHvii/dAtOB8amNYGiCyaKk3ATXTjj1naEdgN4En50MoUSFKhxLbwrSPq+Gh5qeL2U1hftglSMRGDCnZz8WzVKiMbE9gX9+LTtuTMklXKABuf3T+JxZQ==",
  charset: "utf-8"
});

let router = new Router({ prefix: "/alipay" });
//返回支付链接
router.get("/pay", async ctx => {
  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("notifyUrl", "http://www.123.com/notify");
  formData.addField("bizContent", {
    outTradeNo: "0125465145263",
    productCode: "FACE_TO_FACE_PAYMENT",
    totalAmount: "0.01",
    subject: "商品1",
    body: "商品详情1"
  });
  const result = await alipaySdk.exec(
    "alipay.trade.precreate",
    {},
    { formData: formData }
  );
  //
  let res1;
  await axios.get(result).then(res => {
    res1=res.data;
  });
  console.log(res1);
  ctx.body = {
    code: 0,
    data:res1
  };
});

export default router;
