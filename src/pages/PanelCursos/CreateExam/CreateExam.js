import React from "react";
import { Link } from "react-router-dom";
import ListExam from "../../../components/WebPanel/CreateExam/ListExam";

export default function CreateExam(props) {


    const idUser = props.match.params.id;
    const idCurso = props.match.params.idCurso;
  return (

    <div>
        <Link style={{ float: 'left' }} to={`/panel/${idUser}/cursos`}>
				Regresar
			</Link>
      <ListExam idUser={idUser} idCurso={idCurso} />
    </div>
  );
}
