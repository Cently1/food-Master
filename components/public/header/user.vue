<template>
  <div class="m-user">
    <template v-if="user">
      <span class="username">欢迎您,{{ user }}</span>
      <nuxt-link to="/exit">&nbsp;&nbsp;&nbsp;[退出]</nuxt-link>
      <div>
        <el-avatar icon="el-icon-user-solid" src='https://halen-blog-1252760404.cos.ap-chengdu.myqcloud.com/img/20200425104256.jpg' class="icon"></el-avatar>
      </div>
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录 </nuxt-link>
      <nuxt-link to="/register" class="register">| 注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  async mounted() {
    const {
      status,
      data: { user }
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.user = user;
    }
  }
};
</script>

<style></style>
