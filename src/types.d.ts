type User = {
  id: string;
  baseCurrency: string;
  savedCurrencies: string[];
  displayName: string;
  email?: string;
};

type ReactSelectOptionType = {
  value: string;
  label: any;
};

type Rates = { [key: string]: any };
type Symbols = { [key: string]: any };

type ConvertStateType = {
  rates: Rates;
  from: string;
  to: string;
  amountFrom: number;
  amountTo: number;
  fromInputText: string;
  toInputText: string;
};
