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
        ><span class="left" prop="neme">项目:{{}}</span
        ><span class="right">
          应付金额￥<em class="money">22</em>
        </span></el-col
      >
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
              <span class="right"> 支付￥<em class="money">22</em> </span>
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
  data() {
    return {
      pay: [],
      activeName: "first",
      showPay: false,//是否显示支付宝弹框
      showPayModal: false, // 是否显示二次支付确认弹框
      T: '',  // 定时器ID
    };
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
