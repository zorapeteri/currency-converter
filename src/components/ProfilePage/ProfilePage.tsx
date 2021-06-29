import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import Auth from '../Auth';
import BaseCurrency from '../BaseCurrency';
import ProfileInfo from '../ProfileInfo';
import SavedCurrencies from '../SavedCurrencies';

const ProfilePage: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return (
      <>
        <ProfileInfo user={user} />
        <BaseCurrency />
        <SavedCurrencies />
      </>
    );
  }

  return <Auth />;
};

export default ProfilePage;
