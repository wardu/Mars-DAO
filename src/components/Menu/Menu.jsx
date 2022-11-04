import "./Menu.scss";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <ul className='menu-top'>
        <li>
          <Link to='/polling'>Polling</Link>
        </li>

        <li>
          <Link to='/forum'>Forum</Link>
        </li>
      </ul>
      <ul className='menu-bottom'>
        <div className='menu-bottom__left'>
          <li>Account</li>
          <li>Gwei</li>
          <li>Support</li>
        </div>
        <div className='menu-bottom__right'>
          <li>Stats</li>
          <li>FAQs</li>
          <li>Light mode</li>
        </div>
      </ul>
    </>
  );
};

export default Menu;
