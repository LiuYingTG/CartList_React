import React, {useState} from 'react';
import {App, Button, InputNumber, message} from "antd";

function NumControl(props) {
    const { message, notification, modal } = App.useApp();
    const [num, setNum] = useState(props.num)
    const {numChange} = props

    const decreaseNum = () => {
        if (num === 1) {
            message.destroy()
            message.error('数量不能小于1!');
            return
        }
        setNum(num -1)
        numChange(num-1)

    }
    /*增加商品数量*/
    const creaseNum = () => {
        if(num===200){
            message.destroy()
            message.error('数量不能大于200!')
            return
        }
        setNum(num + 1)
        numChange(num+1)
    }
    return (
        <div>
            <Button
                onClick={() => (decreaseNum())}
            >-</Button>
            <InputNumber
                changeOnBlur={true}
                onChange={(value)=>{
                    setNum(value)
                    if(typeof value==='number'){
                        numChange(value)
                    }
                }}
                controls={false}
                min={1} max={200}
                style={{width: '80px', textAlign: 'center'}}
                value={num}
            />
            <Button onClick={() => {
                creaseNum()
            }}>+</Button>

        </div>
    );
}

export default NumControl;
