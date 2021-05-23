import React, { useEffect, useState } from "react";
import { getAccessToken } from "../api/auth";
import { getPurchase } from "../api/compras";
import useAuth from "../hooks/useAuth";
import {Row, Col, Spin, Card, Button} from "antd"
import { Link } from "react-router-dom";
import NoAvatar from "../assets/img/png/no-img.png"

import "./MyCourses.scss"
import { getImgCurso } from "../api/curso";

export default function MyCourses(props) {
 

 const [purchase, setPurchase] = useState([])

 const token = getAccessToken()
 const {user, isLoading} = useAuth()

  useEffect(() => {
     // eslint-disable-next-line no-unused-expressions
     user && !isLoading
			? getPurchase(token, user.id).then((response) => {
					setPurchase(response.compras);
			  })
			: null;

    
  }, [isLoading, token, user])

  console.log(purchase);
  return (
    <Row>
      <Col md={4} />
      <Col md={16} >

      {!purchase ? 
					<Spin tip="Cargando cursos" style={{ textAlign: 'center', width: '100%', padding: '20px' }} />
				
					:
          <div className="courses-list">
          <Row>
            {purchase.map((course) => (
              <Col key={course?.cursos?._id} md={8} className="courses-list__course">
                <CourseList course={course} />
              </Col>
            ))}
          </Row>
        </div>
					// <CoursesList courses={courses} />
				}

      </Col>
      <Col md={4} />
    </Row>
  );
}

function CourseList(props){

  const {course} = props
  const { Meta } = Card;
  // console.log(purchase);
  const [img, setImg] = useState(null);

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		course?.cursos?.img
			? getImgCurso(course?.cursos?.img).then((response) => {
					setImg(response);
			  })
			: false;
  }, [course]);
  

  return (
    
<Card cover={<img src={img ? img : NoAvatar} alt={course.name} />} >
			<Meta title={course?.cursos?.name} description={course?.cursos?.description} />
			<div className="courses-list__course-footer">
				{/* <span>{course.price ? `$ ${course.price} ` : ''}</span> */}
				{/* <div>
					<Rate disabled defaultValue={5} />
				</div> */}
			</div>
			<Link to={{ pathname: `/courses-acquired/courses/${course?.cursos?._id}`, state: `${course?.cursos?._id}` }}>
				<Button>ver curso</Button>
			</Link>
		</Card>
  )
}