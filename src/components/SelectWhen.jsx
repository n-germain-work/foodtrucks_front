// CSS managed in Home.css
import PropTypes from 'prop-types';
import SwitchSelector from 'react-switch-selector';

const optionsWhen = [
  {
    label: 'Ce midi',
    value: 'thisLunch',
  },
  {
    label: 'Ce soir',
    value: 'thisDiner',
  },
  {
    label: 'Plus tard',
    value: 'later',
  },
];

const today = new Date();
const todayNumber = today.getDay();

const weekDaysNb = [];
const weekDays = [];

for (let i = 0; i < 6; i += 1) {
  const newDay = ((todayNumber + i) % 7) + 1;
  weekDaysNb.push(newDay);
  switch (newDay) {
    case 1:
      weekDays.push('lun');
      break;
    case 2:
      weekDays.push('mar');
      break;
    case 3:
      weekDays.push('mer');
      break;
    case 4:
      weekDays.push('jeu');
      break;
    case 5:
      weekDays.push('ven');
      break;
    case 6:
      weekDays.push('sam');
      break;
    case 7:
      weekDays.push('dim');
      break;
    default:
      break;
  }
}

const optionsDay = [
  {
    label: weekDays[0],
    value: weekDaysNb[0],
  },
  {
    label: weekDays[1],
    value: weekDaysNb[1],
  },
  {
    label: weekDays[2],
    value: weekDaysNb[2],
  },
  {
    label: weekDays[3],
    value: weekDaysNb[3],
  },
  {
    label: weekDays[4],
    value: weekDaysNb[4],
  },
  {
    label: weekDays[5],
    value: weekDaysNb[5],
  },
];

const optionsMeal = [
  {
    label: 'midi',
    value: 'lunch',
  },
  {
    label: 'soir',
    value: 'diner',
  },
];

function SelectWhen({ when, setWhen }) {
  const onChange = (newValue) => {
    if (typeof newValue === 'number') {
      setWhen({
        day: newValue,
        meal: when.meal,
      });
    } else if (newValue === 'later') {
      setWhen({
        day: weekDaysNb[0],
        meal: newValue,
      });
    } else if (newValue === 'thisLunch' || newValue === 'thisDiner') {
      setWhen({
        day: 0,
        meal: newValue,
      });
    } else {
      setWhen({
        day: when.day,
        meal: newValue,
      });
    }
  };

  return (
    <div className="SelectWhen">
      <p>C&apos;est pour manger quand ?</p>
      <div className="whenSelector">
        <SwitchSelector
          onChange={onChange}
          options={optionsWhen}
          initialSelectedIndex={0}
          backgroundColor="#e5e5e5"
          selectedBackgroundColor="#8cd41f"
          fontColor="#000000"
        />
      </div>
      <div className={when.day !== 0 ? 'laterSection show' : 'laterSection'}>
        <div className="weekDaySelector">
          <p>Quel jour alors ?</p>
          <div className="whenSelector">
            <SwitchSelector
              onChange={onChange}
              options={optionsDay}
              initialSelectedIndex={0}
              backgroundColor="#e5e5e5"
              selectedBackgroundColor="#8cd41f"
              fontColor="#000000"
            />
          </div>
        </div>
        <div className="mealSelector">
          <p>Quel jour alors ?</p>
          <div className="whenSelector">
            <SwitchSelector
              onChange={onChange}
              options={optionsMeal}
              initialSelectedIndex={0}
              backgroundColor="#e5e5e5"
              selectedBackgroundColor="#8cd41f"
              fontColor="#000000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SelectWhen.propTypes = {
  when: PropTypes.shape({
    day: PropTypes.number,
    meal: PropTypes.string,
  }),
  setWhen: PropTypes.func,
};

SelectWhen.defaultProps = {
  when: '',
  setWhen: '',
};

export default SelectWhen;
