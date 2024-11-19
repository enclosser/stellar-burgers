import { FC } from 'react';
import classNames from 'classnames';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

// Компонент для отображения навигационного элемента
const NavItem: FC<{
  to: string;
  icon: React.ElementType;
  label: string;
  extraClass?: string;
}> = ({ to, icon: Icon, label, extraClass = '' }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      classNames(styles.link, extraClass, { [styles.link_active]: isActive })
    }
  >
    {({ isActive }) => (
      <>
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <p className='text text_type_main-default ml-2'>{label}</p>
      </>
    )}
  </NavLink>
);

// Основной компонент AppHeaderUI
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={classNames(styles.menu, 'p-4')}>
      <div className={styles.menu_part_left}>
        <NavItem
          to='/'
          icon={BurgerIcon}
          label='Конструктор'
          extraClass='ml-10 mr-10'
        />
        <NavItem
          to='/feed'
          icon={ListIcon}
          label='Лента заказов'
          extraClass='ml-10'
        />
      </div>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <NavItem
          to='/profile'
          icon={ProfileIcon}
          label={userName || 'Личный кабинет'}
          extraClass='ml-10'
        />
      </div>
    </nav>
  </header>
);
