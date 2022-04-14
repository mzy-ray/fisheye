import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import history from './history';
import {routes, AppRoute} from './routes';
import {RootState} from '../redux/reducers';

const AppRouter: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.account.loggedIn);
  const role = useSelector((state: RootState) => state.account.role);
  // add behaviors like getting authRoles

  return <Router history={history}>{generateRoutes(routes, role, loggedIn)}</Router>;
};

const NotAuthored: React.FC = () => {
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};

function isNotAuthored(
  authRoles: Array<string> | 'all' | undefined,
  loggedIn: boolean | undefined,
  role: string | undefined
): boolean {
  return (
    (authRoles ? true : false) &&
    (!loggedIn || (Array.isArray(authRoles) && !authRoles.includes(role || '')))
  );
}

function generateRoutes(
  routes: Array<AppRoute>,
  role: string | undefined,
  loggedIn: boolean | undefined
): React.ReactNode {
  return (
    <Switch>
      {routes.map((route, index) => {
        const {authRoles, routes: subRoutes, path, component: RouteComponent, ...rest} = route;
        const key: string | number = typeof path === 'string' ? path : index;

        return (
          <Route
            key={key}
            path={path}
            {...rest}
            render={(props): React.ReactNode => {
              // private routes require role authorization otherwise redirect to login
              if (isNotAuthored(authRoles, loggedIn, role)) {
                return <NotAuthored />;
              }
              if (RouteComponent) {
                return (
                  <RouteComponent {...props}>
                    {subRoutes && generateRoutes(subRoutes, role, loggedIn)}
                  </RouteComponent>
                );
              }
              return subRoutes ? generateRoutes(subRoutes, role, loggedIn) : null;
            }}
          />
        );
      })}
    </Switch>
  );
}

export default AppRouter;
