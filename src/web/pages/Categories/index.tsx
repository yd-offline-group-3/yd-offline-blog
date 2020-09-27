import CateItem, {ICataProps} from "@components/CateItem";
import RightComponent from "@components/RightComponet"
import { storeContext } from '@tools/StoreProvider';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.css';

interface ContentRouterProps {
    type?: string
}

interface CataItem {
    content: string;
    date: string;
}

interface CataResultItem {
    type: string;
    ContentList: Array<CataItem>
}

const Home: React.FC<RouteComponentProps<ContentRouterProps>> = ({ history, match }) => {
    const store = React.useContext(storeContext);
    store.header.setTitle('京程一灯', '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。');
    const [articleList, setArticleList] = useState<Array<ICataProps>>([]);
    const [catalen, setCatalen] = useState(0)
    
    useEffect(() => {
        getBlogList()
    }, []);

    const getBlogList = () => {
        fetch(`/api/blog-categories`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (res) => res.json()
            ).then(data => {
                setCatalen(data.result.length)
                setArticleList(data.result.map((item: CataResultItem) => {
                    return {
                        type: item.type,
                        typeLink: `http://blog.yidengxuetang.com/categories/${item.type}`,
                        ContentList: item.ContentList.map(art => {
                            return Object.assign({}, art, {
                                link: '/content/' + art.date.replace(/^(\d{4})(\/)(\d{2})(\/)(\d{2})/g, '$1$3__$5__') 
                            })
                        })
                    }
                }))
            });
    }

    return (
        <section className='home-container'>
            <div className='list-container'>
                <div id="main">
                    <header>
                        <h1>共有{catalen}个分类</h1>
                    </header>
                    {
                        articleList.map((item, index) => {
                            console.log(1111, item)
                            return <CateItem key={index} {...item}></CateItem>
                        })
                    }
                </div>
            </div>
            <RightComponent></RightComponent>
        </section>
    );
}

export default withRouter(Home);