//状态的计算属性的getters
export default {
    totalCount({ cartFoods }) {
        return cartFoods.reduce((pre, item) => {
            pre += item.count
            return pre
        }, 0)
    },
    totalPrice({ cartFoods }) {
        return cartFoods.reduce((pre, item) => {
            pre += item.count * item.price
            return pre
        }, 0)
    },
    positive({shopRating}){
        
        return shopRating.reduce((pre,item)=>{
            if(item.rateType === 0){
                return ++pre
            }else{
                return pre
            }
        },0)
    },
    negative({shopRating}){
        return shopRating.reduce((pre,item)=>{
            if(item.rateType === 1){
                return ++pre
            }else{
                return pre
            }
        },0)
    },
    filtedRates({shopRating,filterCondition}){
        if(filterCondition === 0){
            //全部展示
            return shopRating
        }else if(filterCondition === 1){
            //只看有内容的评价
            return shopRating.filter(item => item.text !== '')
        }else if(filterCondition === 2){
            //只看满意的评价

        }
    }
}