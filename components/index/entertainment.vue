<template>
  <section class="m-istyle">
    <dl style="background-color: rgb(255, 209, 72);background-image: linear-gradient(to right, rgb(85, 19, 255) 3%, rgb(255, 209, 72) 100%);">
      <dt>达人电影</dt>
      <dd :class="{ active: kind == 'all' }" kind="all" keyword="即将上演">
        即将上演
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title" style="width:214px;height:297px;margin: 0px 9px;">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" style="width:214px;height:297px;"/>
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥<em>{{ item.price }}</em
              ><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: "all",
      list: {
        all: [
          {
            url: "#",
            img:
              "//p0.meituan.net/movie/79182a20224ebe1751b2d8980420cf21149653.jpg@214w_297h_1e_1c"
          },
          {
            url: "#",
            img:
              "//p1.meituan.net/movie/14f9018b371d94dd812772704613babd475457.jpg@214w_297h_1e_1c"
          },
          {
            url: "#",
            img:
              "//p0.meituan.net/moviemachine/5abd9fa1ab51da3ff81f52c97e6f9f7076364.jpg@214w_297h_1e_1c"
          },
          {
            url: "#",
            img:
              "//p0.meituan.net/movie/0e52ee48afc13d5e7282432d6c77116e316852.jpg@214w_297h_1e_1c"
          },
          {
            url: "#",
            img:
              "//p1.meituan.net/moviemachine/1d2b4985d0187b437d41a73994ba2e191607376.jpg@214w_297h_1e_1c"
          }
        ]
      }
    };
  },
  computed: {
    cur: function() {
      return this.list[this.kind];
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
