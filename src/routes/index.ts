import config from '~/config';
import { Home, Login, Register, Update, Upload } from '~/pages';
import DefaultLayout from '~/layouts';
import BackgroundLayout from '~/layouts/BackgroundLayout';

const publicRoutes = [
    { path: config.routes.home, element: Home, layout: DefaultLayout },
    { path: config.routes.login, element: Login, layout: BackgroundLayout },
    { path: config.routes.register, element: Register, layout: BackgroundLayout },
    { path: config.routes.update, element: Update, layout: BackgroundLayout },
    { path: config.routes.upload, element: Upload, layout: BackgroundLayout },
];

export default publicRoutes;
