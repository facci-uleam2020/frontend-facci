import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import { getCursoWeb } from "../api/curso";
import { withRouter } from "react-router-dom";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import Pagination from "../components/Web/Courses/Pagination";
import { Helmet } from "react-helmet";
import CoursesList from "../components/Web/Courses/CoursesList";
import queryString from "query-string";

import "./Courses.scss";

function Courses(props) {
  const { location, history } = props;
  const [courses, setCourses] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getCursoWeb(true, 9, page).then((response) => {
      setCourses(response.curso);
    });
  }, [page]);

  let pagina = location.search.split("?page=");
  let paginaComparation = parseInt(pagina[1]);

  let total = courses?.pages;

  return (
	  <>
	  <Helmet>
		  <title>Cursos | Facci-Uleam</title>
	  </Helmet>
    <Row>
      <Col md={4} />
      <Col md={16}>
        <PresentationCourses />
        {!courses ? (
          <Spin
            tip="Cargando cursos"
            style={{ textAlign: "center", width: "100%", padding: "20px" }}
          />
        ) : paginaComparation > total ? (
          <div className="data">
            <h1>no hay data</h1>
          </div>
        ) : (
          <CoursesList courses={courses} />
        )}

        <Pagination courses={courses} location={location} history={history} />
      </Col>
      <Col md={4} />
    </Row>
	</>
  );
}

export default withRouter(Courses);
