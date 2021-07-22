import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="links">
        <a href="mailto:zen-chan@hotmail.fr">Me contacter</a>
        <a
          href="https://fr.wikipedia.org/wiki/Camion-restaurant"
          target="_blank"
          rel="noreferrer"
        >
          Kezako foodtruck ?
        </a>
        <a
          href="https://github.com/n-germain-work/foodtrucks_front"
          target="_blank"
          rel="noreferrer"
        >
          Github front-end
        </a>
        <a
          href="https://github.com/n-germain-work/foodtrucks_back"
          target="_blank"
          rel="noreferrer"
        >
          Github back-end
        </a>
      </div>
      <p>Tous droits réservés à moi :D</p>
    </div>
  );
};

export default Footer;
