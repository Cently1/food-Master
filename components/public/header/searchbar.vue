<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left" style="padding-top:0px;">
        <img
          src="https://halen-blog-1252760404.cos.ap-chengdu.myqcloud.com/img/20200416111807.png"
          alt="食达人" style="width:250px;height:105px;"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索附近美食或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
              :key="idx"
            >
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{
                item.name
              }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{
                item.name
              }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
            :key="idx"
            :href="'/products?keyword=' + encodeURIComponent(item.name)"
            >{{ item.name }}</a
          >
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">达人外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">达人电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">达人酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">达人公寓/名宿</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">加入达人</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"><p class="txt">随时退</p></i>
          </li>
          <li>
            <i class="single"><p class="txt">不满意免单</p></i>
          </li>
          <li>
            <i class="overdue"><p class="txt">过期退</p></i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      isFocus: false,
      hotPlace: [],
      searchList: []
    };
  },
  computed: {
    isHotPlace: function() {
      return this.isFocus && !this.search;
    },
    isSearchList: function() {
      return this.isFocus && this.search;
    }
  },
  methods: {
    focus: function() {
      this.isFocus = true;
    },
    blur: function() {
      let self = this;
      setTimeout(() => {
        self.isFocus = false;
      }, 300);
    },
    //这里做延时，避免输入一个字母发送一次请求，安装lodash库
    input: _.debounce(async function() {
      let self = this;
      let city = self.$store.state.geo.position.city.replace("市", "");
      self.searchList = [];
      let {
        status,
        data: { top }
      } = await self.$axios.get("/search/top", {
        params: {
          input: self.search,
          city
        }
      });
      self.searchList = top.slice(0, 10);
    }, 300)
  }
};
</script>

<style lang="sass"></style>
