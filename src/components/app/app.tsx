import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:id'
          element={
            <div>
              <p
                className={`text text_type_main-medium ${styles.detailHeader}`}
              >
                {`#${location.pathname.match(/\d+/)}`}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div>
              <p
                className={`text text_type_main-medium ${styles.detailHeader}`}
              >
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='/*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
