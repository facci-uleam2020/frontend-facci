import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-img.png';

import './CoursesList.scss';
import { getImgCurso } from '../../../../api/curso';
import { Link } from 'react-router-dom';

export default function CoursesList(props) {
	const { courses } = props;

	return (
		<div className="courses-list">
			<Row>
				{courses.docs.map((course) => (
					<Col key={course._id} md={8} className="courses-list__course">
						<Course course={course} />
					</Col>
				))}
			</Row>
		</div>
	);
}
function Course(props) {
	const { course } = props;
	const { Meta } = Card;
	const [img, setImg] = useState(null);

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		course.img
			? getImgCurso(course.img).then((response) => {
					setImg(response);
			  })
			: false;
	}, [course.img]);

	return (
		<Card cover={<img src={img ? img : NoAvatar} alt={course.name} />}>
			<Meta title={course.name} description={course.description} />
			<div className="courses-list__course-footer">
				<span>{course.price ? `$ ${course.price} ` : ''}</span>
				{/* <div>
					<Rate disabled defaultValue={5} />
				</div> */}
			</div>
			<Link to={{ pathname: `/courses/${course._id}`, state: `${course._id}` }}>
				<Button>ver curso</Button>
			</Link>
		</Card>
	);
}
