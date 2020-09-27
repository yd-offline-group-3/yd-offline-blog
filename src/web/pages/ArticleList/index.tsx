import { ArtickeList} from '@components/Blog/ArticleList';
import { IData } from 'web/types/Data';
import {IArticleList} from 'web/types/Article';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-query';
interface ContentRouterProps {
    page?: string
}

const ArticlList: React.FC<RouteComponentProps<ContentRouterProps>> = (props: {
    match: { params: { page?: string } };
}) => {
        let page = Number(props.match?.params?.page);
        if (!page || isNaN(page)) {
            page = 1;
        }
        const {
            isLoading,
            error,
            data,
          }: { isLoading: boolean; error: Error; data: IData<IArticleList> } = useQuery(
            'repoData',
            () => fetch(`/api/blog-list?page=${page}`).then((res) => res.json())
          );
          if (isLoading) return <h1>Loading..sss.</h1>;
          if (error) return <h1>出错了~</h1>;
        const  listResult =data.result as IArticleList[];
        return (
         <div className='list-container'>
         { 
                listResult.map((item:any,index:number)=>{
                    return <ArtickeList key={index} {...item}></ArtickeList>
                })
            }
        </div>
        );
}

export default ArticlList;