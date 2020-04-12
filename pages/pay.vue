<template>
  <div class="page-pay">
    <el-row>
      <el-col :span="24"><list /></el-col>
    </el-row>
  </div>
</template>

<script>
import List from "@/components/pay/list.vue";
export default {
    components:{
        List
    }
};
</script>

<style lang="scss">
@import "@/assets/css/pay/index.scss";
</style>
