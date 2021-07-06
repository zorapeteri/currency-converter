import React from 'react';
import { render, screen } from '@testing-library/react';
import MockCurrencyProvider from '../../mock/MockCurrencyProvider';
import MockUserProvider, { mockUser } from '../../mock/MockUserProvider';
import Convert from './Convert';
import userEvent from '@testing-library/user-event';

describe('Convert', () => {
  it('should render the Convert component', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Convert />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    screen.getByLabelText('from');
    screen.getByLabelText('to');
    screen.getByLabelText('currency from');
    screen.getByLabelText('currency to');
    screen.getByTitle('switch');
  });

  it('should be able to change currencies', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Convert />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    expect(screen.getAllByAltText(/flag/)[0].parentNode?.textContent).toBe('EUR');
    expect(screen.getAllByAltText(/flag/)[1].parentNode?.textContent).toBe('GBP');

    userEvent.click(screen.getByAltText('GBP flag'));
    userEvent.click(screen.getByAltText('AUD flag'));

    expect(screen.queryByAltText('AUD flag')).toBeInTheDocument();
    expect(screen.queryByAltText('EUR flag')).toBeInTheDocument();
    expect(screen.queryByAltText('GBP flag')).not.toBeInTheDocument();

    userEvent.click(screen.getByAltText('EUR flag'));
    userEvent.click(screen.getByAltText('CAD flag'));

    expect(screen.queryByAltText('AUD flag')).toBeInTheDocument();
    expect(screen.queryByAltText('CAD flag')).toBeInTheDocument();
    expect(screen.queryByAltText('EUR flag')).not.toBeInTheDocument();
  });

  it('should be able to switch currencies', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Convert />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    expect(screen.getAllByAltText(/flag/)[0].parentNode?.textContent).toBe('EUR');
    expect(screen.getAllByAltText(/flag/)[1].parentNode?.textContent).toBe('GBP');

    userEvent.click(screen.getByTitle('switch'));

    expect(screen.getAllByAltText(/flag/)[0].parentNode?.textContent).toBe('GBP');
    expect(screen.getAllByAltText(/flag/)[1].parentNode?.textContent).toBe('EUR');
  });

  it('should not let the user type letters', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Convert />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    const fromInput = screen.getByLabelText('from');

    expect(fromInput).toHaveValue('');
    userEvent.type(fromInput, '0');
    expect(fromInput).toHaveValue('0');
    userEvent.clear(fromInput);
    userEvent.type(fromInput, '1.111');
    expect(fromInput).toHaveValue('1.111');
    userEvent.clear(fromInput);
    userEvent.type(fromInput, '2,3531');
    expect(fromInput).toHaveValue('2,3531');
    userEvent.clear(fromInput);
    userEvent.type(fromInput, 'dawefsgrdhtf');
    expect(fromInput).toHaveValue('');
  });

  it('should do correct exchange', () => {
    render(
      <MockUserProvider>
        <MockCurrencyProvider>
          <Convert />
        </MockCurrencyProvider>
      </MockUserProvider>,
    );

    const fromInput = screen.getByLabelText('from');
    const toInput = screen.getByLabelText('to');

    userEvent.type(fromInput, '123');
    expect(toInput).toHaveValue('136.5300');

    userEvent.clear(fromInput);
    userEvent.type(fromInput, '0.003');
    expect(toInput).toHaveValue('0.0033');

    userEvent.clear(toInput);
    userEvent.type(toInput, '4000');
    expect(fromInput).toHaveValue('3603.6036');

    userEvent.click(screen.getByAltText('EUR flag'));
    userEvent.click(screen.getByAltText('BGN flag'));

    expect(toInput).toHaveValue('3333.3333');

    userEvent.click(screen.getByAltText('GBP flag'));
    userEvent.click(screen.getByAltText('AUD flag'));

    expect(toInput).toHaveValue('1501.5015');
  });
});
