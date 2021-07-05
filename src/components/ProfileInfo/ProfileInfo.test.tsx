import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileInfo from './ProfileInfo';
import userEvent from '@testing-library/user-event';

const props = {
  user: {
    id: '',
    email: 'email@test.com',
    baseCurrency: 'EUR',
    savedCurrencies: [],
    displayName: '',
  },
  signOut: jest.fn()
}

describe('ProfileInfo', () => {
  it('should render the ProfileInfo component', () => {
    render(<ProfileInfo {...props} />);

    screen.getByText('You are signed in as');
  });
  
  it('should display the email address', () => {
    render(<ProfileInfo {...props} />);

    screen.getByText(props.user.email);
  });

  it('should call the signout prop', () => {
    render(<ProfileInfo {...props} />);

    userEvent.click(screen.getByText('Sign out'));
    expect(props.signOut).toHaveBeenCalledTimes(1);
  });
})