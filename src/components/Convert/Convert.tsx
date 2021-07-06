import React, { useState, useEffect, useContext, useReducer } from 'react';
import convertReducer from '../../reducers/convertReducer';
import style from './Convert.module.scss';
import { UserContext } from '../../providers/UserProvider';
import { MdSwapHoriz } from 'react-icons/md';
import { CurrencyContext } from '../../providers/CurrencyProvider';
import CurrencySelect from '../CurrencySelect';

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
  const { rates } = useContext(CurrencyContext);

  const [isLoading, setLoading] = useState(true);
  const [convertState, dispatch] = useReducer(convertReducer, initialConvertState);

  useEffect(() => {
    if (rates && user) {
      dispatch({
        type: 'SET_RATES',
        payload: Object.keys(rates).reduce(
          (a, b) => ({ ...a, [b]: (1 / rates[user.baseCurrency]) * rates[b] }),
          {},
        ),
      });

      dispatch({
        type: 'SET_CURRENCIES',
        payload: {
          from: user.baseCurrency || 'EUR',
          to: getDefaultTo(user),
        },
      });

      setLoading(false);
    }
  }, [user, rates]);

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
        <CurrencySelect
          className="convertCurrencySelect"
          exclude={[]}
          prioritise={user?.savedCurrencies || []}
          hideNames={true}
          value={convertState.from}
          onChange={value => {
            if (value === convertState.to) {
              dispatch({ type: 'SWITCH' });
            } else {
              dispatch({ type: 'FROM_CHANGE', payload: value });
            }
          }}
          ariaLabel="from"
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
        <CurrencySelect
          className="convertCurrencySelect"
          exclude={[]}
          prioritise={user?.savedCurrencies || []}
          hideNames={true}
          value={convertState.to}
          onChange={value => {
            if (value === convertState.from) {
                dispatch({ type: 'SWITCH' });
              } else {
                dispatch({ type: 'TO_CHANGE', payload: value });
              }
          }}
          ariaLabel="to"
        />
      </div>
    </div>
  );
};

export default Convert;
