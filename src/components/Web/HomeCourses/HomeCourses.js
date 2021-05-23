import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import NoAvatar from "../../../assets/img/png/no-img.png";

import "./HomeCourses.scss";
import { getImgCurso } from "../../../api/curso";

export default function HomeCourses(props) {
  const { cursosActive } = props;

  
  const [img, setImg] = useState(null);
  const [imgUno, setImgUno] = useState(null);
  const [imgDos, setImgDos] = useState(null);
  const [imgTres, setImgTres] = useState(null);
  const [imgCuatro, setImgCuatro] = useState(null);
  const [imgCinco, setImgCinco] = useState(null);

  useEffect(() => {
    if (cursosActive[0]) {
      // eslint-disable-next-line no-unused-expressions
      cursosActive[0]?.img
        ? getImgCurso(cursosActive[0].img).then((response) => {
            setImg(response);
          })
        : false;
      // eslint-disable-next-line no-unused-expressions
      cursosActive[1]?.img
        ? getImgCurso(cursosActive[1].img).then((response) => {
            setImgUno(response);
          })
        : false;
      // eslint-disable-next-line no-unused-expressions
      cursosActive[2]?.img
        ? getImgCurso(cursosActive[2].img).then((response) => {
            setImgDos(response);
          })
        : false;
      // eslint-disable-next-line no-unused-expressions
      cursosActive[3]?.img
        ? getImgCurso(cursosActive[3].img).then((response) => {
            setImgTres(response);
          })
        : false;
      // eslint-disable-next-line no-unused-expressions
      cursosActive[4]?.img
        ? getImgCurso(cursosActive[4].img).then((response) => {
            setImgCuatro(response);
          })
        : false;
      // eslint-disable-next-line no-unused-expressions
      cursosActive[5]?.img
        ? getImgCurso(cursosActive[5].img).then((response) => {
            setImgCinco(response);
          })
        : false;
    } else {
      setImg(null);
      setImgDos(null);
      setImgTres(null);
      setImgCuatro(null);
      setImgCinco(null);
    }
  }, [cursosActive]);

  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Aprende y mejora tus habilidades </h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            {cursosActive[0] ? (
              <CardCourse
                image={img ? img : NoAvatar}
                title={cursosActive[0] ? cursosActive[0].name : ""}
                subtitle={cursosActive[0] ? cursosActive[0].description : ""}
				cursoActive0= {cursosActive[0]?._id} 
				
              />
			  
            ) : null}
          </Col>
          <Col md={6}>
            {cursosActive[1] ? (
              <CardCourse
                image={imgUno ? imgUno : NoAvatar}
                title={cursosActive[1] ? cursosActive[1].name : ""}
				subtitle={cursosActive[1] ? cursosActive[1].description : ""}
				cursoActive0= {cursosActive[1]?._id} 
              />
            ) : null}
          </Col>
          <Col md={6}>
            {cursosActive[2] ? (
              <CardCourse
                image={imgDos ? imgDos : NoAvatar}
                title={cursosActive[2] ? cursosActive[2].name : ""}
				subtitle={cursosActive[2] ? cursosActive[2].description : ""}
				cursoActive0= {cursosActive[2]?._id} 
              />
            ) : null}
          </Col>
          <Col md={6}>
            {cursosActive[3] ? (
              <CardCourse
                image={imgTres ? imgTres : NoAvatar}
                title={cursosActive[3] ? cursosActive[3].name : ""}
                subtitle={cursosActive[3] ? cursosActive[3].description : ""}
                cursoActive0= {cursosActive[3]?._id} 
              />
            ) : null}
          </Col>
        </Row>
        <Row className="row-courses">
          <Col md={6}>
            {cursosActive[4] ? (
              <CardCourse
                image={imgCuatro ? imgCuatro : NoAvatar}
                title={cursosActive[4] ? cursosActive[4].name : ""}
                subtitle={cursosActive[4] ? cursosActive[4].description : ""}
                cursoActive0= {cursosActive[4]?._id} 
              />
            ) : null}
          </Col>
          <Col md={6} />
          <Col md={6} />
          <Col md={6}>
            {cursosActive[5] ? (
              <CardCourse
                image={imgCinco ? imgCinco : NoAvatar}
                title={cursosActive[5] ? cursosActive[5].name : ""}
                subtitle={cursosActive[5] ? cursosActive[5].description : ""}
                cursoActive0= {cursosActive[5]?._id} 
              />
            ) : null}
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
        <Link to="/courses">
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, cursoActive0} = props;
  const { Meta } = Card;


  return (
    < Link to={{pathname: `/courses/${cursoActive0} `, state: `${cursoActive0}`, }}>
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[
			<Button >
          {/* <Link
		   className="linkButton"
            to={{
              pathname: `/courses/${cursosActive0?._id}`,
              state: `${cursosActive0?._id}`,
            }}
          > */}
           ver curso
          {/* </Link> */}
		  </Button>
        ]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </Link>
  );
}
