/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-console */
import './HomeMap.css';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import distance from '../scripts/distanceCalculator';

const orangeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blackIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const goldIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const violetIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HomeMap = ({ trucks, center, where }) => {
  const showInMapClicked = (lon, lat) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${lon},${lat}`
    );
  };

  return (
    <div className="HomeMap">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>Là où se trouvent tes pieds ^^</Popup>
        </Marker>
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
            .map((truck) => {
              return (
                <Marker
                  position={[truck.longitude, truck.latitude]}
                  icon={(() => {
                    switch (truck.type) {
                      case 'burger':
                        return orangeIcon;
                      case 'farine':
                        return blackIcon;
                      case 'pasta':
                        return yellowIcon;
                      case 'pizza':
                        return redIcon;
                      case 'tacos':
                        return goldIcon;
                      case 'vegan':
                        return greenIcon;
                      case 'viande':
                        return violetIcon;
                      default:
                        return blueIcon;
                    }
                  })()}
                >
                  <Popup>
                    <div className="truckPopup">
                      <h2>{truck.name}</h2>
                      <p>Spécialité : {truck.type}</p>
                      <p>
                        Horaires :{' '}
                        {truck.start.length === 2
                          ? `${truck.start}:00`
                          : truck.start}{' '}
                        -{' '}
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
                    </div>
                  </Popup>
                </Marker>
              );
            })}
      </MapContainer>
    </div>
  );
};

HomeMap.propTypes = {
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

HomeMap.defaultProps = {
  trucks: '',
  center: '',
  where: '',
};

export default HomeMap;
