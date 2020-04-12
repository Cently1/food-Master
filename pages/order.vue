<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的食达人</h3>
        <dl>
          <dt>我的订单</dt>
          <dd><i class="el-icon-arrow-right" />全部订单</dd>
          <dd><i class="el-icon-arrow-right" />待付款</dd>
          <dd><i class="el-icon-arrow-right" />待使用</dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd><i class="el-icon-arrow-right" />收藏的商家</dd>
          <dd><i class="el-icon-arrow-right" />收藏的团购</dd>
        </dl>
        <dl>
          <dt>抵用券</dt>
          <dd><i class="el-icon-arrow-right" />可用券</dd>
          <dd><i class="el-icon-arrow-right" />失效券</dd>
        </dl>
        <dl>
          <dt>个人信息</dt>
          <dd><i class="el-icon-arrow-right" />账户设置</dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all"
            ><list :cur="cur" @refresh="refresh"
          /></el-tab-pane>
          <el-tab-pane label="待付款" name="unpay"
            ><list :cur="cur" @refresh="refresh"
          /></el-tab-pane>
          <el-tab-pane label="待使用" name="unuse"
            ><list :cur="cur"
          /></el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay"
            ><list :cur="cur"
          /></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from "@/components/order/list.vue";
export default {
  components: {
    List
  },
  data() {
    return {
      activeName: "all",
      list: [],
      cur: []
    };
  },
  watch: {
    activeName: function(val) {
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0;
        } else if (val === "all") {
          return true;
        } else {
          return false;
        }
      });
    },
    list: function() {
      let val = this.name;
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0;
        } else if (val === "all") {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  methods: {
    handleClick: function(tab) {
      this.activeName = tab.name;
    },
    refresh: function(val) {
      this.getOrders();
      this.name = "all";
    },
    getOrders() {
      let status, code, list;
      this.$axios.post("/order/getOrders").then(res => {
        status = res.status;
        code = res.data.code;
        list = res.data.list;
        if (status === 200 && code === 0 && list.length) {
          this.list = list.map(item => {
            return {
              img: item.imgs.length ? item.imgs[0].url : "/logo.png",
              id: item.id,
              name: item.name,
              count: item.count,
              total: item.total,
              status: item.status,
              statusTxt: item.status === 0 ? "待付款" : "已付款"
            };
          });
        } else {
          this.list = [];
        }
      });
    }
  },
  async asyncData(ctx) {
    let {
      status,
      data: { code, list }
    } = await ctx.$axios.post("/order/getOrders");
    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : "/logo.png",
            id: item.id,
            name: item.name,
            count: item.count,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        }),
        cur: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : "/logo.png",
            id: item.id,
            name: item.name,
            count: item.count,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        })
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/order/index.scss";
</style>
