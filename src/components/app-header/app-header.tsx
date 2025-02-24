import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const name = useSelector(getUserName);
  return <AppHeaderUI userName={name!} />;
};
