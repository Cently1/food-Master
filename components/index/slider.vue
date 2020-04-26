<template>
  <div class="swiper-container">
    <div class="swiper-box">
      <no-ssr>
        <swiper :options="swiperOption" class="swiper">
          <swiper-slide v-for="(item, index) in sliderList" :key="index">
            <a><img :src="item.img" alt=""
            /></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
</no-ssr>
    </div>
  </div>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {

  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      sliderList: [
        {
          url: "#sjfkajfja",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/04/13/2020041315867448189338197577.jpg"
        },
        {
          url: "#kjljj",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/04/07/2020040715862270271858197577.jpg"
        },
        {
          url: "#sjfkajfja",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/03/19/2020031915845832443168197577.jpg"
        },
        {
          url: "#kjljj",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/02/27/2020022715827848201138197577.jpg"
        },
        {
          url: "#kjljj",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/03/10/2020031015838279888678197577.jpg"
        },
        {
          url: "#kjljj",
          img:
            "https://i3.meishichina.com/attachment/magic/2020/04/23/2020042315876364213708197577.jpg"
        }
      ]
    };
  },
  
};
</script>

<style lang="scss">
.swiper-container {
  margin-top: 3px;
  width: 1190px;
  height: 466px;
  .swiper-button-prev {
    left: 274px;
  }
  img {
    width: 100%;
    height: 100%;
    // display:none;
  }
  .swiper-pagination {
    bottom: 10px;
    left: 50px;
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      margin: 0px 5px;
    }
  }
}
</style>
