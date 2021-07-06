import React from 'react';
import CurrencySelect from '../CurrencySelect';

type BaseCurrencyProps = {
  baseCurrency: string;
  onChange: (value: string) => void;
};;

const BaseCurrency: React.FunctionComponent<BaseCurrencyProps> = (props: BaseCurrencyProps) => {
  const { baseCurrency, onChange } = props;

  return (
    <div className="roundedContainer">
      <strong>Your base currency</strong>
      <CurrencySelect
        exclude={[]}
        prioritise={[]}
        hideNames={false}
        defaultValue={baseCurrency}
        onChange={onChange}
      />
    </div>
  );
};

export default BaseCurrency;

             
             
           
             
             
           
             
             
           