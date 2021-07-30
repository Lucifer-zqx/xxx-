//操作状态的mutations
import Vue from 'vue'
import {
    RECIEVE_ADDRESS,
    RECIEVE_Category,
    RECIEVE_SHOP,
    RECIEVE_USERINFO,
    RECIEVE_SHOPGOODS,
    RECIEVE_SHOPRATING,
    RECIEVE_SHOPINFO,
    INCREMENT_FOODCOUNT,
    DECREMENT_FOODCOUNT
} from './mutations_type'
export default{
    //商家地址
    [RECIEVE_ADDRESS](state,value){
        state.address = value
    },
    //头部轮播分类
    [RECIEVE_Category](state,{categorys}){
        state.categorys = categorys
        
    },
    //附近商家信息
    [RECIEVE_SHOP](state,value){
        state.shops = value
    },
    //用户信息
    [RECIEVE_USERINFO](state,value){
        state.userInfo = value
    },
    //点餐信息
    [RECIEVE_SHOPGOODS](state,{shopGoods}){
        state.shopGoods = shopGoods
    },
    //商家评分信息
    [RECIEVE_SHOPRATING](state,{shopRating}){
        state.shopRating = shopRating
    },
    //商家详情
    [RECIEVE_SHOPINFO](state,{shopInfo}){
        state.shopInfo = shopInfo
    },

    //增加商品的数量
    [INCREMENT_FOODCOUNT](state,{food}){
        //第一次添加
        if(!food.count){
            Vue.set(food,'count',1)  //让新增的对象属性也具有数据监视,此food指向shopGoods的里面的food，所以修改后，原来的数据就有了数据绑定
            state.cartFoods.push(food)

        }else{
            food.count++
        }
    },
    [DECREMENT_FOODCOUNT](state, {food}) {
        if(food.count) {// 只有有值才去减
          food.count--
          if(food.count===0) {
            // 将food从cartFoods中移除
            state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
          }
        }
      },
    
    clearCart(state){
        //清空food中的count值
        state.cartFoods.forEach(item =>{
            item.count = 0
        })

        //清空购物车数组
        state.cartFoods = []
        
    }
}