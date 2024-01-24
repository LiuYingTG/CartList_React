import Cart from "./views/Cart";
import ShopList from "./views/ShopList";
import {Navigate} from "react-router-dom";
export const routes= [
    {
        path:'/',
        element:<Navigate to='cart'/>
    },
    {
        path:'/shopList',
        element: <ShopList/>
    },
    {
        path:'/cart',
        element: <Cart/>
    }
]
