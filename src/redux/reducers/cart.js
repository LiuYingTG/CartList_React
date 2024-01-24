const initState={
    cartList:[],
    keysChecked:[],
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
            const {key,num}=action.data
            const {cartList,keysChecked}=state
            let newList=cartList.map(item=>{
                return item.key===key?{
                    ...item,
                    num:num
                }:item
            })
            let index=keysChecked.find((item)=>(item===key))
            let newListChecked=[]
            if(index){
                newListChecked=[...keysChecked]
            }else{
                newListChecked=keysChecked
            }

            return {
                ...state,
                cartList: newList,
                keysChecked:newListChecked
            };
        }
        case 'UPDATE_ITEM_CHECKED': {
            return {
                ...state,
                keysChecked:action.data.selectedRowKeys,
            };
        }
        case 'DELETE_ITEMS': {
            const deleteItems=action.data
            const {cartList,keysChecked}=state
            let newCartList=[]
            let newKeysCheckedList=[]
            for(let i=0;i<cartList.length;i++){
                if(!deleteItems.includes(cartList[i].key)){
                    newCartList.push(cartList[i])
                }
            }
            for(let i=0;i<keysChecked.length;i++){
                if(!deleteItems.includes(keysChecked[i])){
                    newKeysCheckedList.push(keysChecked[i])
                }
            }
            return {
                ...state,
                cartList: newCartList,
                keysChecked: newKeysCheckedList
            };
        }

        default:
            return state;
    }
}
