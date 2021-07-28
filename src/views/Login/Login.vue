<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <!-- 固定的类名字确定要不要，用对象的表达方法 -->
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=!loginWay">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=!loginWay">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div class="on" v-if="loginWay">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model='phone' />
                <button class="get_verification" :disabled='!isTrue' :class="{changeColor:isTrue}" @click="getCaptcha" >
                  {{timer === 0 ?'获取验证码' : `重新发送(${timer})s`}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model='captcha' />
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div class="on" v-else>
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="手机/邮箱/用户名"
                    v-model="name"
                  />
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd"/>
                  <div class="switch_button " :class="isShowPwd?'on':'off'" @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="{right:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                  <img
                    class="get_verification"
                    :src="'http://localhost:4000/captcha?'+timestamp"
                    alt="captcha"
                    @click="getOnceCaptcha"
                  />
                </section>
              </section>
            </div>
            <button class="login_submit" @click="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a class="go_back" @click="goback">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>

<script>
import {reqCaptcha,reqLoginWithCaptcha,reqLoginWithName} from '../../api'
export default {
  name: "Login",
  data(){
    return{
      loginWay:true,
      phone:'',
      name:'',
      pwd:'',
      captcha:'',
      isTrue:false,
      timer:0,
      timestamp:'',
      isShowPwd:false
    }
  },
  //根据手机号码的正确性，来校验发送验证码按钮是否有效
  watch:{
    phone(value){
      if(/^1[3-9]\d{9}$/.test(value)){
        this.isTrue = true
      }else{
        this.isTrue = false
      }
    },
    name(value){
      if(value === ''){
        console.log('不能为空')
      }else if(value.length < 4){
         console.log('用户名不少于4位')
      }else if(value.length > 15){
         console.log('用户名不大于15位')
      }else{
        console.log('正确')
      }
    },
    //密码校验省略

  },

  methods:{
      // 回退页面
      goback(){
          this.$router.back()
      },
      //验证码or密码登录
      async login(e){
        e.preventDefault()
        let result
        if(this.loginWay){
          result = await reqLoginWithCaptcha(this.phone,this.captcha)
          if(result.code === 0){
            //登录成功
            //vuex存储登录信息
            this.$store.commit('recieve_userinfo',result.data)
            //跳转页面
            this.$router.replace('/profile')
          }else{
            alert(result.msg)
          }
        }else{
           result = await reqLoginWithName({name:this.name,pwd:this.pwd,captcha:this.captcha})
           if(result.code === 0){
             //登录成功
            //vuex存储登录信息
            this.$store.commit('recieve_userinfo',result.data)
            //跳转页面
            this.$router.replace('/profile')
           }else{
              alert(result.msg)
           }
        }
      },
      //获取短信验证码
      async getCaptcha(){
        const result = await reqCaptcha(this.phone)
        if(result.code === 0){
          //开启倒计时
         this.timer = 30
         const timeId = setInterval(()=>{
            this.timer--
            if(this.timer === 0){
              clearInterval(timeId)
            }
          },1000)
        }
      },

      //一次性验证码后缀
      getOnceCaptcha(){
        this.timestamp = new Date().getTime()
      },
  },

  mounted(){
    //初始化调用
  
  }
};
</script>

<style lang="stylus">
    @import "../../common/stylus/mixins.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.changeColor
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>