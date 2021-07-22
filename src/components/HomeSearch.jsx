import './HomeSearch.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import distance from '../scripts/distanceCalculator';

const HomeSearch = ({ trucks, center, where }) => {
  const [trucksWithDistance, setTrucksWithDistance] = useState('');

  function sortByDistance(array) {
    return array.sort((a, b) => {
      const x = +a.distance;
      const y = +b.distance;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (trucks.length) {
      const temp = trucks.map((truck) => ({
        ...truck,
        distance: (
          distance(truck.longitude, truck.latitude, center.lat, center.lng) /
          1000
        ).toFixed(1),
      }));
      sortByDistance(temp);
      setTrucksWithDistance(temp);
    }
  }, [trucks, center, where]);

  const showInMapClicked = (lon, lat) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${lon},${lat}`
    );
  };
  return (
    <div className="HomeSearch">
      {trucksWithDistance.length &&
        trucksWithDistance
          .filter(
            (truck) => where.value === 'cp' || truck.distance <= where.value
          )
          .map((truck) => (
            <div className="truckLabel">
              <div className="labelType">
                <img
                  src={(() => {
                    switch (truck.type) {
                      case 'burger':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
                      case 'farine':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png';
                      case 'pasta':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png';
                      case 'pizza':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
                      case 'tacos':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png';
                      case 'vegan':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
                      case 'viande':
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';
                      default:
                        return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
                    }
                  })()}
                  alt="marker"
                  className="labelMarker"
                />
                {truck.type}
              </div>
              <div className="labelData">
                <div className="labelDataTop">
                  <h4>{truck.name}</h4>
                  <div>
                    <span className="hideOnPhone">Horaires : </span>
                    <span>
                      {truck.start.length === 2
                        ? `${truck.start}:00`
                        : truck.start}{' '}
                      - {truck.end.length === 2 ? `${truck.end}:00` : truck.end}
                    </span>
                  </div>
                </div>
                <div className="labelDataBottom">
                  <div>
                    <span className="hideOnPhone">Téléphone : </span>
                    <span>{truck.phone}</span>
                  </div>
                  <p>
                    {truck.distance}
                    {' km'}
                  </p>
                </div>
              </div>

              <div className="labelButtons">
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
