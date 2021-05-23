import React from 'react'
import { Link } from 'react-router-dom';
import ListAnswers from '../../../components/WebPanel/CreateAnswers/ListAnswers/ListAnswers';

export default function CreateAnswers(props) {
    console.log(props);
    
    const idUser = props.match.params.id;
    const idCurso = props.match.params.idCurso;
    const idQuestion = props.match.params.idQuestion;

    return (
        <div>
              <Link style={{ float: 'left' }} to={`/panel/${idUser}/cursos/exam/${idCurso}`}>
				Regresar
			</Link>
            <ListAnswers idUser={idUser} idCurso={idCurso} idQuestion={idQuestion} />
        </div>
    )
}
