import React from 'react';
import { render, screen } from '@testing-library/react';
import MockCurrencyProvider from '../../mock/MockCurrencyProvider';
import CurrencySelect from './CurrencySelect';
import userEvent from '@testing-library/user-event';

const props = {
  exclude: ['CAD', 'CHF'],
  prioritise: ['HKD', 'EUR'],
  hideNames: false,
  ariaLabel: 'test aria label',
  defaultValue: 'CZK',
  onChange: jest.fn(),
};

describe('CurrencySelect', () => {
  it('should render the CurrencySelect component', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} />
      </MockCurrencyProvider>,
    );

    screen.getByLabelText(props.ariaLabel);
    screen.getByText(/CZK/);
  });

  it('should display flags', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} />
      </MockCurrencyProvider>,
    );

    screen.getByAltText('CZK flag');
    userEvent.click(screen.getByText(/CZK/));
    screen.getByAltText('AUD flag');
  });

  it('should prioritise given currencies', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} />
      </MockCurrencyProvider>,
    );

    userEvent.click(screen.getByText(/CZK/));

    expect(screen.getAllByAltText(/flag/)[0].parentNode?.textContent).toMatch(/CZK/);
    expect(screen.getAllByAltText(/flag/)[1].parentNode?.textContent).toMatch(/HKD/);
    expect(screen.getAllByAltText(/flag/)[2].parentNode?.textContent).toMatch(/EUR/);
  });

  it('should exclude given currencies', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} />
      </MockCurrencyProvider>,
    );

    userEvent.click(screen.getByText(/CZK/));
    expect(screen.queryByText(/CAD/)).not.toBeInTheDocument();
    expect(screen.queryByText(/CHF/)).not.toBeInTheDocument();
  });

  it('should hide currency names', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} hideNames={true} />
      </MockCurrencyProvider>,
    );

    expect(screen.queryByText('CZK')).toBeInTheDocument();
    expect(screen.queryByText('CZK (Czech Republic Koruna)')).not.toBeInTheDocument();
  });

  it('should call the onChange prop', () => {
    render(
      <MockCurrencyProvider>
        <CurrencySelect {...props} hideNames={true} />
      </MockCurrencyProvider>,
    );

    userEvent.click(screen.getByText(/CZK/));
    expect(screen.queryByText(/EUR/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/EUR/));
    expect(screen.queryByText(/CZK/)).not.toBeInTheDocument();
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('EUR');
  });
});
