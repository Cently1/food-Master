<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>所有分类</dt>
      <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseenter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleaver="sout">
      <template v-for="(item, idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      menu: [
        {
          type: "food",
          name: "美食",
          child: [
            {
              title: "美食",
              child: ["代金券", "甜点饮品", "火锅", "自助餐", "小吃快餐"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          child: [
            {
              title: "外卖",
              child: ["食达人外卖", "饿了么", "美团", "膳食网"]
            }
          ]
        },
        {
          type: "movie",
          name: "电影",
          child: [
            {
              title: "美食",
              child: ["青春偶像剧", "美国科幻片", "财经报道", "校园励志剧"]
            }
          ]
        },
        {
          type: "hotel",
          name: "酒店",
          child: [
            {
              title: "酒店",
              child: ["高档房", "普通房", "舒适房"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    curdetail: function() {
      return this.$store.state.home.menu.filter((item)=>item.type===this.kind)[0]
    }
  },methods:{
    mouseleave:function(){
      let self=this;
      self._timer=setTimeout(() => {
        self.kind=''
      }, 150);
    },
    mouseenter:function(e){
      this.kind=e.target.querySelector('i').className
    },
    sover:function(){
      clearTimeout(this._timer) 
    },
    sout:function(){
      this.kind=''
    }
  }
};
</script>

<style lang="sass"></style>
