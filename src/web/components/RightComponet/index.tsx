import React, { FC, useState, Fragment, useEffect } from 'react';
import './index.css';
const RightComponet: FC = (): JSX.Element => {
    const account = require('@assets/images/right/wechat.jpg');
    const applets = require('@assets/images/right/wxapp.jpg');
    const list = [{
        url: "1",
        name: '5g'
    },
    {
        url: "2",
        name: "angular"
    }
    ]
    const dataJson = [{
        name:"deno",
        num: 16,
        url:"2"
    },{
        name:"github项目精选",
        num: 1,
        url:"2"
    },{
        name:"nodejs",
        num: 14,
        url:"2"
    },{
        name:"前端动态",
        num: 20,
        url:"2"
    }]
    return (
        <div id='secondary'>
            <section>
                <h3 className="widget-title widget-title-skin">微信公众号</h3>
                <div className="tagcloud">
                    <ul className="widget-list">
                        <figure>
                            <img src={account} alt="前端先锋" />
                            <figcaption>
                                请扫描挂住公众号:
                                <br />
                                前端先锋
                            </figcaption>
                        </figure>
                    </ul>
                </div>
            </section>
            <section>
                <h3 className="widget-title widget-title-skin">前端面试星球</h3>
                <div className="tagcloud">
                    <ul className="widget-list">
                        <figure>
                            <img src={applets} alt="前端先锋" />
                            <figcaption>
                                请微信扫码访问小程序
                                <br />
                                前端面试星球
                            </figcaption>
                        </figure>
                    </ul>
                </div>
            </section>
            <section>
                <h3 className="widget-title">最近文章</h3>
                <ul className="widget-list">
                    <li>
                        <a href="" title="顶级在线设计工具收藏">顶级在线设计工具收藏</a>
                    </li>
                </ul>
            </section>
            <section>
                <h3 className="widget-title">分类</h3>
                <ul className="widget-list">
                {
                    dataJson.map((v,i)=>{
                        return(
                        <li key={i}>
                            <a href={v.url}>{v.name}({v.num})</a>
                        </li>
                        )
                    })
                }

                </ul>
            </section>
            <section>
                <h3 className="widget-title">标签</h3>
                <div className="tagcloud">
                    {
                        list.map((v, i) => {
                            return (
                                <a href={v.url} key={i} className="skin-border">{v.name}</a>
                            )
                        })
                    }
                </div>
            </section>
            <section>
                <h3 className="widget-title">友情链接</h3>
                <ul className="widget-list">
                    <li>
                        <a href="" title="京程一灯">京程一灯</a>
                    </li>
                </ul>
            </section>
            <section>
                <h3 className="widget-title">其他</h3>
                <ul className="widget-list">
                    <li>
                        <a href="" title="京程一灯">文章 RSS</a>
                    </li>
                </ul>
            </section>
        </div>
    )
}


export default RightComponet