import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import HomeMap from './HomeMap';
import HomeSearch from './HomeSearch';
import HomeSelectWhat from './HomeSelectWhat';
import HomeSelectWhen from './HomeSelectWhen';
import HomeSelectWhere from './HomeSelectWhere';
import HomeNoMap from './HomeNoMap';

require('dotenv').config({ path: '../../.env' });

const today = new Date();
const todayNumber = today.getDay();
const nowHours = today.getHours();

let initMeal = '';

if (nowHours < 15) {
  initMeal = 'thisLunch';
} else if (nowHours < 23) {
  initMeal = 'thisDiner';
} else {
  initMeal = 'later';
}

const Home = () => {
  const [when, setWhen] = useState({ day: 0, meal: initMeal });
  const [where, setWhere] = useState({
    value: 2,
    cp: '',
  });
  const [what, setWhat] = useState('indécis');
  const [trucks, setTrucks] = useState('');

  const [center, setCenter] = useState({
    loaded: false,
    lat: '',
    lng: '',
  });

  // GEOLOCALISATION
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 27000,
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCenter({
            loaded: true,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function b(error) {
          // eslint-disable-next-line no-console
          console.error(`error ${error.code} ${error.message}`);
        },
        options
      );
    }
  }, []);

  useEffect(() => {
    axios
      // Adresse en dur car difficulté pour héberger sur Netlify et Heroku
      // .post(`${process.env.REACT_APP_BACKEND_URL}/api/trucks/filter`, {
      .post(`https://foodtruckback.herokuapp.com/api/trucks/filter`, {
        type: what === 'indécis' ? '' : what,
        cp: where.cp,
        weekday: when.day ? when.day : todayNumber,
        meal: when.meal.includes('unch') ? 'm' : 'd',
      })
      .then((response) => response.data)
      .then((data) => setTrucks(data.result));
  }, [when, where, what]);

  return (
    <div className="Home">
      <h3>Évitons les fioritures, place à la garniture !</h3>
      <HomeSelectWhen when={when} setWhen={setWhen} />
      <HomeSelectWhere where={where} setWhere={setWhere} />
      <HomeSelectWhat what={what} setWhat={setWhat} />
      {center.loaded ? (
        <HomeMap trucks={trucks} center={center} where={where} />
      ) : (
        <HomeNoMap center={center} setCenter={setCenter} />
      )}
      <HomeSearch trucks={trucks} center={center} where={where} />
    </div>
  );
};

export default Home;
