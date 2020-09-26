import * as React from 'react';
import {
  Route, Switch, RouteProps, Redirect,
} from 'react-router-dom';
import Loading from '@components/Loading';
import Home from '@components/Home';
import NotFound from '@components/NotFound';
// import { string } from "prop-types";
const { lazy, Suspense } = React;

const AboutUs = lazy(() => import(/* webpackChunkName:"AboutUs" */ '@pages/AboutUs'));
const right = lazy(() => import(/* webpackChunkName:"Nav" */ '@components/RightComponet'));
interface YDProps extends RouteProps {
  auth?: boolean;
}
export const routes: YDProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    // auth: true,
  },
  {
    path: '/AboutUs',
    exact: true,
    component: AboutUs,
  }
];

// 对状态属性进行监听
const Routes = (token: string) => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes.map((r, index) => {
        console.log('🍊', index);
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
                      pathname: '/AboutUs',
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
