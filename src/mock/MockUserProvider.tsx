import React from 'react';
import { UserContext } from '../providers/UserProvider';

export const mockUser = {
  displayName: 'Jane Doe',
  savedCurrencies: ['GBP', 'CHF'],
  baseCurrency: 'EUR',
  id: '',
};

const MockUserProvider: React.FunctionComponent<{ children: any }> = (props: { children: any }) => {
  return (
    <UserContext.Provider value={{ user: mockUser, isLoading: false }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default MockUserProvider;
