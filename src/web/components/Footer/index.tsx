import React, {FC} from 'react';
import './index.css';

const Footer:FC = () => {
    return (
        <div className="footerWrap">
            © 2016 - 2020
            <a href="http://blog.yidengxuetang.com"> 前端先锋 By 疯狂的技术宅. </a>
            Powered by
            <a rel="nofollow noreferer noopener" href="https://gohugo.io" target="_blank"> Hugo.</a>
            <a href="https://www.flysnow.org/" target="_blank"> Theme </a>
            based on
            <a href="https://github.com/rujews/maupassant-hugo" target="_blank"> maupassant.</a>
        </div>
    )
}

export default Footer;