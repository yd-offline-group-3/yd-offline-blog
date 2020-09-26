import { IListProps,ArtickeList} from '@components/Blog/ArticleList';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface ContentRouterProps {
    page?: string
}

interface IBlogListResult {
    content: string;
    date: string;
    link: string;
    title: string;
    type: string;
}

const Home: React.FC<RouteComponentProps<ContentRouterProps>> = (props: {
    match: { params: { page?: string } };
}) => {
    const [articleList, setArticleList] = useState<Array<IListProps>>([]);
    useEffect(() => {
        getBlogList()
    }, []);

    const getBlogList=()=>{
        let page = Number(props.match?.params?.page);
        if (!page || isNaN(page)) {
            page = 1;
        }
        fetch(`/api/blog-list?page=${page}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (res) => res.json()
        ).then(data => setArticleList(data.result.map((art: IBlogListResult) => {
            return {
                link: art.link,
                articleHeadTitle: art.title,
                articleSecTitle: '',
                articleSimpleDesc: art.content,
                authorAndDate: art.date
            }
        })));
    }
    return (
        <section className='home-container'>
        <div className='list-container'>
        {
                articleList.map((item,index)=>{
                    return <ArtickeList key={index} {...item}></ArtickeList>
                })
            }
        </div>
        </section>
    );
}

export default Home;