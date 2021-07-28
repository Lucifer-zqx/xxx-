//操作状态的mutations
import {
    RECIEVE_ADDRESS,
    RECIEVE_Category,
    RECIEVE_SHOP,
    RECIEVE_USERINFO
} from './mutations_type'
export default{
    [RECIEVE_ADDRESS](state,value){
        state.address = value
    },
    [RECIEVE_Category](state,{categorys}){
        state.categorys = categorys
        
    },
    [RECIEVE_SHOP](state,value){
        state.shops = value
    },
    [RECIEVE_USERINFO](state,value){
        state.userInfo = value
    }
    
}