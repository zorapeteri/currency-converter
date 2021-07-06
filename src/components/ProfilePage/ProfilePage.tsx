import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import Auth from '../Auth';
import BaseCurrency from '../BaseCurrency';
import ProfileInfo from '../ProfileInfo';
import SavedCurrencies from '../SavedCurrencies';
import { auth, firestore } from '../../firebase';
import { useHistory } from "react-router-dom";

const ProfilePage: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push('/convert');
  }

  const onBaseCurrencyChange = (baseCurrency: string) => {
    firestore.collection('users').doc(user?.id).update({ baseCurrency });
  };

  const updateSavedCurrencies = (savedCurrencies: string[]) => {
    firestore.doc(`users/${user?.id}`).update({
      savedCurrencies,
    });
  };

  if (user) {
    return (
      <>
        <ProfileInfo user={user} signOut={signOut} />
        <BaseCurrency baseCurrency={user.baseCurrency} onChange={onBaseCurrencyChange} />
        <SavedCurrencies
          savedCurrencies={user.savedCurrencies}
          updateSavedCurrencies={updateSavedCurrencies}
        />
      </>
    );
  }

  return <Auth />;
};

export default ProfilePage;
