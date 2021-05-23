import React from "react";
import { Row, Col } from "antd";
import {
  BookOutlined,
  TabletOutlined,
  CheckCircleOutlined,
  AccountBookOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import "./NavigationFooter.scss";
export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col md={24}>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}
function RenderListLeft() {
  return (
    <ul>
      <li>
        <a
          href="https://biblio.uleam.edu.ec/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOutlined /> Biblioteca Uleam
        </a>
      </li>
      <li>
        <a
          href="https://aulavirtual.uleam.edu.ec/auth/module.php/core/loginuserpass.php?AuthState=_0eaa298ae8ea0c18f82bb5f60ff1395701240de57e%3Ahttp%3A%2F%2Faulavirtual.uleam.edu.ec%2Fauth%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttp%253A%252F%252Faulavirtual.uleam.edu.ec%26cookieTime%3D1604238951%26RelayState%3Dhttp%253A%252F%252Faulavirtual.uleam.edu.ec%252Fxisce%252Fprincipal%252F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TabletOutlined /> Aula Virtual Uleam
        </a>
      </li>
      <li>
        <a
          href="https://efc.cedia.edu.ec/ "
          target="_blank"
          rel="noopener noreferrer"
        >
          <CheckCircleOutlined /> Cursos Cedia Uleam
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a
          href="https://www.uleam.edu.ec/suplementos-cica/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AccountBookOutlined /> Revistas Academicas
        </a>
      </li>
      <li>
        <a
          href="https://carreras.uleam.edu.ec/facci/datos-generales/mision-facci/ "
          target="_blank"
          rel="noopener noreferrer"
        >
          <SafetyCertificateOutlined /> Facci Uleam
        </a>
      </li>
      <li>
        <a
          href="https://carreras.uleam.edu.ec/facci/2019/11/12/proyectos/ "
          target="_blank"
          rel="noopener noreferrer"
        >
          <CheckCircleOutlined /> Proyectos Facci
        </a>
      </li>
    </ul>
  );
}
