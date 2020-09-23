import React,{FC, useState} from 'react';
import './index.css';
import Nav from '@components/Nav';
import Footer from '@components/Footer';

type IProp = {
    title: string,
    subTitle: string
}
const HeaderBlock:FC<IProp> = (props:IProp) => {
    let [isShow, setIsShow] = useState(true) 
    return (
        <>
            <div className='wrapper'>
                <div className="nav">
                    <Nav></Nav>
                </div>
                <div className="content">
                    <h1>Hello World</h1>
                    <p>Welcome Baby!</p>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}


export default HeaderBlock;