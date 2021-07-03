const formatOptionLabel = ({ value, label }: ReactSelectOptionType) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      style={{ width: '1.8em', marginRight: '1em' }}
      src={`${process.env.PUBLIC_URL}/assets/flags/${value}.png`}
      alt=""
    ></img>
    <div>{label}</div>
  </div>
);

export default formatOptionLabel;
