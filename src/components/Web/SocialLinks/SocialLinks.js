import React from "react";
import FacebookIcon from "../../../assets/img/png/facebook.png"; // import {ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import YouTubeIcon from "../../../assets/img/png/youtube.png"; // import {ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import TwitterIcon from "../../../assets/img/png/gorjeo.png";
// import {ReactComponent as Twitter} from "../../../assets/img/svg/twitter.svg";
import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.facebook.com/Facci.Uleam"
        className="face"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={FacebookIcon} alt="face" />
      </a>
      <a
        href="https://www.youtube.com/user/facciuleam"
        className="youtube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={YouTubeIcon} alt="youtobe" />
      </a>
      <a
        href="https://twitter.com/facciuleam"
        className="twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={TwitterIcon} alt="twitter" />
      </a>
    </div>
  );
}
