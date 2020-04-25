<template>
  <div class="page-index">
    <el-row>
      <el-col :span="24">
        <slider />
        <emenu />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <entertainment />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from "@/components/index/menu.vue";
import Slider from "@/components/index/slider.vue";
import Artistic from "@/components/index/artistic.vue";
import Entertainment from "@/components/index/entertainment.vue";

export default {
  components: {
    Emenu,
    Slider,
    Artistic,
    Entertainment
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
