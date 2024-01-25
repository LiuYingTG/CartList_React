const initState={
    cartList:[],
    idsChecked:[],
}
export default function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'INIT_CART_LIST': {
            return {
                ...state,
                cartList:action.data
            };
        }
        case 'UPDATE_ITEM_NUM': {
            const {id,num}=action.data
            const {cartList,idsChecked}=state
            let newList=cartList.map(item=>{
                return item.id===id?{
                    ...item,
                    num:num
                }:item
            })
            let index=idsChecked.find((item)=>(item===id))
            let newListChecked=[]
            if(index){
                newListChecked=[...idsChecked]
            }else{
                newListChecked=idsChecked
            }

            return {
                ...state,
                cartList: newList,
                idsChecked:newListChecked
            };
        }
        case 'UPDATE_ITEM_CHECKED': {
            return {
                ...state,
                idsChecked:action.data.selectedRowKeys,
            };
        }
        case 'DELETE_ITEMS': {
            const deleteItems=action.data
            const {cartList,idsChecked}=state
            let newCartList=[]
            let newIdsChecked=[]
            for(let i=0;i<cartList.length;i++){
                if(!deleteItems.includes(cartList[i].id)){
                    newCartList.push(cartList[i])
                }
            }
            for(let i=0;i<idsChecked.length;i++){
                if(!deleteItems.includes(idsChecked[i])){
                    newIdsChecked.push(idsChecked[i])
                }
            }
            return {
                ...state,
                cartList: newCartList,
                idsChecked: newIdsChecked
            };
        }

        default:
            return state;
    }
}
