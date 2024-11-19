import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slices/burger-ingredients';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
