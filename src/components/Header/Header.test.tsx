import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../providers/UserProvider';

const user = {
  displayName: '',
  savedCurrencies: [],
  baseCurrency: 'EUR',
  id: '',
};

describe('Header', () => {
  it('should render the Header component', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    screen.getByText('Sign in');
    screen.getByText('Convert');
  });

  it('should have working links', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.queryByText('Sign in', { selector: 'a.active' })).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText('Sign in', { selector: 'a.active' })).toBeInTheDocument();
  });

  it('should display home when signed in', () => {
    render(
      <UserContext.Provider value={{ user, isLoading: false }}>
        <Router>
          <Header />
        </Router>
      </UserContext.Provider>,
    );

    screen.getByText('Home');
  });
});
