import React from "react";
import { FaInstagramSquare,FaLine,FaFacebookSquare} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import "../CSS/Footer.css";

const Footer = () => {
  return (
    <div>
    <div class="footer">
      <footer>
        <div class="social">
          <a href="#">
            <i class="icons"><FaInstagramSquare></FaInstagramSquare></i>

          </a>
          <a href="#">
            <i class="icons"><FaLine></FaLine></i>
          </a>

          <a href="#">
            <i class="icons"><FaFacebookSquare></FaFacebookSquare></i>
          </a>
        </div>
        <ul class="list">
          <li class="">
            <a href="#">Home</a>
          </li>
          <li class="">
            <a href="#">Services</a>
          </li>
          <li class="">
            <a href="#">About</a>
          </li>
        </ul>
        <p class="copyright">Game Company  © 2022</p>
      </footer>
    </div>
  </div>
  );
};

export default Footer;
