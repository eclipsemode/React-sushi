import React from "react";
import styles from './Footer.module.css';
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import logoImg from '../../assets/img/logo.png';
import envelopeImg from '../../assets/img/envelope.png';
import callImg from '../../assets/img/call.png';
import locationImg from '../../assets/img/location.png';
import Input from "../UI/Input/Input";

const Footer: React.FC = () => {
  return (
    <footer id="footer" className={styles.root}>
      <div className={styles.root__container}>
        <div className={styles.root__block}>
          <img src={logoImg} height="50" alt="logo"/>
          <div className={styles.about}>
            <img src={locationImg} height="28" width="28" alt="location"/>
            <span>г. Армавир, ул. Кропоткина 194</span>
          </div>
          <div className={styles.about}>
            <img src={envelopeImg} height="28" width="28" alt="envelope"/>
            <span>eclipsemod555@gmail.com</span>
          </div>
          <div className={styles.about}>
            <img src={callImg} height="28" width="28" alt="call"/>
            <span>8 (800) 200-27-92</span>
          </div>


        </div>
        <div className={styles.root__block}>
          <h2>Меню</h2>
          <span>Lorem ipsum dolor sit.</span>
          <span>Lorem ipsum dolor.</span>
          <span>Lorem ipsum dolor sit amet.</span>
          <span>Lorem ipsum dolor sit.</span>
          <span>Lorem ipsum.</span>
          <span></span>
        </div>
        <div className={styles.root__block}>
          <h2>Часы работы</h2>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut blanditiis expedita.</span>
        </div>
        <div className={styles.root__block}>
          <h2>Написать письмо</h2>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem deleniti in incidunt maxime possimus quia sequi!</span>
          <Input/>
        </div>
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