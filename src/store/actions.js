//产生行为的actions
import {reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqShopGoods,
    reqShopInfo,
    reqShopRatings} 
from '../api'
import {RECIEVE_ADDRESS,
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
    async getAddress(context){
        const longitude = context.state.longitude
        const latitude = context.state.latitude
        const geohash = latitude + ','+ longitude
        const result = await reqAddress(geohash)
        if (result.code === 0){
            const address = result.data
            context.commit(RECIEVE_ADDRESS,address)
        }else{
            console.log('出错了')
        }
       
    },
    async getCategorys(context){
        const result = await reqFoodCategorys()
        if (result.code === 0){
            const categorys = result.data
            context.commit(RECIEVE_Category,{categorys})
        }else{
            console.log('出错了')
        }
       
    },
    async getShops(context){
        const longitude = context.state.longitude
        const latitude = context.state.latitude
        const result = await reqShops(longitude,latitude)
        if (result.code === 0){
            const shops = result.data
            context.commit(RECIEVE_SHOP,shops)
        }else{
            console.log('出错了')
        }
       
    },
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(RECIEVE_USERINFO,userInfo)
        }
    },

    /**获取点餐信息 */
    async getOrderMeal({commit},fn){
        const result = await reqShopGoods()
        if(result.code === 0){
            const shopGoods = result.data
            commit(RECIEVE_SHOPGOODS,{shopGoods})
            fn && fn() 
        }
    },

     /**获取评分信息 */
     async getShopRating({commit},cb){
        const result = await reqShopRatings()
        if(result.code === 0){
            const shopRating = result.data
            commit(RECIEVE_SHOPRATING,{shopRating})

            cb && cb()
        }
    },

     /**获取详情信息 */
     async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code === 0){
            const shopInfo = result.data
            commit(RECIEVE_SHOPINFO,{shopInfo})
        }
    },

    /**更新商品的数量 */
    updateFoodCount({commit},{flag,food}){
        if(flag){
            commit(INCREMENT_FOODCOUNT,{food})
        }else{
            commit(DECREMENT_FOODCOUNT,{food})
        }
    },

    
}