import React, { useState, useContext, useEffect } from 'react';
import style from './Home.module.scss';
import { UserContext } from '../../providers/UserProvider';
import Select from 'react-select';
import { firestore } from '../../firebase';
import formatOptionLabel from '../../formatOptionLabel';
import { ImSpinner8 } from 'react-icons/im';

const queueShowSwitchUp = (hold: number, next: number, start: number) => {
  setTimeout(() => {
    let time = 0;
    document.querySelectorAll('li').forEach(rateElement => {
      setTimeout(() => {
        rateElement.classList.add(style.showSwitchUp);
        setTimeout(() => rateElement.classList.remove(style.showSwitchUp), hold);
      }, time);
      time += next;
    });
  }, start);
};

const Home: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const [currencies, setCurrencies] = useState<ReactSelectOptionType[]>([]);
  const [rates, setRates] = useState<{ [index: string]: any }>({});
  const [isChangingBaseCurrency, setChangingBaseCurrency] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const setBaseCurrency = (option: ReactSelectOptionType | null) => {
    if (option) {
      firestore.doc(`users/${user?.id}`).update({
        baseCurrency: option.value,
      });
      setChangingBaseCurrency(false);
    }
  };

  useEffect(() => {
    fetch('https://cool-currency-convert-server.herokuapp.com/symbols')
      .then(res => res.json())
      .then(res => {
        setCurrencies(Object.keys(res).map(key => ({ value: key, label: `${key} (${res[key]})` })));
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://cool-currency-convert-server.herokuapp.com/rates?base=${user?.baseCurrency}`)
      .then(res => res.json())
      .then(res => setRates(res));
  }, [user?.baseCurrency]);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      queueShowSwitchUp(700, 80, 1000);
      setLoading(false);
    }
  }, [rates]);

  const getBaseCurrencyOptions = () => {
    return currencies
      .sort((a, b) => (user?.savedCurrencies.includes(a.value) ? -1 : 0))
      .filter(currency => currency.value !== user?.baseCurrency);
  };

  return (
    <div className={style.home}>
      <button className="btn" onClick={() => setChangingBaseCurrency(!isChangingBaseCurrency)}>
        {isChangingBaseCurrency ? 'Cancel' : 'Change base currency'}
      </button>
      {isChangingBaseCurrency && (
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="currency"
          options={getBaseCurrencyOptions()}
          onChange={option => setBaseCurrency(option)}
          formatOptionLabel={formatOptionLabel}
        />
      )}
      <h1>
        <img src={`${process.env.PUBLIC_URL}/assets/flags/${user?.baseCurrency}.png`} alt="" />1{' '}
        {user?.baseCurrency} =
      </h1>
      {isLoading && (
        <span className={style.loading}>
          <ImSpinner8 />
        </span>
      )}
      {!isLoading && (
        <ul>
          {Object.keys(rates)
            .sort((a, b) => (user?.savedCurrencies.includes(a) ? -1 : 0))
            .filter(currency => currency !== user?.baseCurrency)
            .map(currency => (
              <li key={currency}>
                <img src={`${process.env.PUBLIC_URL}/assets/flags/${currency}.png`} alt="" />
                {rates[currency].toFixed(3)} {currency}
                <span className={style.switchUp}>
                  1 {currency} = {(1 / rates[currency]).toFixed(3)} {user?.baseCurrency}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
