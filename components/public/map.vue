<template>
  <div
    :id="id"
    :style="{
      width: width + 'px',
      height: height + 'px',
      margin: '34px 20px auto'
    }"
    class="m-map"
    :class="BarFixed == true ? 'isFixed' : ''"
  ></div>
</template>

<script>
export default {
  props: {
    BarFixed: {
      type: Boolean,
      default() {
        return false;
      }
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [114.3, 30.6]; //默认值是武汉的经纬度
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: "2fd532140e076912504990b4d8b4c82b"
    };
  },
  watch: {
    point: function(val, old) {
      this.map.setCenter(val);
      this.marker.setPosition(val);
      console.log("地址更新了");
      //更新每个点的标记位置
    }
  },
  mounted() {
    let self = this;
    self.id = `map${Math.random()
      .toString()
      .slice(4, 6)}`;
    //异步加载地图
    window.onmapLoaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      });
      self.map = map;
      //滚动条
      window.AMap.plugin("AMap.ToolBar", () => {
        let toolbar = new window.AMap.ToolBar();
        map.addControl(toolbar);
        // map.addControl(new AMap.OverView({ isOpen: true }));
        let marker = new window.AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: self.point
        });
        self.marker = marker;
        marker.setMap(map);
      });
    };
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmapLoaded`;
    let jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="scss">
.isFixed {
  position: fixed !important;
  top: 0;
  margin-top: 0px !important;
  margin-left: 10px !important;
}
</style>
