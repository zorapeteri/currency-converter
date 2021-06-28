import React from 'react';
import style from './Loading.module.scss';
import { FcCurrencyExchange } from 'react-icons/fc';

const Loading: React.FunctionComponent = () => {
  return (
    <div className={style.loading}>
      <FcCurrencyExchange />
    </div>
  );
};

export default Loading;
