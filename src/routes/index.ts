import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Update from '~/pages/Update';
import DefaultLayout from '~/layouts';
import BackgroundLayout from '~/layouts/BackgroundLayout';

const publicRoutes = [
  { path: config.routes.home, element: Home, layout: DefaultLayout },
  { path: config.routes.login, element: Login, layout: BackgroundLayout },
  { path: config.routes.register, element: Register, layout: BackgroundLayout },
  { path: config.routes.update, element: Update, layout: BackgroundLayout },
];

export default publicRoutes;
