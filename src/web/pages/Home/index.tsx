import { IListProps } from '@components/Blog/ArticleList';
import LeftTap from '@components/Blog/LeftTap';
import { storeContext } from '@tools/StoreProvider';
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
    const store = React.useContext(storeContext);
    store.header.setTitle('京程一灯', '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。');
    const [articleList, setArticleList] = useState<Array<IListProps>>([]);
    useEffect(() => {
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
    }, []);
    return (
        <>
            <div></div>
        </>
    );
}

export default Home;