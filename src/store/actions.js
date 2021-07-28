//产生行为的actions
import {reqAddress,reqFoodCategorys,reqShops,reqUserInfo} from '../api'
import {RECIEVE_ADDRESS,RECIEVE_Category,RECIEVE_SHOP, RECIEVE_USERINFO} from './mutations_type'
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
    }
}