import React, { useState, useContext } from 'react';
import style from './SavedCurrencies.module.scss';
import CurrencySelect from '../CurrencySelect';
import { CurrencyContext } from '../../providers/CurrencyProvider';

type SavedCurrenciesProps = {
  savedCurrencies: string[],
  updateSavedCurrencies: (arg: string[]) => void;
}

const SavedCurrencies: React.FunctionComponent<SavedCurrenciesProps> = (props: SavedCurrenciesProps) => {
  const { symbols } = useContext(CurrencyContext);

  const [savedCurrencies, setSavedCurrencies] = useState<string[]>(props.savedCurrencies || []);
  const [isAddingCurrency, setAddingCurrency] = useState<boolean>(false);

  const removeSavedCurrency = (currency: string) => {
    setSavedCurrencies((prev) => {
      const removed = prev.filter(savedCurrency => savedCurrency !== currency);
      props.updateSavedCurrencies(removed);
      return removed;
    })
  };

  const addSavedCurrency = (currency: string) => {
    setSavedCurrencies((prev) => {
      props.updateSavedCurrencies([...prev, currency]);
      return [...prev, currency];
    });
  };

  return (
    <div className={`roundedContainer ${style.savedCurrencies} `}>
      <strong>Your saved currencies</strong>
      <button className="btn" onClick={() => setAddingCurrency(!isAddingCurrency)}>
        {isAddingCurrency ? 'Cancel' : 'Add currency'}
      </button>
      {isAddingCurrency && (
        <CurrencySelect
          exclude={savedCurrencies}
          prioritise={[]}
          hideNames={false}
          onChange={value => {
            addSavedCurrency(value);
            setAddingCurrency(false);
          }}
        />
      )}
      <ul>
        {savedCurrencies.map(currency => (
          <li key={currency}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/flags/${currency.toLowerCase()}.png`}
              alt=""
            />
            <span>{symbols && `${currency} (${symbols[currency]})`}</span>
            <button className="btn" onClick={() => removeSavedCurrency(currency)} aria-label={`remove ${currency} from saved currencies`}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCurrencies;
