import React from "react";
import logo from "../../../../assets/img/png/logoFaci.png";
import SocialLinks from "../../SocialLinks";

import "./MainInfo.scss";
export default function MainInfo() {
  return (
    <>
      <div className="my-info">
        <img className="my-info__logo" src={logo} alt="facci" />
        <h4>
          Entra al mundo del aprendizaje autodidacta, disfruta creando proyectos
          de todo tipo, deja que tu imaginación fluya y mejora día a día
        </h4>
        <SocialLinks />
      </div>
    </>
  );
}
