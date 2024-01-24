import React from 'react';
import HeaderModuleCss from './header.module.css'

console.log(HeaderModuleCss)
function Header() {
    return (
        <div className={HeaderModuleCss.header}>header</div>
    );
}

export default Header;
