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
    }
}