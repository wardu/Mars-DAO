import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

import "./Footer.scss";

import twitterIcon from "../../assets/icons/twitter.svg";
import githubIcon from "../../assets/icons/github.svg";
import rocketIcon from "../../assets/logos/rocket.png";

const Footer = () => {
  const myTwitterProfile = "https://twitter.com/_wardu";
  const myGithubProfile = "https://github.com/wardu";
  return (
    <section className='footer'>
      <div className='footer__title'>
        <h2>Contact for more development and UX</h2>
      </div>
      <section className='footer__lower'>
        <div className='footer__socials'>
          <ExternalLink href={myTwitterProfile}>
            <img src={twitterIcon} alt='Twitter Icon' />
          </ExternalLink>
          <ExternalLink href={myGithubProfile}>
            <img src={githubIcon} alt='Github Icon' />
          </ExternalLink>
        </div>
        <div className='footer__logo'>
          <Link to='/'>
            <img src={rocketIcon} alt='A rocket Icon' />
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Footer;
