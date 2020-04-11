<template>
  <div class="m-order">
    <ul>
      <li v-if="cur.length">
        <el-row v-for="(item, idx) in cur" :key="idx">
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
  </div>
</template>

<script>
export default {
  props: {
    cur: {
      type: Array,
      default: () => {
        return [];
      }
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
      if (status === 200 && code===0) {
        this.$alert("删除成功", {
          confirmButtonText: "确定"
        });
      }
      //1.父组件绑定一个事件
      //2.子组件使用$emit的方法发送
      //3.父组件的函数里面接收子组件传递的值
       let flag = false;
          this.$emit('refresh',oID);
    }
  }
};
</script>

<style lang="scss"></style>
