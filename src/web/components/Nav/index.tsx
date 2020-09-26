import Item from 'antd/lib/list/Item';
import { timeStamp } from 'console';
import React, {FC, useState} from 'react';
import './index.css';

type NavItem = {
    name: string,
    link: string,
    isOut?: boolean
}
const navConfigList:Array<NavItem> = [
    {
        name: '首页',
        link: '/home',
    },
    {
        name: '分类',
        link: '/',
    },
    {
        name: '归档',
        link: '/home',
    },
    {
        name: '关于',
        link: '/home',
    },
    {
        name: '京程一灯',
        link: '/home',
        isOut: true
    }
]
const Nav:FC = () => {
    

    // 小屏幕是否显示菜单按钮
    let [isShow, setIsShow] = useState(false)
    // 是否固定头部
    let [isFixed] = useState(false);
    const toggleShow = () => {
        setIsShow(isShow => !isShow)
    }
    return (
        <div className={`navWrapper ${isFixed ? 'fixed' : null}`}>
            <div className="navContent">
                <a href='/'>
                    <img src={require('@assets/images/logo.png')} alt="logo" />
                </a>
                <ul className={`navList ${isShow ? "navShow" : null}`}>
                    {
                        navConfigList.map(item => {
                            return <li key={item.name}>
                                <a href={item.link}>{item.name}</a>
                            </li>
                        })
                    }
                </ul>
            </div>
            <button className="menuBtn" onClick={toggleShow}></button>
        </div>
    )
}

export default Nav;