import './Header.css';
import logo from '../images/logoFoodTruck.jpg';

const Header = () => {
  return (
    <div className="Header">
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
};

export default Header;
