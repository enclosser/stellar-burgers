import { ConstructorPage } from '@pages';

import '../../index.css';
import styles from './app.module.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
