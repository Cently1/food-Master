<template>
  <el-table :data="cartData" style="width: 1190px">
    <el-table-column label="项目" width="532" prop="name" />
    <el-table-column label="单价" width="182" prop="price" />
    <el-table-column label="数量" width="252">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div class="">{{ scope.row.price * scope.row.count }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    cartData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  }
};
</script>

<style lang="scss"></style>
