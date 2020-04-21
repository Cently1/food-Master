<template>
  <div class="m-user">
    <template v-if="user">
      <span class="username">欢迎您,{{ user }}</span>
      <nuxt-link to="/exit">&nbsp;&nbsp;&nbsp;[退出]</nuxt-link>
      <div
        ><img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          alt="用户头像"
          class="icon"
      /></div>
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
