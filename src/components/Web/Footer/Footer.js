import React from "react";
import "./Footer.scss";
import { Layout, Row, Col } from "antd";
import MainInfo from "./MainInfo/MainInfo";
import NavigationFooter from "./NavigationFooter/NavigationFooter";
export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row>
        <Col md={4} />
        <Col md={16}>
          <Row>
            <Col md={8}>
              <MainInfo />
            </Col>
            <Col md={10}>
              <NavigationFooter />
            </Col>
            {/* <Col md={6}>Mi informacion</Col> */}
          </Row>
          <Row className="footer__copy">
            <Col md={12}>&copy;2020 Facci-Uleam </Col>
            <Col md={12}>
              EDER ZAMBRANO MERO - JOSE MEDRANDA TOALA | DESARROLADORES WEB{" "}
            </Col>
          </Row>
        </Col>
        <Col md={4} />
      </Row>
    </Footer>
  );
}
