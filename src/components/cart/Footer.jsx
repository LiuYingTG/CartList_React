import React, {useMemo} from 'react';
import FooterModuleCss from './Footer.module.css'
import {Button} from "antd";
import {createDeleteItem, createDeleteItems, createInitCartList, createUpdateItemNum} from "../../redux/actions/cart";
import {connect} from "react-redux";
import {App} from "_antd@5.12.8@antd";

function Footer(props) {
    const {cartList,deleteItems,keysChecked}=props
    const { message, modal } = App.useApp();

    const total=useMemo(()=>{
        return cartList.reduce((pre,current)=>{
            if(keysChecked.includes(current.key)){
                pre+=current.num*current.price
            }
            return pre
        },0)
    },[keysChecked])
    /*删除多个购物车数据*/
    const deleteCartItems=async ()=>{
        /*发送请求列表，传递参数为需要删除的id数组
        * 请求成功后调整redux
        * */
        if(!keysChecked.length){
            message.destroy()
            message.error('请选择至少一个商品!')
            return
        }
        let res=await modal.confirm({
            title: '提示',
            content: '确认删除商品吗？',
            cancelText:'取消',
            okText:'确认',
            onOk:()=>{
                return Promise.resolve()
            }
        });
        // 如果确认删除（res=true），发送请求
        if(!res){
            return
        }
        // 请求删除，成功后dispatch到delete
        deleteItems(keysChecked)
    }
    return (
        <div className={FooterModuleCss.footer}>
            <div><Button danger onClick={()=>{
                deleteCartItems()
            }}>删除</Button></div>
            <div>总计：{keysChecked.length}件商品</div>
            {/*价格格式化没做*/}
            <div>总价格：{total}元</div>
            <div><Button type='primary'>去结算</Button></div>
        </div>
    );
}

const mapStateToProps=(state)=>{
    return {
        cartList:state.cartReducer.cartList,
        keysChecked:state.cartReducer.keysChecked,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        // updateItemNum:(val)=>dispatch(createUpdateItemNum(val)),
        // initCartList:(val)=>dispatch(createInitCartList(val))
        deleteItems:(val)=>dispatch(createDeleteItems(val))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Footer);
