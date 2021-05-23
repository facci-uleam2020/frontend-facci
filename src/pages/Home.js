import React, { useEffect } from "react";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import { Row, Col } from "antd";
import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "./Home.scss";

import HowMYCoursesWork from "../components/Web/HowMYCoursesWork/HowMYCoursesWork";
import { useState } from "react";
import { getCursoFiveWebApi } from "../api/curso";
import { Helmet } from "react-helmet";
export default function Home() {
  const [cursosActive, setCursosActive] = useState([]);
  useEffect(() => {
    getCursoFiveWebApi(true).then((response) => {
      setCursosActive(response.curso);
    });
  }, []);

  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#D6D7D7",
    color: "#000",
    // opacity: 0.35,
    textAlign: "center",
    fontSize: 14,
  };
  return (
    <>
      <Helmet>
        <title> Facci-Uleam</title>
      </Helmet>
      <MainBanner />
      <Row>
        <Col lg={24} className="espacio"></Col>
      </Row>
      <HomeCourses cursosActive={cursosActive} />
      <HowMYCoursesWork />
      <BackTop>
        <div style={style}>
          <UpOutlined />
        </div>
      </BackTop>
    </>
  );
}
