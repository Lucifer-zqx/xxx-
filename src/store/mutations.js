//操作状态的mutations
import {
    RECIEVE_ADDRESS,
    RECIEVE_Category,
    RECIEVE_SHOP,
    RECIEVE_USERINFO,
    RECIEVE_SHOPGOODS,
    RECIEVE_SHOPRATING,
    RECIEVE_SHOPINFO
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
    }
    
}