<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link slot='search' class="header_search" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="login" class="header_login" :to="userInfo._id ? '/userInfo' : '/login'">
        <span class="header_login_text" v-if='!userInfo._id'>登录|注册</span>
        <i class="iconfont icon-person" v-else></i>
      </router-link>
    </HeaderTop>
    
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for='category,index in outerArr' :key="index">
            <a href="javascript:" class="link_to_food" v-for="c,index in category" :key="index">
              <div class="food_container">
                <img :src="BASE_IMAGEURL+c.image_url" />
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="xxx" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
export default {
  name: "Msite",
  components:{HeaderTop,ShopList},
  data(){
    return{
      BASE_IMAGEURL:'https://fuss10.elemecdn.com',
    }
  },
  computed:{
    ...mapState(['address','categorys','shops','userInfo']),
    //头部轮播数组
    outerArr(){
      //*********************************************************************
      //解构赋值是浅拷贝,splice(startIndex,length,[optionElement])会改变原数组**
      //slice(startIndex,endIndex)不会改变原数组                             **
      //**********************************************************************
      const originArr = [...this.categorys]
      const outerArr = []
      for(let i = 0 ;i<(originArr.length / 8 + 1);i++){
        const innerArr = originArr.splice(0,8)
        outerArr.push(innerArr)
      }
      return outerArr
    }
  },
  watch:{
    categorys(val,oldVal){
      this.$nextTick(()=>{
        new Swiper('.swiper-container',{
          loop:true,
          pagination:{
            el:'.swiper-pagination'
          }
        })
      })
    }
  },
  mounted(){
    //TODO
    this.$store.dispatch('getShops')
    this.$store.dispatch("getCategorys") 
    //等数据渲染完毕，执行 
    // console.log(this)
  }
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>