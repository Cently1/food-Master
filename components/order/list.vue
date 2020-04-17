<template>
  <div class="m-order">
    <ul>
      <li v-if="cur.length">
        <el-row v-for="(item, idx) in frontEndPageChange" :key="idx">
          <el-col :span="4">
            <img :src="item.img" alt="" />
          </el-col>
          <el-col :span="7">
            <h4>{{ item.name }}</h4>
            <p>数量:{{ item.count }}</p>
          </el-col>
          <el-col :span="4">总价:￥{{ item.total }}</el-col>
          <el-col :span="6">{{ item.statusTxt }}</el-col>
          <el-col :span="3">
            <el-button type="danger" plain @click="deleteClick(item.id)"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </li>
      <li v-else class="empty">没有订单</li>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="paginationOptions.currentPage"
      :page-size="paginationOptions.pageSize"
      :page-sizes="paginationOptions.pageSizes"
      background
      layout="prev, pager, next"
      :total="this.cur.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { Message, Pagination } from "element-ui";
export default {
  data() {
    return {
      paginationOptions: {
        currentPage: 1, //当前页
        pageSize: 4, //展示页数
        pageSizes: [4, 8, 12,16], //可选择展示页数 数组
        count: this.cur.length
      }
    };
  },
  props: {
    cur: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  //计算属性对数据进行处理
  computed: {
    frontEndPageChange() {
      let start =
        (this.paginationOptions.currentPage - 1) *
        this.paginationOptions.pageSize;
      if (start >= this.count) {
        start = 0;
      }
      let end =
        this.paginationOptions.currentPage * this.paginationOptions.pageSize;
      if (end >= this.count) {
        end = this.count;
      }
      return this.cur.slice(start, end);
    }
  },
  methods: {
    deleteClick: async function(oID) {
      let {
        status,
        data: { code, id }
      } = await this.$axios.post("/order/deleteOrder", {
        id: oID
      });
      if (status === 200 && code === 0) {
        Message.success("删除成功", { customClass: "message-logout" });
      }
      //1.父组件绑定一个事件
      //2.子组件使用$emit的方法发送
      //3.父组件的函数里面接收子组件传递的值
      let flag = false;
      this.$emit("refresh", oID);
    },
    //改变分页数量
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
    },
    //改变当前分页
    handlePageChange(val) {
      this.paginationOptions.currentPage = val;
    }
  }
};
</script>

<style lang="scss"></style>
