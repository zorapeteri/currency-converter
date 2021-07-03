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

type ConvertStateType = {
  rates: any;
  from: string;
  to: string;
  amountFrom: number;
  amountTo: number;
  fromInputText: string;
  toInputText: string;
};