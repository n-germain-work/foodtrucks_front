import './HomeSearch.css';
import PropTypes from 'prop-types';
import distance from '../scripts/distanceCalculator';

const HomeSearch = ({ trucks, center, where }) => {
  const showInMapClicked = (lon, lat) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${lon},${lat}`
    );
  };
  return (
    <div className="HomeSearch">
      {trucks.length &&
        trucks
          .filter(
            (truck) =>
              where.value === 'cp' ||
              distance(
                truck.longitude,
                truck.latitude,
                center.lat,
                center.lng
              ) /
                1000 <=
                where.value
          )
          .map((truck) => (
            <div className="truckLabel">
              <h3>{truck.name}</h3>
              <p>Spécialité : {truck.type}</p>
              <p>
                Horaires :{' '}
                {truck.start.length === 2 ? `${truck.start}:00` : truck.start} -{' '}
                {truck.end.length === 2 ? `${truck.end}:00` : truck.end}
              </p>
              <p>Téléphone : {truck.phone}</p>
              <div className="popupBtns">
                <button type="button" className="phoneBtn">
                  <a href={`tel:${truck.phone}`}>&#9742;</a>
                </button>
                <button
                  className="btnMaps"
                  type="button"
                  onClick={() =>
                    showInMapClicked(truck.longitude, truck.latitude)
                  }
                >
                  &#8663;
                </button>
              </div>
              <p>
                {distance(
                  truck.longitude,
                  truck.latitude,
                  center.lat,
                  center.lng
                ) / 1000}
              </p>
            </div>
          ))}
    </div>
  );
};

HomeSearch.propTypes = {
  trucks: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      end: PropTypes.string,
      id: PropTypes.number,
      latitude: PropTypes.string,
      longitude: PropTypes.string,
      meal: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      postal_code: PropTypes.string,
      sale_point_id: PropTypes.number,
      start: PropTypes.string,
      truck_id: PropTypes.number,
      type: PropTypes.string,
      weekday: PropTypes.string,
    })
  ),
  center: PropTypes.shape({
    loaded: PropTypes.bool,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  where: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cp: PropTypes.string,
  }),
};

HomeSearch.defaultProps = {
  trucks: '',
  center: '',
  where: '',
};

export default HomeSearch;
