import rocketIcon from "../../assets/logos/rocket.png";
import { useState } from "react";
import "./Header.scss";

const Header = () => {
  // Changing burger classes
  const [burgerClass, setBurgerClass] = useState("menu-btn");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIsClicked, setMenuIsClicked] = useState(false);

  // toggle functionality
  const updateMenu = () => {
    if (!menuIsClicked) {
      setBurgerClass("menu-btn clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("menu-btn");
      setMenuClass("menu hidden");
    }
    setMenuIsClicked(!menuIsClicked);
  };

  return (
    <>
      <section className="header">
        <div className="header__logo">
          <img src={rocketIcon} alt="Rocket icon" />
        </div>
        <div className="header__button">
          <div className="header__button-container">
            <p>Connect Wallet</p>
          </div>
        </div>
        <nav>
          <div className={burgerClass}>
            <div className="menu-btn__burger" onClick={updateMenu}></div>
          </div>
        </nav>
      </section>
      <section className={menuClass}></section>
    </>
  );
};

export default Header;
