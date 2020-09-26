import * as React from 'react';
import {
  Route, Switch, RouteProps, Redirect,
} from 'react-router-dom';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';
import Home from '@pages/Home/index';
import  ArtickeList  from '@pages/ArticleList';
import  ArticleDetail  from '@pages/ArticleDetail';
const { lazy, Suspense } = React;

const AboutUs = lazy(() => import(/* webpackChunkName:"AboutUs" */ '@pages/AboutUs'));
const Content = lazy(() => import(/* webpackChunkName:"Nav" */ '@pages/Content'));
// 分类
const Categories = lazy(() => import(/* webpackChunkName:"Categories" */ '@pages/Categories'));

interface YDProps extends RouteProps {
  auth?: boolean,
  routes?:Array<YDProps>
}
export const firstRoute: YDProps[] = [
  //'/'路由一定要在第一项
  {
    path: '/',
    auth: true,
    component: Home,
    routes: [{
      path: '/home',
      exact: true,
      auth: true,
      component:ArtickeList,
    },
    {
      path: '/about',
      exact: true,
      component: AboutUs,
    },
  ]

  },{
    path: '/article/detail',
    auth: true,
    component:ArticleDetail
    // auth: true,
  },
  // {
  //   path: '/page/:page',
  //   exact: true,
  //   component: Home,
  //   // auth: true,
  // },
  // {
  //   path: '/content/:post',
  //   exact: true,
  //   component: Content,
  // },
  // {
  //   path: '/categories',
  //   exact: true,
  //   component: Categories
  // }
];

// 对状态属性进行监听
const Routes = (routes=firstRoute)=>(token: string) => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes.map((r, index) => {
        const { path, exact, component } = r;
        const LazyCom = component;
        return (
          <Route
            key={index}
            path={path}
            exact={exact}
            render={(props) => (!r.auth ? (
              <LazyCom {...props} />
            ) : token ? (
              <LazyCom {...props} />
            ) : (
                  <Redirect
                    to={{
                      pathname: '/',
                      state: { from: props.location },
                    }}
                  />
                ))}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
