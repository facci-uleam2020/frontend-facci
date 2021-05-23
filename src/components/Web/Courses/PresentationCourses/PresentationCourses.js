import React from 'react';
import LogoFacci from '../../../../assets/img/png/logoFaci.png';
import './PresentationCourses.scss';

export default function PresentationCourses() {
	return (
		<div className="presentation-courses">
			<img src={LogoFacci} alt="Cursos Facci" />
			<p>
				La Uniersidad Laica Eloy Alfaro de Manabi vas a encontrar los mejores cursos online de desarrollo web en
				Español. Unete a nosotros y empieza tu camino como un gran profesional, aprendiendo dia a dia.
				Sinceramente, estos curso te van ayudar a mejorar, aprender y poder seguir adelante con tus estudios,
				recibelo y no te arrepentiras.
			</p>
			<h3>¡¡¡Échales un vistazo y aprovecha las ofertas!!!</h3>
			<br />
		</div>
	);
}
