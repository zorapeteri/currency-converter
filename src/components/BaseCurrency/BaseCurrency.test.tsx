import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseCurrency from './BaseCurrency';
import MockCurrencyProvider from '../../mock/MockCurrencyProvider';
import userEvent from '@testing-library/user-event';

const props = {
  baseCurrency: 'DKK',
  onChange: jest.fn(),
};

describe('BaseCurrency', () => {
  it('should render the BaseCurrency component', () => {
    render(<BaseCurrency {...props} />);

    screen.getByText('Your base currency');
  });

  it('should have the base currency selected', () => {
    render(
      <MockCurrencyProvider>
        <BaseCurrency {...props} />
      </MockCurrencyProvider>,
    );

    screen.getByText('DKK (Danish Krone)');
  });

  it('should be able to change and call the onChange prop', () => {
    render(
      <MockCurrencyProvider>
        <BaseCurrency {...props} />
      </MockCurrencyProvider>,
    );

    userEvent.click(screen.getByText('DKK (Danish Krone)'));
    expect(screen.queryByText('AUD (Australian Dollar)')).toBeInTheDocument();
    userEvent.click(screen.getByText('AUD (Australian Dollar)'));
    expect(screen.queryByText('DKK (Danish Krone)')).not.toBeInTheDocument();
    expect(screen.queryByText('AUD (Australian Dollar)')).toBeInTheDocument();
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('AUD');
  });
});
