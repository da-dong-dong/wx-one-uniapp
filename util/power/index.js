import store from '../../store'


/*
 * 界面显示置灰
 * param  界面类型
 * return false 显示  true 置灰
 */
export const fnPermissionUi = (type)=>{
    if(!store) return
    if(store.getters['app/get_userInfo'].isAdmin) return false
    let get_funMap = store.getters['shopArr/get_permission_ui']
    let shopId = store.getters['app/shopId']

    if (get_funMap.get(type) !== void 0) {
        return !get_funMap.get(type).includes(shopId)
    } else return true
}

/*
 * 门店判断
 * param  功能类型
 * return false 显示  true 隐藏
 */
export const fnPermissionShopId = (type)=>{
    if(!store) return
    let shopId = store.getters['app/shopId']
    let get_funMap = store.getters['shopArr/get_permission_fn']
    if(store.getters['app/get_userInfo'].isAdmin) return false
    if (get_funMap.get(type) !== void 0) {
        return !get_funMap.get(type).includes(shopId)
    } else return true
}

/*
 * 门店数组
 * param  功能类型
 * return 过滤门店arr
 */
export const fnPermissionShopIdArr = (type)=>{
    if(!store) return
    let shopIdArr = store.getters['shopArr/get_shopAllArr']
    let get_funMap = store.getters['shopArr/get_permission_fn']
    if(store.getters['app/get_userInfo'].isAdmin) return shopIdArr
    if (get_funMap.get(type) !== void 0) {
        let idArr = shopIdArr.filter(item=>{return get_funMap.get(type).includes(item.shopId)})
        return idArr
    } else return []
}
