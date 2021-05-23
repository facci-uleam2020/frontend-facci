import React from "react";
import { Row, Col } from "antd";
import "./FacciAbout.scss";

export default function FacciAbout() {
  return (
      <Row>
          <Col md={6}></Col>
          <Col md={12}>
              <h1 className="title">MISIÓN Y VISIÓN DE LA FACCI</h1>
              <h2 className="subtitle">Misión</h2>
              <h3 className="description">Formar profesionales en Sistemas Informáticos, con pensamiento crítico, ético, emprendedor, innovador y autónomo en lo tecnológico, investigación; mejorando sus competencias profesionales, laborales, para la construcción y aplicación permanente del conocimiento en las tecnologías informáticas brindando solución a las necesidades del contexto, contribuyendo al desarrollo social del entorno sobre la base de los ejes socio profesionales, líneas de investigación y programas de transferencia prioritarios definidos por la unidad académica.</h3>
          
              <h2 className="subtitle">Visión</h2>
              <h3 className="description nam">Formar profesionales en Sistemas Informáticos, con pensamiento crítico, ético, emprendedor, innovador y autónomo en lo tecnológico, investigación; mejorando sus competencias profesionales, laborales, para la construcción y aplicación permanente del conocimiento en las tecnologías informáticas brindando solución a las necesidades del contexto, contribuyendo al desarrollo social del entorno sobre la base de los ejes socio profesionales, líneas de investigación y programas de transferencia prioritarios definidos por la unidad académica.</h3>
          
          </Col>
          <Col md={6}></Col>
      </Row>
  );
}
