import rocketIcon from "../../assets/logos/rocket.png";
import { useState } from "react";
import "./Header.scss";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        });
    } else {
      setErrorMessage("Please Install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    localStorage.setItem("defaultAccount", defaultAccount);
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);
  // Changing burger classes
  const [burgerClass, setBurgerClass] = useState("menu-btn");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIsClicked, setMenuIsClicked] = useState(false);

  // toggle functionality
  const updateMenu = (e) => {
    e.preventDefault();
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
      <section className='header'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={rocketIcon} alt='Rocket icon' />
          </Link>
        </div>
        <div className='header__button'>
          <div className='header__button-container'>
            <p onClick={connectWalletHandler}>{connButtonText}</p>
          </div>
        </div>
        <nav>
          <div className={burgerClass}>
            <div className='menu-btn__burger' onClick={updateMenu}></div>
          </div>
        </nav>
      </section>
      <section className='login'>
        <div className='login__display'>
          <h3 className='login__account'>
            {/* Your address: */}
            {defaultAccount}
          </h3>
        </div>
        {errorMessage}
      </section>
      <section className={menuClass}>
        <Menu updateMenu={updateMenu} />
      </section>
    </>
  );
};

export default Header;
