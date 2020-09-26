import Terminal from '@components/Terminal';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import { pathFile } from "web/types/pathFile";
// import { Rnd } from "react-rnd";

import Catalog from '../Catalog';

import './index.css';

interface ContentRouterProps {
    post: string;
}

// type CategoriesResult = Array<{ ContentList: Array<{ content: string, date: string }>, type: string }>;

// function formateCategories(catagories: CategoriesResult): pathFile {
//     let path: pathFile = { type: 'dir', name: '~', children: {} };
//     for (let data of catagories) {
//         let param: pathFile = { type: 'dir', name: data.type, children: {} };
//         data.ContentList.map(article => {
//             param.children[article.content] = {
//                 type: 'file',
//                 name: article.content,
//                 htmlPath: `http://blog.yidengxuetang.com/post/${article.date.replace(/\//, '')}`
//             }
//         }
//         );
//         path['children'][data.type] = param;
//     }
//     console.log(path);
//     return path;
// }

const Content: React.FC<RouteComponentProps<ContentRouterProps>> = (routerProps: {
    match: { params: { post: string } };
}) => {

    const [data, setData] = useState(null);

    // const [path, setPath] = useState<pathFile>({ type: 'dir', name: '~' });

    // const [showTerminal, setShowTerminal] = useState(true);

    // const [showWindow, setShowWindow] = useState(false);

    // let rnd: Rnd;

    useEffect(() => {
        let post = routerProps.match?.params?.post;
        fetch('/api/blog-content',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'post': post
                })
            }).then(
                (res) => res.json()
            ).then(data => setData(data.result));

        // fetch('/api/blog-categories',
        //     {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(
        //         (res) => res.json()
        //     ).then(data => { setPath(formateCategories(data.result)); });
    }, [])

    // const RndDefault = {
    //     x: 0,
    //     y: 0,
    //     width: 700,
    //     height: 675
    // }

    // const minimizeTerminal = () => {
    //     if (showTerminal) {
    //         setShowTerminal(false);
    //         const y = document.documentElement.clientHeight + document.documentElement.scrollTop - 50;
    //         rnd.updatePosition({
    //             x: 50,
    //             y: y >= 0 ? y : 0
    //         });
    //     } else {
    //         setShowTerminal(true);
    //         const x = document.documentElement.clientWidth / 2 - 312
    //         const y = document.documentElement.clientHeight / 2 + document.documentElement.scrollTop - 300
    //         rnd.updatePosition({
    //             x: x >= 0 ? x : 0,
    //             y: y >= 0 ? y : 0
    //         });
    //     }
    // }

    return (
        <>
            <div style={{ backgroundColor: "black", height: "456px", marginBottom: "20px" }}>

            </div>
            <div className="content-grid">
                <div className='post-content' dangerouslySetInnerHTML={{ __html: data?.htmlStr }}>

                </div>
                {/* <Catalog title="文章目录" catalogList={data?.catalogList} ></Catalog> */}
            </div>
            {/* <Rnd ref={c => { rnd = c; }} style={{ display: (showWindow ? 'block' : 'none') }} default={RndDefault} cancel=".components-terminal">
                <div
                    className="terminal-header"
                    onMouseUp={() => { document.getElementById('user-input') && document.getElementById('user-input').focus(); }}
                >
                    <span className="dialog-button close-button" onClick={() => { setShowWindow(false) }}></span>
                    <span
                        className={`dialog-button mini-button ${(showTerminal ? 'minimize-button' : 'reset-button')}`}
                        onClick={() => { minimizeTerminal() }}
                    ></span>
                    Ternminal
                </div>
                {
                    showWindow &&
                    showTerminal &&
                    < Terminal
                        path={path}
                        style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', paddingLeft: "5px", paddingRight: "5px" }}
                    ></Terminal>
                }
            </Rnd> */}
        </>
    )
}

export default Content;