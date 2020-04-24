<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      @change="handleCitys"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      />
    </el-select>
    <span class="find">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      province: [],
      pvalue: "",
      city: [],
      cvalue: "",
      input: "",
      cities: []
    };
  },
  watch: {
    pvalue: async function(newPvalue) {
      let self = this;
      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        self.cvalue = "";
      }
    }
  },
  mounted: async function() {
    let self = this;
    let {
      status,
      data: { province }
    } = await self.$axios.get("/geo/province");
    if (status === 200) {
      self.province = province;
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      let self = this;
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1));
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get("/geo/city");
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            };
          });
          cb(self.cities.filter(item => item.value.indexOf(query) > -1));
        } else {
          ca([]);
        }
      }
    }, 200),
    //切换城市并且跳转到首页(远程搜索)
    handleSelect: function(item) {
      this.$store.commit("geo/setPosition", { city: item.value });
      location.href = "/";
    },
    //切换城市并且跳转到首页(省市搜索)
    handleCitys: function(name) {
      this.$store.commit("geo/setPosition", { city: name.value });
      location.href = "/";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
