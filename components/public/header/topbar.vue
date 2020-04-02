<template>
  <!-- gutter表示的是栅格的间隔 -->
  <el-row :gutter="0" class="m-header">
    <el-col :span="5" class="top-bar">
      <geo />
    </el-col>
    <el-col :span="5">
      <user />
    </el-col>
    <el-col :span="14">
      <Nav />
    </el-col>
  </el-row>
</template>

<script>
import Geo from "./geo";
import User from "./user";
import Nav from "./nav";
export default {
  components: {
    Geo,
    User,
    Nav
  }
};
</script>

<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>
