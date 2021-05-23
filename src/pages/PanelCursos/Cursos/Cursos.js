import React, { useState, useEffect } from 'react';
import { getAccessToken } from '../../../api/auth';
import { getCursoActive } from '../../../api/curso';
import ListCursos from '../../../components/WebPanel/ListCursos';

import './Cursos.scss';

export default function Cursos(props) {
	const idUser = props.match.params.id;
	const [cursosActive, setCursosActive] = useState([]);
	const [cursosInactive, setCursosInactive] = useState([]);
	const [reloadUsers, setReloadUsers] = useState(false);

	const token = getAccessToken();

	useEffect(() => {
		getCursoActive(token, true, idUser).then((response) => {
			setCursosActive(response.curso);
		});
		getCursoActive(token, false, idUser).then((response) => {
			setCursosInactive(response.curso);
		});
		setReloadUsers(false);
	}, [token, reloadUsers, idUser]);

	return (
		<div className="panel-cursos">
			<ListCursos
				idUser={idUser}
				cursosActive={cursosActive}
				setReloadUsers={setReloadUsers}
				cursosInactive={cursosInactive}
			/>
		</div>
	);
}
