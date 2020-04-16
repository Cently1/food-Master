<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my" class="my">我的食达人</nuxt-link>
        <dl>
          <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
          <dd><nuxt-link to="/order">收藏夹</nuxt-link></dd>
          <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/app" class="app">手机App</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center" class="center">商家中心</nuxt-link>
        <dl>
          <dd><nuxt-link to="userCenter">商家中心</nuxt-link></dd>
          <dd><nuxt-link to="coop">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="wap">免费手机开店</nuxt-link></dd>
          <dd><nuxt-link to="kaipiao">商家申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/order" class="site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel"> 
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
          <dl class="food">
            <dt>吃美食</dt>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
          </dl>
          <dl class="movie">
            <dt>看电影</dt>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
            <dd>青春偶像剧</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd>
              <a href="#">
                <img
                  src="https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2816676789,1758488950&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=764fc9511b4d7199862fb63d8cb38227"
                  alt="我要点外卖"
                  title="我要点外卖"
                />
              </a>
              <a href="#">
                <img
                  src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
                  alt="我要看电影"
                  title="我要看电影"
                />
              </a>
              <a href="#">
                <img
                  src="https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/b59b79bf3a19a7c520b11a2dc2e6fd34_121_121.jpg"
                  alt="我要旅游"
                  title="我要旅游"
                />
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
