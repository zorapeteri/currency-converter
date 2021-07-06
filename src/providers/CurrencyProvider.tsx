import React, { useState, useEffect, createContext } from 'react';

type CurrencyContextType = {
  rates: Rates | null;
  symbols: Symbols | null;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  rates: null,
  symbols: null,
});

const host = 'https://cool-currency-convert-server.herokuapp.com';

const CurrencyProvider: React.FunctionComponent<{ children: any }> = (props: { children: any }) => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [symbols, setSymbols] = useState<Symbols | null>(null);

  useEffect(() => {
    fetch(`${host}/symbols`)
      .then(res => res.json())
      .then(res => {
        setSymbols(res);
      });

    fetch(`${host}/rates`)
      .then(res => res.json())
      .then(res => {
        setRates(res);
      });
  }, []);

  return (
    <CurrencyContext.Provider value={{ rates, symbols }}>{props.children}</CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
