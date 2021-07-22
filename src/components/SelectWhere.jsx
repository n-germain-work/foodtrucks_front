// CSS managed in Home.css
import PropTypes from 'prop-types';
import SwitchSelector from 'react-switch-selector';

const optionsWhere = [
  {
    label: '< 2km',
    value: 2,
  },
  {
    label: '< 5km',
    value: 5,
  },
  {
    label: 'Code postal',
    value: 'cp',
  },
];

function SelectWhere({ where, setWhere }) {
  const onChange = (newValue) => {
    setWhere({
      value: newValue,
      cp: '',
    });
  };

  const handleChangeCp = (e) => {
    setWhere({
      value: where.value,
      cp: e.target.value,
    });
  };

  return (
    <div className="SelectWhere">
      <p>Dans quel coin ?</p>
      <div className="whereSelector">
        <SwitchSelector
          onChange={onChange}
          options={optionsWhere}
          initialSelectedIndex={0}
          backgroundColor="#e5e5e5"
          selectedBackgroundColor="#8cd41f"
          fontColor="#000000"
        />
      </div>
      <div className={where.value === 'cp' ? 'whereCp show' : 'whereCp'}>
        <span>Ah ? Lequel ? </span>
        <input
          className="inputCp"
          type="text"
          value={where.cp}
          onChange={handleChangeCp}
        />
      </div>
    </div>
  );
}

SelectWhere.propTypes = {
  where: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  setWhere: PropTypes.func,
};

SelectWhere.defaultProps = {
  where: '',
  setWhere: '',
};

export default SelectWhere;
