// import ArtCatalog from '@components/Article/Catalog';
import ArtContent from '@components/Article/Content';
import { storeContext } from '@tools/StoreProvider';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IArticleContent } from 'web/types/Article';
import { IData } from 'web/types/Data';

import './index.css';

interface ContentRouterProps {
    post: string;
}

const Content: React.FC<RouteComponentProps<ContentRouterProps>> = (routerProps: {
    match: { params: { post: string } };
}) => {

    const [data, setData] = useState<IArticleContent>(null);
    const store = React.useContext(storeContext);

    useEffect(() => {
        let post = routerProps.match?.params?.post?.replace(/__/g, '\/');
        fetch('/api/blog-content',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'post': post
                })
            }).then(
                (res) => res.json()
            ).then((data: IData<IArticleContent>) => {
                const result = data.result as IArticleContent;
                setData(result);
                store.header.setTitle(result.title, result.subTitle);
            });
    },[]);



    return (
    
        <section className='content-grid'>
            <div></div>
            {/* <ArtContent data={data}></ArtContent> */}
            {/* <ArtCatalog title='目录' catalogList={data?.catalogList}></ArtCatalog> */}
            <div></div>
        </section>
        
    )
}

export default Content;