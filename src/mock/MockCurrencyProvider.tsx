import React from 'react';
import { CurrencyContext } from '../providers/CurrencyProvider';

const mockSymbols = {
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
};

const mockRates = {
  AUD: 0.5,
  BGN: 1.2,
  BRL: 1.5,
  CAD: 2,
  CHF: 20,
  CNY: 300,
  CZK: 0.0081,
  DKK: 0.01,
  EUR: 1,
  GBP: 1.11,
  HKD: 150,
};

const MockCurrencyProvider: React.FunctionComponent<{ children: any }> = (props: {
  children: any;
}) => {
  return (
    <CurrencyContext.Provider value={{ rates: mockRates, symbols: mockSymbols }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default MockCurrencyProvider;
