export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCount', oldProduct)
        resolve('添加的商品+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('成功加入购物车')
      }
    })
  },
  gobuy(context,payload) {
    return new Promise((resolve, reject) => {
      // 1.查找数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if (oldProduct) {
        resolve()
      } else {
        resolve('请先将该商品加入购物车')
      }
    })
  }
}