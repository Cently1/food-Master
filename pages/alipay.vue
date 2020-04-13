<template>
  <div class="ali-pay">
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "alipay",
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "",
    };
  },
  mounted() {
    this.alipay();
  },
  methods: {
    alipay() {
      this.axios
        .post("/pay", {
          orderId: this.orderId,
          orderName: "Vue项目",
          amount: 0.01,
          payType: 1 // 1支付宝，2微信
        })
        .then(res => {
          this.content = res.content;
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        });
    }
  }
};
</script>
