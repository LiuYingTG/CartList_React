import React, {useState} from 'react';

const dataList = [
    {
        id: 0,
        name: '商品1',
        price: 132.2,
        descrip:'这是商品1的描述',
        img:'xxx/x//x//x'
    },
    {
        id: 1,
        name: '商品2',
        price: 13.8,
        descrip:'这是商品2的描述',
        img:'xxx/x//x//x'
    },
]

function ShopList(props) {
    const [shopList,setShopList]=useState(dataList)
    return (
        <div>
            <ul>
                {
                    shopList.map(item=>{
                        return  <li>
                            <div className='img'>item.img</div>
                            <div className='title'>{item.name}</div>
                            <div className='descrip'>{item.descrip}</div>
                            <div className='price'>{item.price}</div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default ShopList;
