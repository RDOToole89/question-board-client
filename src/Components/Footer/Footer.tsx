import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="ribbon"></div>
      <div className="socials">
        <Link to="#">
          <i className="social-icon lab la-twitter la-3x"></i>
        </Link>
        <Link to="#">
          <i className="social-icon lab la-facebook la-3x"></i>
        </Link>
        <Link to="#">
          <i className="social-icon lab la-instagram la-3x"></i>
        </Link>
        <Link to="#">
          <i className="social-icon lab la-youtube la-3x"></i>
        </Link>
        <Link to="#">
          <i className="social-icon lab la-linkedin la-3x"></i>
        </Link>
      </div>
      <div className="info-boxes">
        <div>
          <img

            alt='codaisseur'
            style={{ width: '240px', objectFit: 'contain' }}
            src='https://d33wubrfki0l68.cloudfront.net/f276c3a3531930673f6ca69a91ffb523116c1157/c8db5/assets/icons/logo-squared.svg'

          />
        </div>
        <div className="info-box">
          <p className="info-detail-header">Company</p>
          <Link className="info-detail" to="#">
            ABOUT US
          </Link>
          <Link className="info-detail" to="#">
            JOBS
          </Link>
          <Link className="info-detail" to="#">
            PRESS
          </Link>
          <Link className="info-detail" to="#">
            BLOG
          </Link>
        </div>
        <div className="info-box">
          <p className="info-detail-header">More Info</p>
          <Link className="info-detail" to="#">
            FAQ
          </Link>
          <Link className="info-detail" to="#">
            CONTACT
          </Link>
          <Link className="info-detail" to="#">
            PRIVACY POLICY
          </Link>
          <Link className="info-detail" to="#">
            TERMS AND CONDITIONS
          </Link>
        </div>
        <div className="info-box">
          <p className="info-detail-header">Contact</p>
          <div className="info-contact-box">
            <i className="info-icon las la-phone la-2x"></i>
            <span className="info-detail-contact">tel:+31208885243</span>
          </div>
          <p className="info-contact-header">FOR PROSPECTIVE STUDENTS</p>
          <div className="info-contact-box">
            <i className="info-icon las la-envelope la-2x"></i>
            <span className="info-detail-contact">info@codaisseur.com</span>
          </div>
          <p className="info-contact-header">FOR PROSPECTIVE PARTNERS</p>
          <div className="info-contact-box">
            <i className="info-icon las la-envelope la-2x"></i>
            <span className="info-detail-contact">partners@codaisseur.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
