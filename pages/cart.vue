<template>
  <div class="page-cart">
    <el-row class="m-title">
      <el-col :span="24">
        <i class="el-icon-shopping-cart-2"></i
        ><span class="cart">我的购物车</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <list :cart-data="cart" />
        <p>
          应付金额<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">
            提交订单
          </el-button>
        </div>
      </el-col>
      <el-col v-else class="empty" style="height:205px">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from "@/components/cart/list.vue";
export default {
  components: {
    List
  },
  data() {
    return {
      cart: []
    };
  },
  computed: {
    total() {
      let total = 0;
      this.cart.forEach(item => {
        total += item.price * item.count;
      });
      return total;
    }
  },
  methods: {
    //发出请求时，创建订单
    submit: async function() {
      let {
        status,
        data: { code, id }
      } = await this.$axios.post("/order/createOrder", {
        id: this.cartNo,
        name: this.cart[0].name,
        count: this.cart[0].count,
        price: this.cart[0].price
      });
      if (status == 200 && code === 0) {
        this.$alert(`恭喜您，已成功下单，订单号:${id}`, "下单成功", {
          confirmButtonText: "确定",
          callback: action => {
            location.href = "/pay?id=" + id;
          }
        });
      }
    }
  },
  async asyncData(ctx) {
    let {
      status,
      data: {
        code,
        data: { imgs, name, price }
      }
    } = await ctx.$axios.post("/cart/getCart", {
      id: ctx.query.id
    });
    if (status === 200 && code === 0 && name) {
      return {
        cart: [
          {
            imgs,
            name,
            price,
            count: 1
          }
        ],
        cartNo: ctx.query.id
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>
