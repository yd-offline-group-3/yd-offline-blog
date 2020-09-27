import ArtCatalog from '@components/Article/Catalog';
// import ArtCatalog from '@components/Article/Catalog';
import ArtContent from '@components/Article/Content';
import Footer from '@components/Footer';
import HeaderBlock from '@components/Headerblock';
import { storeContext } from '@tools/StoreProvider';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IArticleContent } from 'web/types/Article';
import bcService, { BlogContentResult } from 'web/services/BlogContentService';

import './index.css';
import { useQuery } from 'react-query';
import Loading from '@components/Loading';

interface ContentRouterProps {
  post: string;
}

const ArticleDetail: React.FC<RouteComponentProps<ContentRouterProps>> = (routerProps: {
  match: { params: { post: string } };
}) => {
  const store = React.useContext(storeContext);
  // const [content, setContent] = useState<IArticleContent>(null);
  let post = routerProps.match?.params?.post?.replace(/__/g, '\/');

  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: Error; data: BlogContentResult } = useQuery(
    'getContent',
    () => bcService.getBlogContent(post)
  );
  if (isLoading) return <Loading />;
  if (error) return <h1>出错了~</h1>;
  const content = data.result as IArticleContent;
  store.header.setTitle(content.title, content.subTitle);
  


  return (
    <>
      <section className='main-conatiner'>
        <ArtContent htmlStr={content?.htmlStr}></ArtContent>
        <ArtCatalog catalogList={content?.catalogList} title={content?.title}></ArtCatalog>
      </section>
    </>
  )
}

export default ArticleDetail;
