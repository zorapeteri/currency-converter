import React, { useState, useContext, useEffect } from 'react';
import style from './Home.module.scss';
import { UserContext } from '../../providers/UserProvider';
import { firestore } from '../../firebase';
import { ImSpinner8 } from 'react-icons/im';
import { CurrencyContext } from '../../providers/CurrencyProvider';
import CurrencySelect from '../CurrencySelect';

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
  const { rates } = useContext(CurrencyContext);

  const [baseCurrencyRates, setBaseCurrencyRates] = useState<Rates | null>(null);

  useEffect(() => {
    if (rates && user) {
      setBaseCurrencyRates(
        Object.keys(rates).reduce(
          (a, b) => ({ ...a, [b]: (1 / rates[user.baseCurrency]) * rates[b] }),
          {},
        ),
      );
    }
  }, [rates, user]);

  const [isChangingBaseCurrency, setChangingBaseCurrency] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (baseCurrencyRates) {
      queueShowSwitchUp(700, 80, 1000);
      setLoading(false);
    }
  }, [baseCurrencyRates]);

  if (!user) return null;

  return (
    <div className={style.home}>
      <button className="btn" onClick={() => setChangingBaseCurrency(!isChangingBaseCurrency)}>
        {isChangingBaseCurrency ? 'Cancel' : 'Change base currency'}
      </button>
      {isChangingBaseCurrency && (
        <CurrencySelect
          exclude={[user.baseCurrency]}
          prioritise={user.savedCurrencies}
          hideNames={false}
          onChange={baseCurrency => {
            firestore.doc(`users/${user?.id}`).update({ baseCurrency });
            setChangingBaseCurrency(false);
          }}
        />
      )}
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/assets/flags/${user.baseCurrency.toLowerCase()}.png`}
          alt={`${user.baseCurrency} flag`}
        />
        1 {user.baseCurrency} =
      </h1>
      {isLoading && (
        <span className={style.loading}>
          <ImSpinner8 />
        </span>
      )}
      {!isLoading && baseCurrencyRates && (
        <ul>
          {Object.keys(baseCurrencyRates)
            .sort((a, b) => (user?.savedCurrencies.includes(a) ? -1 : 0))
            .filter(currency => currency !== user?.baseCurrency)
            .map(currency => (
              <li key={currency}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/flags/${currency.toLowerCase()}.png`}
                  alt={`${currency} flag`}
                />
                {baseCurrencyRates[currency].toFixed(3)} {currency}
                <span className={style.switchUp}>
                  1 {currency} = {(1 / baseCurrencyRates[currency]).toFixed(3)} {user?.baseCurrency}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
