<template>
  <div class="slide">
    <el-carousel :interval="5000" arrow="always" height="300px">
      <el-carousel-item v-for="item in list" :key="item.img">
        <img :src="item.img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list: [
        {
          url: "#abc",
          img:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3358993419,2327730080&fm=26&gp=0.jpg"
        },
        {
          url: "#bsbsb",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4062886480,1318620483&fm=26&gp=0.jpg"
        },
        {
          url: "#sjfkajfj",
          img:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3904580852,2785727384&fm=26&gp=0.jpg"
        },
        {
          url: "#sjfkajfja",
          img:
            "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
        },
        {
          url: "#kjljj",
          img:
            "http://p1.meituan.net/codeman/bb0abb3435a60c44d87e90ed4237b61039329.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
