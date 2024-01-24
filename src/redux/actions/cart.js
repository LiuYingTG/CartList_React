/*新增商品*/
/*商品数量发生变化*/
export const createUpdateItemNum = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ITEM_NUM',
            data: data
        })
    }
}
/*初始化购物车数据*/
export const createInitCartList = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'INIT_CART_LIST',
            data
        })
    }
}
/*选择或者取消选择购物车列*/
export const createUpdateItemChecked = (data) => {

    return (dispatch) => {
        dispatch({
            type: 'UPDATE_ITEM_CHECKED',
            data
        })
    }
}

/*删除购物车数据
* data:删除的id数组*/
export const createDeleteItems = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'DELETE_ITEMS',
            data
        })
    }
}

