import React, { useState, useEffect, useContext } from 'react';
import style from './SavedCurrencies.module.scss';
import { firestore } from '../../firebase';
import Select from 'react-select';
import { UserContext } from '../../providers/UserProvider';
import formatOptionLabel from '../../formatOptionLabel';

const SavedCurrencies: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const [allCurrencies, setAllCurrencies] = useState<ReactSelectOptionType[]>([]);
  const [savedCurrencies, setSavedCurrencies] = useState<string[]>(user?.savedCurrencies || []);
  const [isAddingCurrency, setAddingCurrency] = useState<boolean>(false);

  const removeSavedCurrency = (currency: string) => {
    setSavedCurrencies(savedCurrencies.filter(savedCurrency => savedCurrency !== currency));
  };

  const addSavedCurrency = (currency: string) => {
    setSavedCurrencies([...savedCurrencies, currency]);
  };

  useEffect(() => {
    fetch('https://cool-currency-convert-server.herokuapp.com/symbols')
      .then(res => res.json())
      .then(res => {
        setAllCurrencies(
          Object.keys(res).map(key => ({ value: key, label: `${key} (${res[key]})` })),
        );
      });
  }, []);

  useEffect(() => {
    if (savedCurrencies !== user?.savedCurrencies) {
      firestore.doc(`users/${user?.id}`).update({
        savedCurrencies,
      });
    }
  }, [savedCurrencies, user]);

  const onChange = (option: ReactSelectOptionType | null) => {
    if (option) {
      addSavedCurrency(option.value);
      setAddingCurrency(false);
    }
  };

  return (
    <div className={`roundedContainer ${style.savedCurrencies} `}>
      <strong>Your saved currencies</strong>
      <button className="btn" onClick={() => setAddingCurrency(!isAddingCurrency)}>
        {isAddingCurrency ? 'Cancel' : 'Add currency'}
      </button>
      {isAddingCurrency && (
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          formatOptionLabel={formatOptionLabel}
          name="currency"
          width="400px"
          options={allCurrencies.filter(currency => !savedCurrencies.includes(currency.value))}
          onChange={option => onChange(option)}
        />
      )}
      <ul>
        {savedCurrencies.map(currency => (
          <li key={currency}>
            <img src={`${process.env.PUBLIC_URL}/assets/flags/${currency.toLowerCase()}.png`} alt="" />
            <span>{allCurrencies.find(option => option.value === currency)?.label}</span>
            <button className="btn" onClick={() => removeSavedCurrency(currency)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCurrencies;
