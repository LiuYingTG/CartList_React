import React, {useEffect, useState} from 'react';
import Footer from "../../components/cart/Footer";
import {Table, Button, App} from 'antd';
import CartModuleCss from './cart.module.css'
import axios from 'axios'
import IsLoading from "../../components/common/isLoading";
import NumControl from "../../components/cart/numControl";
import {connect} from "react-redux";
import {
    createUpdateItemNum,
    createInitCartList,
    createUpdateItemChecked,
    createDeleteItems
} from "../../redux/actions/cart";


function Cart(props) {
    const {cartList, deleteItems} = props
    const {message, notification, modal} = App.useApp();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:5000/cartList').then(res => {
            props.initCartList(res.data)
            setIsLoading(false)
        })
    }, [])
    const columns = [
        {
            title: '商品名',
            dataIndex: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: '单价',
            dataIndex: 'price',
            render: (text) => <p>{text}</p>,
        },
        {
            title: '数量',
            dataIndex: 'num',
            render: (_, record) => <NumControl
                num={record.num}
                numChange={(num) => {
                    numChange(record.id, num)
                }}>
            </NumControl>,
        },
        {
            title: '金额',
            dataIndex: 'total',
            render: (_, record) => {
                return <p>{record.price * record.num}</p>
            },
        },
        {
            title: '操作',
            dataIndex: 'total',
            render: (_, record) => <Button danger onClick={() => {
                deleteItem(record.id)
            }}>删除</Button>,
        }
    ];

    const rowSelection = {
        hideSelectAll: false,
        /*可以直接维护selectedRowKeys，更方便操作
        * 改改
        * */
        onChange: (selectedRowKeys, selectedRows) => {
            props.updateItemChecked({
                selectedRowKeys,
            })
        }
    };

    /*购物车商品数量变化*/
    // 缺一个防抖的函数
    const numChange = (id, num) => {
        axios.patch(`http://localhost:5000/cartList/${id}`,{
            num:num
        }).then(res=>{
            if(res.status===200){
                // 发送请求，更新num
                // 请求成功后更新redux
                props.updateItemNum({
                    id, num
                })
            }else{
                throw new Error('出错了')
                message.error('error')
            }
        })

    }
    // 确认模态框

    /*删除商品*/
    const deleteItem = async (id) => {
        const res = await modal.confirm({
            title: '提示',
            content: '确认删除商品吗？',
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                return Promise.resolve()
            }
        });
        // 如果确认删除（res=true），发送请求
        if (!res) {
            return
        }
        // 请求删除，成功后dispatch到delete
        axios.delete(`http://localhost:5000/cartList/${id}`).then(res=>{
            if(res.status===200){
                message.success('删除成功')
                deleteItems([id])
            }else{
                throw new Error('出错了')
                message.error('出错了')
            }
        })

    }
    return (
        <div className={CartModuleCss.cart}>
            {isLoading ? <IsLoading/> :
                <div>
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        rowKey={(record)=>record.id}
                        columns={columns}
                        dataSource={cartList}
                        pagination={{
                            position: [],
                        }}
                    />
                    <Footer></Footer>
                </div>}
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        cartList: state.cartReducer.cartList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateItemNum: (data) => dispatch(createUpdateItemNum(data)),
        initCartList: (val) => dispatch(createInitCartList(val)),
        updateItemChecked: (val) => dispatch(createUpdateItemChecked(val)),
        deleteItems: (val) => dispatch(createDeleteItems(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
