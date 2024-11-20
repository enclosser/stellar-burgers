import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserData)?.user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
