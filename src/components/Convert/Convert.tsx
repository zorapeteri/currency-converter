import React, { useState, useEffect, useContext, useReducer } from 'react';
import convertReducer from '../../reducers/convertReducer';
import style from './Convert.module.scss';
import Select from 'react-select';
import { UserContext } from '../../providers/UserProvider';
import { MdSwapHoriz } from 'react-icons/md';
import formatOptionLabel from '../../formatOptionLabel';

const getDefaultTo = (user: User | null) => {
  if (user) {
    if (user.savedCurrencies.length) {
      if (user.baseCurrency === user.savedCurrencies[0]) {
        if (user.savedCurrencies[1]) return user.savedCurrencies[1];
        return user.baseCurrency === 'EUR' ? 'USD' : 'EUR';
      }
      return user.savedCurrencies[0];
    }
    return user.baseCurrency === 'EUR' ? 'USD' : 'EUR';
  }
  return 'USD';
};

const initialConvertState: ConvertStateType = {
  rates: {},
  from: 'EUR',
  to: 'USD',
  amountFrom: 0,
  amountTo: 0,
  toInputText: '',
  fromInputText: '',
};

const Convert: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<ReactSelectOptionType[]>([]);
  const [convertState, dispatch] = useReducer(convertReducer, initialConvertState);

  useEffect(() => {
    fetch(`https://cool-currency-convert-server.herokuapp.com/rates?base=${user?.baseCurrency || 'EUR'}`)
      .then(res => res.json())
      .then(res => {
        setCurrencies(Object.keys(res).map(key => ({ value: key, label: key })));
        dispatch({ type: 'SET_RATES', payload: res });
        setLoading(false);
      });

    dispatch({
      type: 'SET_CURRENCIES',
      payload: {
        from: user?.baseCurrency || 'EUR',
        to: getDefaultTo(user),
      },
    });
  }, [user]);

  if (isLoading) return null;

  return (
    <div className={style.convert}>
      <div className={style.container}>
        <input
          type="text"
          aria-label="from"
          placeholder="0"
          value={convertState.fromInputText}
          onChange={e => dispatch({ type: 'AMOUNT_FROM_CHANGE', payload: e.target.value })}
          autoFocus={true}
        />
        <Select
          className="basic-single convertCurrencySelect"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="currency"
          value={currencies.find(option => option.value === convertState.from)}
          onChange={option => {
            if (option) {
              if (option.value === convertState.to) {
                dispatch({ type: 'SWITCH' });
              } else {
                dispatch({ type: 'FROM_CHANGE', payload: option.value });
              }
            }
          }}
          options={currencies.filter(currency => currency.value !== convertState.from)}
          aria-label="from"
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <button title="switch" onClick={() => dispatch({ type: 'SWITCH' })}>
        <MdSwapHoriz />
      </button>
      <div className={style.container}>
        <input
          type="text"
          aria-label="to"
          placeholder="0"
          value={convertState.toInputText}
          onChange={e => dispatch({ type: 'AMOUNT_TO_CHANGE', payload: e.target.value })}
        />
        <Select
          className="basic-single convertCurrencySelect"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="currency"
          value={currencies.find(option => option.value === convertState.to)}
          onChange={option => {
            if (option) {
              if (option.value === convertState.from) {
                dispatch({ type: 'SWITCH' });
              } else {
                dispatch({ type: 'TO_CHANGE', payload: option.value });
              }
            }
          }}
          options={currencies.filter(currency => currency.value !== convertState.to)}
          aria-label="to"
          formatOptionLabel={formatOptionLabel}
        />
      </div>
    </div>
  );
};

export default Convert;
