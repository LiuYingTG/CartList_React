import React from 'react';
import {Spin} from "antd";

function IsLoading(props) {
    return (
        <div><Spin size='large' fullscreen /></div>
    );
}

export default IsLoading;
