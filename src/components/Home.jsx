import { useState } from 'react';
import './Home.css';
import SelectWhat from './SelectWhat';
import SelectWhen from './SelectWhen';
import SelectWhere from './SelectWhere';

const Home = () => {
  const [when, setWhen] = useState({ day: 0, meal: 'lunch' });
  const [where, setWhere] = useState({
    value: 2,
    cp: '',
  });
  const [what, setWhat] = useState('Indécis');

  return (
    <div className="Home">
      <h3>Évitons les fioritures, place à la garniture !</h3>
      <SelectWhen when={when} setWhen={setWhen} />
      <SelectWhere where={where} setWhere={setWhere} />
      <SelectWhat what={what} setWhat={setWhat} />
      <div className="where" />
      <div className="what" />
      <div className="map" />
      <div className="search" />
    </div>
  );
};

export default Home;
