import React from "react";
import styles from './Footer.module.css';
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.root__container}>
        <div className={styles.root__about}></div>
        <div className={styles.root__menu}></div>
        <div className={styles.root__hours}></div>
        <div className={styles.root__newsletter}></div>
      </div>
      <div className={styles.root__additional}>
        <div className={styles.root__container}>
          <span>© 2022 Lime. All Rights Reserved by Lime</span>
          <div className={styles.root__social}>
            <FaFacebookF/>
            <FaTwitter/>
            <FaGooglePlusG/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;