import React from 'react';
import './Footer.css';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-links">
          <h3>Quick Links</h3>
          <ul className='quicklinks'>
            <li><a href="#homesection">Home</a></li>
            <li><a href="#joust">About</a></li>
            <li><a href="#contactus">Contact us</a></li>
            <li><a href="#competition">Register</a></li>
          </ul>
        </div>
        <div className="footer-info">
          <h3>Contact Info</h3>
          <div>
            <p><br />HEAD OF DEPARTMENT</p>
            <p>ctypsup@*********</p>
          </div>
        </div>
        <div className="footer-social">
          <h3>Find Us here</h3>
          <div className="social-icons">
            <a href=""><FaGithub /></a>
            <a href=""><FaLinkedin /></a>
            <a href=""><FaInstagramSquare /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; CRYPSUP</p>
      </div>
    </footer>
  );
}

export default Footer;
