import React, { useEffect, useState, CSSProperties } from "react";
import { pathFile } from "web/types/pathFile";
import figlet from 'figlet';
import standard from './Standard';
import "./index.css";

interface IProps {
    style?: CSSProperties,
    path: pathFile
}

const Terminal = (props: IProps) => {
    const [currPath, setCurrPath] = useState(props.path);
    const [historyMsg, setHistoryMsg] = useState<Array<{ type: string, value: string | string[] }>>([]);
    const [lastCmd, setLastCmd] = useState('');
    const commands: { [props: string]: (arg: Array<string>) => void } = {
        "cat": (arg: Array<string>) => {
            const goPath = arg.slice(1).join('').split('/');
            if (goPath.length) {
                let path = currPath;
                if (goPath[0] === '~') {
                    path = props.path;
                }
                if (!goPath[0].trim()) {
                    goPath.shift();
                }
                for (let i = 0; i < goPath.length; i++) {
                    const gp = goPath[i];
                    if (i === goPath.length - 1) {
                        if (path.children[gp].type === 'file') {
                            window.open(path.children[gp].htmlPath);
                        } else {
                            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `cat: ${arg.slice(1).join('')}: Is a directory` }] });
                        }
                    } else if (path.children[gp].type === 'dir') {
                        path = path.children[gp];
                    } else {
                        setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `cat: ${arg.slice(1).join('')}: Not a directory` }] });
                    }
                    if (path.children[gp].type === 'dir') {
                        path = path.children[gp];
                    } else {
                        if (i === goPath.length - 1) {
                            window.open(path.children[gp].htmlPath);
                        } else {
                            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `cat: ${arg.slice(1).join('')}: Not a directory` }] });
                        }
                    }
                }
            } else {
                setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `???` }] });
            }
        },
        "ls": (arg: Array<string>) => {
            setHistoryMsg((prevState) => { return [...prevState, { type: 'lsList', value: Object.keys(currPath.children) }] });
        },
        "cd": (arg: Array<string>) => {
            const goPath = arg.slice(1).join('').split('/');
            if (goPath.length && (goPath[0].trim() || arg.slice(1).join('').includes('/'))) {
                let path = currPath;
                if (goPath[0] === '~') {
                    path = props.path;
                }
                if (!goPath[0].trim()) {
                    goPath.shift();
                }
                for (let gp of goPath) {
                    if (path.children[gp]) {
                        if (path.children[gp].type === 'dir') {
                            path = path.children[gp];
                        } else {
                            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `cd: not a directory: ${arg.slice(1).join('')}` }] });
                            return;
                        }
                    } else {
                        setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `cd: no such file or directory: ${arg.slice(1).join('')}` }] });
                        return;
                    }
                }
                setCurrPath(path);
            } else {
                setCurrPath(props.path);
            }
        },
        "rm": () => {
            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `NO NO NO 想都不要想！🙅‍♂️` }] });
        },
        "cls": () => {
            setHistoryMsg([]);
        },
        "clear": () => {
            setHistoryMsg([]);
        },
        "help": () => {
            (figlet as any).parseFont('Standard', standard);
            setHistoryMsg((prevState) => { return [...prevState, { type: 'pre', value: figlet.textSync('YDBLOG') }] });
            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: '您可以使用的指令：cat、ls、cd、cls、clear、help、echo' }] });
        },
        "echo": (arg: Array<string>) => {
            setHistoryMsg((prevState) => { return [...prevState, { type: 'text', value: `arg.slice(1).join(' ')` }] });
        }
    };

    const checkInput = () => {
        const userInput = document.getElementById('user-input');
        const tip = document.getElementById('tip');
        if (!userInput || !tip) {
            return;
        }
        const userText = userInput.innerText;
        const userCmd = userText.replace(/\n/g, '').split(' ').filter(e => !!e);
        tip.innerText = '';
        if (userCmd.length) {
            if (userCmd.length === 1) {
                const lastCmd = userCmd[userCmd.length - 1];
                const cmdKeys = Object.keys(commands);
                for (const cmdKey of cmdKeys) {
                    if (cmdKey.startsWith(lastCmd) && cmdKey !== lastCmd) {
                        tip.innerText = cmdKey.substring(lastCmd.length);
                        break;
                    }
                }
            } else {
                const goPath = userCmd.slice(1).join('').split('/');
                if (goPath.length && (goPath[0].trim() || userCmd.slice(1).join('').includes('/'))) {
                    let path = currPath;
                    if (goPath[0] === '~') {
                        path = props.path;
                    }
                    if (!goPath[0].trim()) {
                        goPath.shift();
                    }
                    for (let i = 0; i < goPath.length; i++) {
                        const gp = goPath[i];
                        if ((i === goPath.length - 1)) {
                            const keys = Object.keys(path.children);
                            for (const key of keys) {
                                if (key.startsWith(gp)) {
                                    tip.innerText = path.children[key].name.substring(gp.length);
                                }
                            }
                        } else if (path.children[gp] && path.children[gp].type === 'dir') {
                            path = path.children[gp];
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    const runCmd = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const userInput = document.getElementById('user-input');
        if (e.key === 'Enter') {
            e.preventDefault();
            const userText = userInput.innerText;
            const userCmd = userText.replace(/\n/g, '').split(/\s/).filter(e => !!e);
            console.log(userCmd);
            setHistoryMsg((prevState) => {
                return [...prevState, { type: 'text', value: `yd@blog ${currPath.name} % ${userText.replace(/\n/g, '')}` }]
            });
            setLastCmd(userText.replace(/\n/g, ''));
            if (userCmd.length) {
                const cmdKeys = Object.keys(commands);
                if (cmdKeys.includes(userCmd[0])) {
                    commands[userCmd[0]](userCmd);
                } else {
                    setHistoryMsg((prevState) => {
                        return [...prevState, { type: 'text', value: `-ydblog:\t${userCmd[0]}:\tcommand not found` }]
                    });
                }
            }
            userInput.innerText = '';
            requestAnimationFrame(() => {
                document.getElementById("components-terminal").scrollTop = document.getElementById("components-terminal").scrollHeight;
            });
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const tip = document.getElementById('tip');
            if (tip) {
                const tipText = tip.innerText;
                if (tipText.length) {
                    userInput.innerText = userInput.innerText + tipText;
                    window.getSelection().collapse(userInput, 1);
                }
            }
        }
        if (e.key === 'ArrowUp') {
            userInput.innerText = lastCmd;
            window.getSelection().collapse(userInput, 1);
        }

    }

    useEffect(() => {
        const userInput = document.getElementById('user-input');
        let observer = new MutationObserver(checkInput);
        observer.observe(userInput, { attributes: true, childList: true, subtree: true, characterData: true });
        return () => {
            observer.disconnect();
        }
    },);

    return (
        <>
            <div
                id="components-terminal"
                className="components-terminal"
                style={props.style}
                onMouseUp={() => { document.getElementById('user-input') && document.getElementById('user-input').focus(); }}
                onKeyDown={runCmd}
            >
                {
                    historyMsg.map((data, index) => {
                        switch (data.type) {
                            case 'text': return (<span key={index}>{data.value}<br /></span>);
                            case 'pre': return (<pre key={index}>{data.value}<br /></pre>);
                            case 'lsList': return (<div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px)' }}>{(data.value as string[]).map((v, index2) => (<div key={index2} style={{ margin: "10px" }}>{v}</div>))}</div>);
                            default: return (<span key={index}>{data.value}</span>);
                        }
                    })
                }
                <span>{`yd@blog ${currPath.name} % `}</span>
                <span
                    id="user-input"
                    contentEditable
                    spellCheck="false"
                    autoCorrect="off"
                    style={{ paddingLeft: "5px" }}
                ></span>
                <span id="tip"></span>
            </div>
        </>
    );
};
export default Terminal;

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

 // const [path, setPath] = useState<pathFile>({ type: 'dir', name: '~' });

    // const [showTerminal, setShowTerminal] = useState(true);

    // const [showWindow, setShowWindow] = useState(false);

    // let rnd: Rnd;

// fetch('/api/blog-categories',
        //     {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(
        //         (res) => res.json()
        //     ).then(data => { setPath(formateCategories(data.result)); });


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