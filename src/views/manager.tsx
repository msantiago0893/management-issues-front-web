import React, { useState } from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';

import styles from './index.module.sass';
import SystemError from '../components/system-error/system-error';
import Sidebar from './sidebar/sidebar';
import { useAppSelector } from '../redux/hooks';

const Manager: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isError = useAppSelector(state => state.app.error);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Header onSidebarToggle={toggleSidebar} />

      <div className={styles.container}>
        <Sidebar showSidebar={showSidebar} />
        <main className={styles['main-content']}>
          {isError ? <SystemError /> : <Outlet />}
        </main>
      </div>
    </>
  );
};

export default Manager;
