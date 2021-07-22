import './HomeNoMap.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

const HomeNoMap = ({ setCenter }) => {
  const [cpNoMap, setCpNoMap] = useState('');
  const handleChangeCp = (e) => {
    setCpNoMap(e.target.value);
    axios
      .get(
        `https://geo.api.gouv.fr/communes?codePostal=${e.target.value}&format=geojson`
      )
      .then((response) => {
        if (response.data.features.length) {
          const coord = {
            lat: response.data.features[0].geometry.coordinates[1],
            lng: response.data.features[0].geometry.coordinates[0],
          };
          setCenter({
            loaded: true,
            lat: coord.lat,
            lng: coord.lng,
          });
        }
      });
  };

  return (
    <div className="HomeNoMap">
      <p className="needLocation">
        Pour afficher la carte, veuillez autoriser la géolocalisation, ou
        renseignez un code postal.
      </p>
      <div className="needLocationInput">
        <span>Code postal : </span>
        <input
          className="inputCp"
          type="text"
          value={cpNoMap}
          onChange={handleChangeCp}
        />
      </div>
    </div>
  );
};

HomeNoMap.propTypes = {
  center: PropTypes.shape({
    loaded: PropTypes.bool,
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  setCenter: PropTypes.func,
};

HomeNoMap.defaultProps = {
  center: '',
  setCenter: '',
};

export default HomeNoMap;
