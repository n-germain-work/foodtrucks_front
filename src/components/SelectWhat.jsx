/* eslint-disable no-unused-vars */
// CSS managed in Home.css
import PropTypes from 'prop-types';

const optionsWhat = [
  'indécis',
  'burger',
  'farine',
  'pasta',
  'pizza',
  'tacos',
  'vegan',
];

function SelectWhat({ what, setWhat }) {
  const handleWhatChange = (e) => {
    setWhat(e.target.value);
  };

  return (
    <div className="SelectWhat">
      <span>Une envie particulière ? </span>
      <select className="listWhat" value={what} onChange={handleWhatChange}>
        {optionsWhat.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

SelectWhat.propTypes = {
  what: PropTypes.string,
  setWhat: PropTypes.func,
};

SelectWhat.defaultProps = {
  what: '',
  setWhat: '',
};

export default SelectWhat;
