import React from 'react';
import { render, screen } from '@testing-library/react';
import MockCurrencyProvider from '../../mock/MockCurrencyProvider';
import userEvent from '@testing-library/user-event';
import SavedCurrencies from './SavedCurrencies';

const props = {
  savedCurrencies: ['BRL', 'CAD'],
  updateSavedCurrencies: jest.fn(),
};

describe('SavedCurrencies', () => {
  it('should render the SavedCurrencies component', () => {
    render(<SavedCurrencies {...props} />);

    screen.getByText('Your saved currencies');
    screen.getByText('Add currency');
  });

  it('should display the saved currencies', () => {
    render(
      <MockCurrencyProvider>
        <SavedCurrencies {...props} />
      </MockCurrencyProvider>,
    );

    screen.getByText('BRL (Brazilian Real)');
    screen.getByText('CAD (Canadian Dollar)');
  });

  it('should be able to add currency', async () => {
    render(
      <MockCurrencyProvider>
        <SavedCurrencies {...props} />
      </MockCurrencyProvider>,
    );

    userEvent.click(screen.getByText('Add currency'));
    expect(screen.queryByText('Cancel')).toBeInTheDocument();
    expect(screen.queryByText('Select...')).toBeInTheDocument();
    userEvent.click(screen.getByText('Select...'));
    expect(screen.queryByText('BGN (Bulgarian Lev)')).toBeInTheDocument();
    userEvent.click(screen.getByText('BGN (Bulgarian Lev)'));
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Add currency')).toBeInTheDocument();
    expect(screen.queryByText('BGN (Bulgarian Lev)')).toBeInTheDocument();
    expect(props.updateSavedCurrencies).toHaveBeenCalledTimes(1);
    expect(props.updateSavedCurrencies).toHaveBeenCalledWith(['BRL', 'CAD', 'BGN']);
  });

  it('should be able to remove curency', () => {
    render(
      <MockCurrencyProvider>
        <SavedCurrencies {...props} />
      </MockCurrencyProvider>,
    );

    screen.getByText('BRL (Brazilian Real)');
    screen.getByText('CAD (Canadian Dollar)');
    screen.getByLabelText('remove BRL from saved currencies');
    userEvent.click(screen.getByLabelText('remove BRL from saved currencies'));
    expect(screen.queryByText('CAD (Canadian Dollar)')).toBeInTheDocument();
    expect(screen.queryByText('BRL (Brazilian Real')).not.toBeInTheDocument();
    expect(props.updateSavedCurrencies).toHaveBeenCalledTimes(1);
    expect(props.updateSavedCurrencies).toHaveBeenCalledWith(['CAD']);
  });
});
