import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { CurrencyContext } from '../../providers/CurrencyProvider';

type CurrencySelectProps = {
  prioritise: string[];
  hideNames: boolean;
  exclude: string[];
  onChange: (currency: string) => void;
  value?: string;
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
};

const formatOptionLabel = ({ value, label }: ReactSelectOptionType) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      style={{ width: '1.8em', marginRight: '1em' }}
      src={`${process.env.PUBLIC_URL}/assets/flags/${value.toLowerCase()}.png`}
      alt={`${value} flag`}
    ></img>
    <div>{label}</div>
  </div>
);

const getOptions = ({
  symbols,
  exclude,
  prioritise,
  hideNames,
}: {
  symbols: Symbols;
  exclude: string[];
  prioritise: string[];
  hideNames: boolean;
}) => {
  return Object.keys(symbols)
    .filter(key => !exclude.includes(key))
    .sort((a, b) => (prioritise.includes(a) ? -1 : 0))
    .map(key => ({ value: key, label: `${key}${hideNames ? '' : ` (${symbols[key]})`}` }));
};

const CurrencySelect: React.FunctionComponent<CurrencySelectProps> = (
  props: CurrencySelectProps,
) => {
  const {
    prioritise,
    hideNames,
    exclude,
    onChange,
    value,
    defaultValue,
    ariaLabel,
    className,
  } = props;
  const { symbols } = useContext(CurrencyContext);
  const [options, setOptions] = useState<ReactSelectOptionType[] | null>(
    symbols ? getOptions({ symbols, hideNames, exclude, prioritise }) : [],
  );

  useEffect(() => {
    if (symbols) {
      setOptions(getOptions({ symbols, hideNames, exclude, prioritise }));
    }
  }, [symbols, exclude, hideNames, prioritise]);

  if (!options) return <h1>{JSON.stringify({ symbols, options })}</h1>;

  return (
    <Select
      className={`basic-single ${className}`}
      classNamePrefix="select"
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={true}
      name="currency"
      options={options}
      formatOptionLabel={formatOptionLabel}
      value={options.find(option => option.value === value)}
      defaultValue={options.find(option => option.value === defaultValue)}
      aria-label={ariaLabel}
      onChange={option => {
        if (option) onChange(option.value);
      }}
    />
  );
};

export default CurrencySelect;
