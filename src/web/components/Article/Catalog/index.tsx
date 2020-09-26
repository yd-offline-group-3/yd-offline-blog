import React, { useEffect, useState } from 'react';
import { Affix } from 'antd';

import './index.css';

type TCatalogList = { title: string, type: string, href: string }

interface ICatalog {
    catalogList: Array<TCatalogList>;
    title: string
}

const ArtCatalog: React.FC<ICatalog> = (props) => {

    const [id, setId] = useState('');

    const onScroll = function onScroll(this: Document, e: Event) {
        // console.log(window.pageYOffset);
        if (e.target === document) {
            let newId = '';
            let index = -1;
            props.catalogList?.forEach((catalog, ind) => {
                const catalogId = catalog.href.replace('#', '');
                if (document.getElementById(catalogId)) {
                    const offsetTop = document.getElementById(catalogId).offsetTop;
                    if (offsetTop <= (window.pageYOffset + 1)) {
                        newId = catalogId;
                        index = ind;
                    }
                }
            });
            if (newId && newId !== id) {
                setId(newId);
                const catalogHeight = document.getElementById('side-catalog').offsetHeight;
                const scrollTop = (index + 1) * 30 + 100 - catalogHeight;
                document.getElementById('side-catalog').scrollTop = scrollTop >= 0 ? scrollTop : 0;
            }
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => {
            document.removeEventListener('scroll', onScroll, true);
        }
    });

    return (
        <Affix offsetTop={20}>
            <div className="sidebar-container catalog-container">
                <div id="side-catalog" className="side-catalog">
                    <hr />
                    <h5>{props.title}</h5>
                    <ul className="catalog-body">
                        {
                            props.catalogList?.map((catalog, index) => {
                                const catalogId = catalog.href.replace('#', '');
                                return (
                                    <li
                                        id={'catalog-' + catalogId}
                                        key={index}
                                        className={`${catalog.type}_nav${(id === catalogId ? ' active' : '')}`}>
                                        <a href={catalog.href}>{catalog.title}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </Affix>
    )
}

export default ArtCatalog;