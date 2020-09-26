import * as React from 'react';
import {
  Route, Switch, RouteProps, Redirect,
} from 'react-router-dom';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';
import Home from '@pages/Home';
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
    path: '/page/:page',
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
        const { path, exact, component } = r;
        const LazyCom = component;
        return (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            path={path}
            exact={exact}
            // eslint-disable-next-line no-nested-ternary
            render={(props) => (!r.auth ? (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <LazyCom {...props} />
            ) : token ? (
              // eslint-disable-next-line react/jsx-props-no-spreading
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
