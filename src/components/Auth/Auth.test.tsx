import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from './Auth';
import userEvent from '@testing-library/user-event';

describe('Auth', () => {
  it('should render the Auth component', () => {
    render(<Auth />);
  
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should have working textboxes', () => {
    render(<Auth />);

    screen.getByLabelText('E-mail address');
    screen.getByLabelText('Password');

    userEvent.type(screen.getByLabelText('E-mail address'), 'email@test.com');
    screen.getByDisplayValue('email@test.com');

    userEvent.type(screen.getByLabelText('Password'), 'testpassword');
    screen.getByDisplayValue('testpassword');
  });

  it('should switch between signup and signin', () => {
    render(<Auth />);

    userEvent.click(screen.getByText('Sign up', { selector: 'button'}))

    screen.getByText('Sign up', { selector: 'h1'});
    screen.getByText('Sign up', { selector: 'button'});
    screen.getByText('Sign up with Google');
    screen.getByText('Sign in');

    userEvent.click(screen.getByText('Sign in', { selector: 'button' }));

    screen.getByText('Sign in', { selector: 'h1'});
    screen.getByText('Sign in', { selector: 'button'});
    screen.getByText('Sign in with Google');
    screen.getByText('Sign up');
  });
})