<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.replace('市','')}}食达人</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{$store.state.geo.postion.city.replace('市','')}}{{decodeURIComponent(keyword)}}</a></el-breadcrumb-item>
  </div>
</template>

<script>
export default {
    props:{
        keyword:{
            type:String,
            default:''
        }
    }
};
</script>

<style lang="scss"></style>
