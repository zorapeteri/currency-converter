import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import Auth from '../Auth';
import BaseCurrency from '../BaseCurrency';
import ProfileInfo from '../ProfileInfo';
import SavedCurrencies from '../SavedCurrencies';
import { auth } from '../../firebase';
import { useHistory } from "react-router-dom";

const ProfilePage: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push('/convert');
  }

  if (user) {
    return (
      <>
        <ProfileInfo user={user} signOut={signOut} />
        <BaseCurrency />
        <SavedCurrencies />
      </>
    );
  }

  return <Auth />;
};

export default ProfilePage;
