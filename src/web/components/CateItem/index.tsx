import React, { FC } from 'react';
import './index.css';

type TCatalogItem<T> = {
    content: T,
    date: T,
    link: T
}
export interface ICataProps {
    type: string,
    typeLink: string,
    ContentList: Array<TCatalogItem<string>>
}

const CateItem: FC<ICataProps> = (props: ICataProps) => {
    return (
        <div className="post-archive">
            <h2 className="subTitle">
                <a href={props.typeLink}>{props.type}</a> 
                <span>({props.ContentList.length})</span>
            </h2>
            <ul className="listing">
                {
                    props.ContentList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="date">[{item.date}]</span>
                                <a href={item.link} title={item.content}>{item.content}</a>
                            </li> 
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CateItem;