import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './list.css'
import {IArticleList} from 'web/types/Article';
export const ArtickeList: React.FC<IArticleList> = function ({ link, title,  content, date }) {
    return <section className='article-list'>
        <NavLink to={link}>
            <h1 className='article-title'>{title}</h1>
            <p className='simple-desc'>{content}</p>
        </NavLink>
        <p className='author-date'>{date}</p>
    </section>
}