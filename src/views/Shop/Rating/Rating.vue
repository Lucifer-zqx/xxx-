<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
        <!-- 整体评价 -->
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shopInfo.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{shopInfo.sellCount}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :rating="shopInfo.serviceScore" starSize="star-36" />
            <span class="score">{{shopInfo.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :rating="shopInfo.foodScore" starSize="star-36" />
            <span class="score">{{shopInfo.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{shopInfo.deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="split"></div>

      <!-- 评论区 -->
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active:selectType===0}" @click="operateSelectType(0)">
            全部<span class="count">{{shopRating.length}}</span>
          </span>
          <span class="block positive" :class="{active:selectType===1}" @click="operateSelectType(1)">
            满意<span class="count">{{positive}}</span>
          </span>
          <span class="block negative" :class="{active:selectType===2}" @click="operateSelectType(2)">
            不满意<span class="count">{{negative}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:isCheck}">
          <span class="iconfont icon-check_circle" @click="isCheck =!isCheck"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rate,index in filterArr" :key="index">
            <div class="avatar">
              <img
                width="28"
                height="28"
                :src="rate.avatar"
              />
            </div>
            <div class="content">
              <h1 class="name">{{rate.username}}</h1>
              <div class="star-wrapper">
                <Star :rating="rate.score" starSize="star-24" />
                <span class="delivery">{{rate.deliveryTime}}</span>
              </div>
              <p class="text">{{rate.text}}</p>
              <div class="recommend">
                <span class="iconfont " 
                :class="rate.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down'"
                ></span>
                <span class="item" 
                v-for='item,index in rate.recommend'
                :key="index">{{item}}</span>
              </div>
              <div class="time">{{formatedTime(rate.rateTime)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import dayjs from 'dayjs';
import BScroll from 'better-scroll'
import Star from "../../../components/Star/Star.vue";
export default {
  name: "Rating",
  components: { Star },
  data(){
      return{
          isCheck :false,
          selectType:0
      }
  },
  computed: {
    ...mapState(["shopInfo",'shopRating']),
    ...mapGetters(['positive','negative']),
    filterArr(){
      /**获取到当前ischeck和selectType
       * 以决定过滤数组的条件
       * 一共是6中组合
       */
      //this.isCheck //true or false
      //this.selectType //选择的条件
      if(this.isCheck){
        const tempArr = this.shopRating.filter(item => item.text !== '')
        return this.filterBySelectType(tempArr)
      }else{
        return this.filterBySelectType(this.shopRating)
      }
    }
  },
  methods:{
    formatedTime(timestamp){
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    operateSelectType(type){
      this.selectType = type
    },
    filterBySelectType(arr){
        switch (this.selectType){
          case 0:
            return arr
          case 1:
            return arr.filter(item => item.rateType === 0)
          case 2:
            return arr.filter(item => item.rateType === 1)
          default:
            return
        }
    }
  },
  watch:{
    filterArr(){
      //解决初始化后的滚动已经确定，当滚动区域内容变小时，刷新不及时，导致出现空白区的问题。
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    }
  },
  mounted(){
      this.$store.dispatch('getShopRating',()=>{
          this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.ratings,{
                    click:true
                })
          })
            
      })
      
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        border-1px (rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-check_circle
            color: green
        .icon-check_circle
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: orange
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
