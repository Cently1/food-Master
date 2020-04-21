<template>
  <div class="m-user">
    <template v-if="user">
      <span class="username">欢迎您,{{ user }}</span> <nuxt-link to="/exit"
      >&nbsp;&nbsp;&nbsp;[退出]</nuxt-link
      >
      <img src="" alt="">
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
