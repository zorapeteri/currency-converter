const inputToFloat = (text: string) => parseFloat(text.replace(',', '.').replace(/\s/gi, '')) || 0;
const filterInput = (text: string) => text.replace(/([^\d|,|.])/gi, '');

const reducer = (state: ConvertStateType, action: { type: string; payload?: any }) => {
  if (action.type === 'SET_RATES') {
    return {
      ...state,
      rates: action.payload,
    };
  }

  if (action.type === 'SET_CURRENCIES') {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === 'FROM_CHANGE') {
    const newRateBase = 1 / state.rates[action.payload];
    const newRates = Object.keys(state.rates).reduce(
      (a, b) => ({ ...a, [b]: newRateBase * state.rates[b] }),
      {},
    );
    const newAmountTo =
      state.amountFrom * (newRates as { [index: string]: any })[state.to as string];
    return {
      ...state,
      from: action.payload,
      rates: newRates,
      amounTo: newAmountTo,
      toInputText: newAmountTo ? newAmountTo.toFixed(4) : '',
    };
  }

  if (action.type === 'TO_CHANGE') {
    const newAmountTo =
      state.amountFrom * (state.rates as { [index: string]: any })[action.payload as string];

    return {
      ...state,
      to: action.payload,
      amounTo: newAmountTo,
      toInputText: newAmountTo ? newAmountTo.toFixed(4) : '',
    };
  }

  if (action.type === 'SWITCH') {
    const newRateBase = 1 / state.rates[state.to];
    const newRates = Object.keys(state.rates).reduce(
      (a, b) => ({ ...a, [b]: newRateBase * state.rates[b] }),
      {},
    );

    return {
      ...state,
      rates: newRates,
      from: state.to,
      to: state.from,
      amountFrom: state.amountTo,
      amountTo: state.amountFrom,
      fromInputText: state.toInputText,
      toInputText: state.fromInputText,
    };
  }

  if (action.type === 'AMOUNT_FROM_CHANGE') {
    const filteredInput = filterInput(action.payload);
    const payloadToFloat = inputToFloat(filteredInput);
    const newAmountTo = payloadToFloat * state.rates[state.to];

    return {
      ...state,
      amountFrom: payloadToFloat,
      amountTo: newAmountTo,
      toInputText: newAmountTo ? newAmountTo.toFixed(4) : '',
      fromInputText: filteredInput,
    };
  }

  if (action.type === 'AMOUNT_TO_CHANGE') {
    const filteredInput = filterInput(action.payload);
    const payloadToFloat = inputToFloat(filteredInput);
    const newAmountFrom = payloadToFloat / state.rates[state.to];

    return {
      ...state,
      amountTo: payloadToFloat,
      amountFrom: newAmountFrom,
      fromInputText: newAmountFrom ? newAmountFrom.toFixed(4) : '',
      toInputText: filteredInput,
    };
  }
};

export default reducer;
