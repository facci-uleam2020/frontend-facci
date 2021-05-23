import React from 'react';

import CourseDetails from '../../../components/Web/Courses/CourseDetails/CourseDescriptions';

export default function ViewCurso(props) {
	const {cursoId}=props
	let id = props?.match?.params?.id;
	return <CourseDetails id={id} cursoId={cursoId} />;
}
