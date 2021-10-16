import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <p>Copyright &#169; 2020-2021 Shoes-shop</p>
      <a className="git--icon" href="https://github.com/MaxHofmann/shoes-shop">{<FontAwesomeIcon icon={ faGithubSquare } />}</a>
      <a className="link--icon" href="https://www.linkedin.com/in/maksym-veremeichyk-269a8a202/">{<FontAwesomeIcon icon={ faLinkedin } />}</a>
    </footer>
  );
}

export default Footer;
