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
  'viande',
];

function HomeSelectWhat({ what, setWhat }) {
  const handleWhatChange = (e) => {
    setWhat(e.target.value);
  };

  return (
    <div className="HomeSelectWhat">
      <span>Une envie particulière ? </span>
      <select className="listWhat" value={what} onChange={handleWhatChange}>
        {optionsWhat.map((option, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

HomeSelectWhat.propTypes = {
  what: PropTypes.string,
  setWhat: PropTypes.func,
};

HomeSelectWhat.defaultProps = {
  what: '',
  setWhat: '',
};

export default HomeSelectWhat;
