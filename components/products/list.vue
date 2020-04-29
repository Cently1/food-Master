<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.active ? 's-nav-active' : '']"
        @click="navSelect(item.name)"
      >
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item v-for="(item, idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from "./product.vue";
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    // console.log(this.list);
    // for (let index in this.list) {
    //   console.log(this.list[index].name);
    //   let keyword = this.list[index].name;
    //   let city = "武汉市";
    //   this.$axios
    //     .get("/search/products", {
    //       params: { keyword, city }
    //     })
    //     .then(res => {
    //       console.log(res);
    //     });
    // }
  },
  data() {
    return {
      nav: [
        {
          name: "s-default",
          txt: "智能排序",
          active: true
        },
        {
          name: "s-price",
          txt: "价格最低",
          active: false
        },
        {
          name: "s-visit",
          txt: "人气最高",
          active: false
        },
        {
          name: "s-comment",
          txt: "评价最高",
          active: false
        }
      ]
    };
  },
  async asyncData({ app }) {
    let { data } = await app.$axios.get("searchList");
    console.log(data);

    return { item: data.list };
  },
  //实现智能排序的功能
  methods: {
    navSelect: function(itemname) {
      if (itemname === "s-default") {
        //默认排序
        this.list = this.list.sort((a, b) => {
          return b.default - a.default;
        });
      }
      if (itemname === "s-visit") {
        //评论
        this.list = this.list.sort((a, b) => {
          return b.comment - a.comment;
        });
      }
      if (itemname === "s-comment") {
        //评分
        this.list = this.list.sort((a, b) => {
          return b.rate - a.rate;
        });
      }
      if (itemname === "s-price") {
        //价格
        this.list = this.list.sort((a, b) => {
          return a.price - b.price;
        });
      }
      console.log("select", itemname);
    }
  }
};
</script>

<style lang="scss"></style>
