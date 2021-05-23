import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../../api/auth';
import { getCursoActive } from '../../../api/curso';
import ListStudents from '../../../components/WebPanel/ListStudents/ListStudents';

export default function Students(props) {
	const { id } = props.match.params;
	const [courses, setCourses] = useState([]);
	const token = getAccessToken();

	useEffect(() => {
		getCursoActive(token, true, id).then((response) => {
			setCourses(response.curso);
		});

		// setReloadUsers(false);
	}, [token, id]);

	return (
		<div>
			<ListStudents courses={courses} id={id} token={token} />
		</div>
	);
}
