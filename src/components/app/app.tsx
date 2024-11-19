import { ConstructorPage, Feed, NotFound404 } from '@pages';

import '../../index.css';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
    </Routes>
  </div>
);

export default App;
