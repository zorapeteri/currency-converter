import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { firestore } from '../../firebase';
import Select from 'react-select';
import formatOptionLabel from '../../formatOptionLabel';

const BaseCurrency: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const [currencies, setCurrencies] = useState<ReactSelectOptionType[]>([]);

  useEffect(() => {
    fetch('https://cool-currency-convert-server.herokuapp.com/symbols')
      .then(res => res.json())
      .then(res => {
        setCurrencies(Object.keys(res).map(key => ({ value: key, label: `${key} (${res[key]})` })));
      });
  }, []);

  const onChange = (option: ReactSelectOptionType | null) => {
    if (option) {
      firestore.collection('users').doc(user?.id).update({ baseCurrency: option.value });
    }
  };

  return (
    <div className="roundedContainer">
      <strong>Your base currency</strong>
      {currencies.length && (
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="currency"
          width="400px"
          formatOptionLabel={formatOptionLabel}
          defaultValue={currencies.find(option => option.value === user?.baseCurrency)}
          options={currencies}
          onChange={option => onChange(option)}
        />
      )}
    </div>
  );
};

export default BaseCurrency;
