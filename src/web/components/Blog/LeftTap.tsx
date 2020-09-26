import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './left.css'
const LeftTap:React.FC=()=>{
    const head_icon = require('@assets/images/l3.jpg')
    return <section className="tap-container">
        <h5>
        <NavLink className='tag-title' to='aa'>FEATURED TAGS</NavLink>
        </h5>
        <div className='link-containt'>
            <a className='tag' href="">啊啊啊</a>
            <a className='tag' href="">啊啊啊</a>
            <a className='tag' href="">啊啊啊</a>
            <a className='tag' href="">啊啊啊</a>
            <a className='tag' href="">啊啊啊</a>
        </div>
        <img className='head_icon' src={head_icon} alt=""/>
        <p className='personal_desc'>啊啊啊多多多大声道</p>
    </section>
}

export default LeftTap