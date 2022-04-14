import {RouteProps} from 'react-router-dom';

// pages according to routes
import {Home, SubHome1, SubHome2} from '../pages/home';
import Login from '../pages/login';
import Page404 from '../pages/page404';

export interface AppRoute extends RouteProps {
  // authorized rules to visit the route. route without authRoles property does not require login
  authRoles?: Array<string> | 'all';
  // subroutes
  routes?: Array<AppRoute>;
}

// routes configuration
export const routes: Array<AppRoute> = [
  // route '/login' must come before route '/' if route '/' does not have 'exact'
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    authRoles: 'all',
    component: Home,
    /* 
      If a route has sub routes:
        1.It must not have 'exact'
        2.Its component must render children to have the subroutes' components rendered
        3.Due to rule 1, enabling subroutes under route '/' will disable 404 page
    */
    routes: [
      {
        path: '/1',
        authRoles: 'all',
        component: SubHome1,
        exact: true,
      },
      {
        path: '/2',
        authRoles: ['tester'],
        component: SubHome2,
        exact: true,
      },
    ],
  },
  // route '' must come last for 404 page
  {
    path: '',
    component: Page404,
  },
];
