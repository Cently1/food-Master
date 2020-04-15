<template>
  <div class="m-pay">
    <el-row class="row row1">
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <i class="el-icon-time"></i
          ><span
            >请在 <strong>30分钟</strong> 内完成支付, 超时订单会自动取消</span
          >
        </div></el-col
      >
    </el-row>
    <el-row class="row row2">
      <el-col :span="24"
        ><span class="left"
          ><i class="el-icon-check"></i>商品名称:<b>&nbsp;{{ name }}</b></span
        ><span class="right">
          应付金额￥<em class="money" prop="total">{{ total }}</em>
        </span>
        <span class="left"
          ><i class="el-icon-check"></i>商品单价:<b
            >&nbsp;{{ price }}元</b
          ></span
        >
        <span class="left"
          ><i class="el-icon-check"></i>商品数量:<b
            >&nbsp;{{ count }}件</b
          ></span
        >
        <div class="left">
          <i class="el-icon-check"></i>商品图片:<span class="left1"
            ><img class="left" :src="imgs" style="width:100px;height:100px;"
          /></span>
        </div>
      </el-col>
    </el-row>
    <el-row class="row row3">
      <el-col>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="支付宝/微信" name="first">
            <ul>
              <li>
                <input
                  type="radio"
                  name="thirdpart_pay"
                  id="thirdpart_pay_alipay"
                  data-type="alipay"
                  data-banktypeid=""
                  data-bankcode=""
                  checked=""
                /><label class="payment-icon" for="thirdpart_pay_alipay"
                  ><img
                    src="https://p0.meituan.net/pay/alipaypcnew.png"
                    disabled=""
                    alt="支付宝"/></label
                ><span
                  class="payment-weak-tip"
                  style="visibility: visible;"
                ></span>
              </li>
              <li>
                <input
                  type="radio"
                  name="thirdpart_pay"
                  id="thirdpart_pay_wxqrpay"
                  data-type="wxqrpay"
                  data-banktypeid=""
                  data-bankcode=""
                /><label class="payment-icon" for="thirdpart_pay_wxqrpay"
                  ><img
                    src="https://p1.meituan.net/pay/pc_wxqrpay.png"
                    disabled=""
                    alt="微信"/></label
                ><span
                  class="payment-weak-tip"
                  style="visibility: hidden;"
                ></span>
              </li>
            </ul>
            <div class="pay">
              <span class="right">
                支付￥<em class="money" prop="total">{{ total }}</em>
              </span>
              <div>
                <a href="/detail" class="cart">返回修改订单</a>
                <el-button type="warning" round class="goPay" @click="alipay"
                  >去付款</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人网银支付" name="second"
            >个人网银支付</el-tab-pane
          >
        </el-tabs>
      </el-col>
    </el-row>
    <scan-pay-code
      v-if="showPay"
      @close="closePayModal"
      :img="payImg"
    ></scan-pay-code>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ScanPayCode from "@/components/pay/ScanPayCode.vue";
export default {
  components: {
    ScanPayCode
  },
  props: {
    pay: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      cartNo: "", //商品id
      name: "", //商品名称
      price: "", //商品单价
      count: "", //商品数量
      total: "", //商品总价
      imgs: "",
      activeName: "first",
      showPay: false, //是否显示支付宝弹框
      showPayModal: false, // 是否显示二次支付确认弹框
      T: "" // 定时器ID
    };
  },
  mounted() {
    this.cartNo = location.search.substring(4);
    this.getCartDetail();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    alipay() {
      this.$axios.get("/alipay/pay").then(res => {
        let url = res.data.data.alipay_trade_precreate_response.qr_code;

        QRCode.toDataURL(url).then(url => {
          this.showPay = true;
          this.payImg = url;
          // this.loopOrderState();
        });
      });
    },
    getCartDetail: async function() {
      let {
        status,
        data: {
          code,
          data: { name, total, price, count, imgs }
        }
      } = await this.$axios.post("/alipay/getPay", {
        id: this.cartNo
      });
      if (status == 200 && code === 0) {
        this.name = name;
        this.total = total;
        this.price = price;
        this.count = count;
        this.imgs = imgs[0].url;
      }
    },
    //关闭支付宝弹窗
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    }
  }
};
</script>

<style lang="scss"></style>
