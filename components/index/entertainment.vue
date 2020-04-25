<template>
  <section class="m-istyle">
    <h3>五月，精选好食材，不负好春光</h3>
    <dl
      style="background-color: rgb(255, 209, 72);background-image: linear-gradient(to right, rgb(85, 19, 255) 3%, rgb(255, 209, 72) 100%);"
      @mouseover="over"
    >
      <dt>有格调</dt>
      <dd :class="{ active: kind == 'sg' }" kind="sg" keyword="水果">
        水果
      </dd>
      <dd :class="{ active: kind == 'sc' }" kind="sc" keyword="蔬菜">
        蔬菜
      </dd>
      <dd :class="{ active: kind == 'wg' }" kind="wg" keyword="五谷">
        五谷
      </dd>
      <dd :class="{ active: kind == 'sx' }" kind="sx" keyword="生鲜">
        生鲜
      </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
        style="width:240px;height:300px;margin: 0px 26px;"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img
            :src="item.img"
            class="image"
            style="width:240px;height:240px;"
          />
          <div class="mask"><i class="el-icon-shopping-cart-full"></i>{{ item.title }}</div>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: "sg",
      list: {
        sg: [
          {
            url: "#",
            img:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837324011,2585401963&fm=11&gp=0.jpg",
            title: "哈密瓜"
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20150228/6084dad456eff7e4de9645b0c0918462_150x150.jpg",
            title: "黄桃"
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20111215/58b6d849a47721a891d4a3a334a91191_150x150.jpg",
            title: "草莓"
          },
          {
            url: "#",
            img:
              "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2783248912,3839264676&fm=26&gp=0.jpg",
            title: "青苹果"
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/cbe31e4ef6176df562054b6b5297ca50_150x150.jpg",
            title: "香蕉"
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/35af0f27e89091fb1126f81cdb6ad5c4_150x150.jpg",
            title: "雪梨"
          },
          {
            url: "#",
            img:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2509226911,1706039675&fm=26&gp=0.jpg",
            title: "菠萝"
          },
          {
            url: "#",
            img:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1969199659,4027177956&fm=26&gp=0.jpg",
            title: "西瓜"
          }
        ],
        sc: [
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/501afc50b8b0d4f5508be8f96c01896c_150x150.jpg",
              title:'上海青'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110706/46ff26140cddcba66a59ef101bb7a4a0_150x150.jpg",
              title:'茄子'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/39d74e9bfde79ebc96541ab744865293_150x150.jpg",
              title:'菠菜'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110822/dc52671b142bcfe1b99756c29f5e210d_150x150.jpg",
              title:'黄瓜'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110830/7ca005000cad4f23ec2d8f9151cd6062_150x150.jpg",
              title:'油麦菜'
          },{
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20111214/a82d115d88dd46598f4333777582469c_150x150.jpg",
              title:'西红柿'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20150331/e42c1901635df0e2483221ce2a644ad9_150x150.jpg",
              title:'苦瓜'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/31900af8bf909e61f5982c91313ef665_150x150.jpg",
              title:''
          }
        ],
        wg: [
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20111125/3eb346efc8d0a9fca2d26ae0a6715d8d_150x150.jpg",
              title:'玉米'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20150228/5bb1dda5bfa20c2772d81781c4a23f31_150x150.jpg",
              title:'燕麦'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110715/86e24b31d7cb6a58cba8f148e9623d0a_150x150.jpg",
              title:'黄豆'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110715/6e5402c9f8c0b48e35ae1257d7e03683_150x150.jpg",
              title:'黄米'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110715/8f690769e15fd26ad5184dbfd0140052_150x150.jpg",
              title:'红豆'
          },{
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110718/989b823c7089812d3d6e468bfc8d8cc3_150x150.jpg",
              title:'大米'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110715/58b3095b7efe444f302b8d0a5adc870d_150x150.jpg",
              title:'绿豆'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20170330/de64190a5636f1f8d8071f84b3dfc44b_150x150.jpg",
              title:'核桃'
          }
        ],
        sx: [
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110914/f8e9734997cee28795a756df6fc8e526_150x150.jpg",
              title:'鸡腿'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20140331/4da435c5b7b482e337a31ee75de02060_150x150.jpg",
              title:'鲫鱼'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20111208/a33af27d0cb180dfb0762fc1f5386819_150x150.jpg",
              title:'皮皮虾'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20150331/8477415ec7a644d493ddaa9ac6f86539_150x150.jpg",
              title:'牡蛎'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110822/e58343174e46f40834c1db19aa823be1_150x150.jpg",
              title:'黄鱼'
          },{
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20140721/8e9bbb4faab6c487d420a21330b2b907_150x150.jpg",
              title:'螺丝'
          },
          {
            url: "#",
            img:
              "https://s1.ig.meishij.net/p/20110802/fe3a3f9a0e5b0830875fa33d45897834_150x150.jpg",
              title:'带鱼'
          },
          {
            url: "#",
            img:
              "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3542479807,2484944845&fm=26&gp=0.jpg",
              title:'牛肉'
          }
        ],
      }
    };
  },
  computed: {
    cur: function() {
      return this.list[this.kind];
    }
  },
  methods:{
    over: function(e) {
      let dom = e.target;
      let tag = dom.tagName.toLowerCase();
      let self = this;
      if (tag === "dd") {
        this.kind = dom.getAttribute("kind");
        let keyword = dom.getAttribute("keyword");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
.el-card {
  position: relative;
}
.mask {
  position: absolute;
  bottom: 1px;
  width: 220px;
  height: 40px;
  line-height: 45px;
  text-align: center;
  background: rgba(#ecf0f1, 0.7);
  &:hover{
    background: #ff3232;
    color:white;
    .el-icon-shopping-cart-full{
      color:white;
    }
  }
  .el-icon-shopping-cart-full{
    font-size:20px;
    margin-right: 10px;
    color:orangered;
  }
}
</style>
