import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './list.css'
export interface IListProps {
    link: string,
    articleHeadTitle: string,
    articleSecTitle: string,
    authorAndDate: string,
    articleSimpleDesc: string,

}
const ArtickeList: React.FC<IListProps> = function ({ link, articleHeadTitle, articleSecTitle, articleSimpleDesc, authorAndDate }) {
    return <section className='article-list'>
        <NavLink to={link}>
            <h1 className='article-title'>{articleHeadTitle}</h1>
            <p className='sec-title'>{articleSecTitle}</p>
            <p className='simple-desc'>{articleSimpleDesc}</p>
        </NavLink>
        <p className='author-date'>{authorAndDate}</p>
    </section>
}
export default ArtickeList