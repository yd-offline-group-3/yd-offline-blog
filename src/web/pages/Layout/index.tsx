import React, { useEffect } from 'react';
import routes, { firstRoute } from '@routes/index';
import RightComponet from "@components/RightComponet"
import { useRootData } from 'web/tools/useRootData';
import HeaderBlock from '@components/Headerblock';
import { storeContext } from '@tools/StoreProvider';
import Footer from '@components/Footer';
import './index.css'
const App = () => {
  const token = useRootData((store) => store.home.token);
  const store = React.useContext(storeContext);
  store.header.setTitle('京程一灯', '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。');

  return (
    <>
      <section className='main-conatiner'>
        {routes(firstRoute[0].routes)(token)}
        <RightComponet></RightComponet>
      </section>
    </>
  );
};
export default App;

// import React, { useEffect, useState } from 'react';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
// import 'antd/es/pagination/style/index.css';
// import './index.css';
// import { Pagination } from 'antd';
// interface ContentRouterProps {
//     page?: string
// }

// interface IBlogListResult {
//     content: string;
//     date: string;
//     link: string;
//     title: string;
//     type: string;
// }

// const Home: React.FC<RouteComponentProps<ContentRouterProps>> = ({ history, match }) => {
//     const store = React.useContext(storeContext);
//     store.header.setTitle('京程一灯', '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。');
//     const [articleList, setArticleList] = useState<Array<IListProps>>([]);
//     let page = Number(match?.params?.page);
//     useEffect(() => {
//         getBlogList()
//     }, [page]);

//     const getBlogList = () => {
//         if (!page || isNaN(page)) {
//             page = 1;
//         }
//         fetch(`/api/blog-list?page=${page}`,
//             {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }).then(
//                 (res) => res.json()
//             ).then(data => setArticleList(data.result.map((art: IBlogListResult) => {
//                 return {
//                     link: '/content/' + art.link.replace(/\//g, '__'),
//                     articleHeadTitle: art.title,
//                     articleSecTitle: '',
//                     content: art.content,
//                     date: art.date
//                 }
//             })));
//     }

//     const onChange = (goPage: number) => {
//         history.push(`/page/${goPage}`);
//         document.documentElement.scrollTop = 0;
//     }

//     return (
//         <section className='home-container'>
//             <div className='list-container'>
//                 {
//                     articleList.map((item, index) => {
//                         return <ArtickeList key={index} {...item}></ArtickeList>
//                     })
//                 }
//                 <Pagination style={{ marginTop: "15px" }} showSizeChanger={false} defaultCurrent={page || 1} onChange={onChange} total={380} />
//             </div>
//             <RightComponet></RightComponet>
//         </section>
//     );
// }

// export default withRouter(Home);
// >>>>>>> 5b43ae8616a33d27b39b37d3b629cb202e11bf0c