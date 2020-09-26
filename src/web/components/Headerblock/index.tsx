import React, { FC, useState } from 'react';
import './index.css';
import Nav from '@components/Nav';
import { storeContext } from '@tools/StoreProvider';
import { useObserver } from 'mobx-react-lite';

// type IProp = {
//     title: string,
//     subTitle: string
// }
const HeaderBlock = () => {
    // let [isShow, setIsShow] = useState(true)
    const store = React.useContext(storeContext);
    return useObserver(() => (
        <>
            <div className='wrapper'>
                <div className="nav">
                    <Nav></Nav>
                </div>
                <div className="content">
                    <h1>{store.header.title}</h1>
                    <p>{store.header.subTitle}</p>
                </div>
            </div>
        </>
    ));
}


export default HeaderBlock;