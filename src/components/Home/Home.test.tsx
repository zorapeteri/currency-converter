import React from 'react';
import { render, screen } from '@testing-library/react';
import MockCurrencyProvider from '../../mock/MockCurrencyProvider';
import MockUserProvider, { mockUser } from '../../mock/MockUserProvider';
import Home from './Home';
import userEvent from '@testing-library/user-event';

const mockFirebaseUpdate = jest.fn();

jest.mock('../../firebase', () => ({
  firestore: {
    doc: () => ({ update: mockFirebaseUpdate }),
  },
}));

describe('Home', () => {
  it('should render the Home component', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Home />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    screen.getByText(`1 ${mockUser.baseCurrency} =`);
    screen.getByText('Change base currency');
  });

  it('should display base currency and currency list', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Home />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    screen.getByText(`1 ${mockUser.baseCurrency} =`);
    screen.getByAltText(`${mockUser.baseCurrency} flag`);

    // prioritise saved currencies
    expect(screen.getAllByAltText(/flag/)[0].getAttribute('alt')).toMatch(/EUR/);
    expect(screen.getAllByAltText(/flag/)[1].getAttribute('alt')).toMatch(
      new RegExp(mockUser.savedCurrencies[0]),
    );
    expect(screen.getAllByAltText(/flag/)[2].getAttribute('alt')).toMatch(
      new RegExp(mockUser.savedCurrencies[1]),
    );

    expect(screen.queryByText('1.110 GBP')).toBeInTheDocument();
    expect(screen.queryByText('20.000 CHF')).toBeInTheDocument();
    expect(screen.queryByText('0.010 DKK')).toBeInTheDocument();

    expect(screen.queryByText('1 GBP = 0.901 EUR')).toBeInTheDocument();
    expect(screen.queryByText('1 CHF = 0.050 EUR')).toBeInTheDocument();
    expect(screen.queryByText('1 DKK = 100.000 EUR')).toBeInTheDocument();
  });

  it('should change base currency', () => {
    const { rerender } = render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Home />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    userEvent.click(screen.getByText('Change base currency'));
    userEvent.click(screen.getByText('Select...'));
    userEvent.click(screen.getByText('GBP (British Pound Sterling)'));

    expect(mockFirebaseUpdate).toHaveBeenCalledTimes(1);
    expect(mockFirebaseUpdate).toHaveBeenCalledWith({ baseCurrency: 'GBP' });
  });
});
