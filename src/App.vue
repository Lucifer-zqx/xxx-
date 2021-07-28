<template>
  <div>
    <router-view></router-view>
    <FootGuide v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
import FootGuide from './components/FootGuide/FootGuide.vue'
import {mapActions} from 'vuex'
export default{
 name:"App",
 components:{FootGuide},
 data(){
   return {

   }
 },
 methods:{
   ...mapActions(['getAddress'])
 },
mounted(){
   this.getAddress()
   this.$store.dispatch('getUserInfo')
 }

 
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
