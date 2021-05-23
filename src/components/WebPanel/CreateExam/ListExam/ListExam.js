import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../../api/auth";
import { getExamApi, deleteExamApi } from "../../../../api/exam";
import {  Button, Table, notification, Modal as ModalCurso, Tooltip } from 'antd';

import { BookOutlined, EditOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import Modal from '../../../Modal';

import "./ListExam.scss"
import EditExam from "../EditExam/EditExam";
import AddExam from "../AddExam/AddExam";
import { Link } from "react-router-dom";
import { getAnswersApi } from "../../../../api/answers";

const { confirm } = ModalCurso;
export default function ListExam(props) {
  const { idUser, idCurso } = props;


  const token = getAccessToken();
  let uniqueId = 0;

  const [exam, setExam] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [reloaders, setReloaders] = useState(false)

  useEffect(() => {
    getExamApi(token, idUser, idCurso).then((response) => {
      setExam(response.exam);
      // console.log(response);
      setReloaders(false)
    });
  }, [idUser, idCurso, token, reloaders]);

  

  const editQuestion = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar la pregunta :  ${data.question}`);
    setModalContent(
        <EditExam setIsVisibleModal={setIsVisibleModal} data={data}  token={token} setReloaders={setReloaders} reloaders={reloaders}/>
        
    );
};

const deleteQuestion = (curso) => {
    
        // console.log(response.cursos[0].cursos._id);

        getAnswersApi(token, idUser, curso._id).then((response) => {
            // console.log(response.cursos[0].cursos._id);
            
console.log(response.answers[0]);
console.log(curso);
if (response.answers.length === 0 || !response.answers.length) {
     confirm({
                title: 'Eliminando Pregunta',
                content: `¿Estas seguro que deseas eliminar la siguiente pregunta  ${curso.question} ?`,
                okText: 'Eliminar',
                okType: 'danger',
                cancelText: 'Cancelar',
                onOk() {
                    deleteExamApi(token, curso._id)
                        .then((response) => {
                            console.log(response);
                            notification['success']({
                                message: response,
                            });
                            setReloaders(true);
                        })
                        .catch((err) => {
                            notification['error']({
                                message: err,
                            });
                            //     .then((response) => {

                            //     .catch((err) => {
                        });
                },
            });

}else {
    if (response.answers[0]) {
        notification['error']({
            message: 'Aun tienes respuesta dentro borralas y continua',
        });
    }
}
			})
           
        

       
    
};

const addExamModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando Nueva pregunta');
    setModalContent(
        <AddExam setIsVisibleModal={setIsVisibleModal} idCurso={idCurso} idUser={idUser} setReloaders={setReloaders} token={token}/>
    );
};


 
  const columns = [
    
    { title: 'Nombre Curso', dataIndex: '', key: `1`, render: (curso) => curso?.cursos?.name },
    { title: 'Pregunta', dataIndex: 'question', key: `1` },
    

    {
        title: 'Acciones',
        dataIndex: '',
        key: '1',
        render: (data) => [

            
            <div key="1" style={{ display: 'flex' }}>
                
                {/* {setcurso(curso)} */}
                <Tooltip title="editar pregunta">
                <Button
                    type="primary"
                    style={{ marginLeft: '10px', backgroundColor: '#E9D22E', borderColor: '#E9D22E' }}
                    onClick={() => editQuestion(data)}
                >
                    <EditOutlined /> 
                </Button>
                </Tooltip>
                <Tooltip title="agregar respuesta ">
                <Link to={{ pathname: `/panel/${idUser}/cursos/exam/${idCurso}/answers/${data?._id}`, state: `${data._id}` }}>
                <Button
                    type="primary"
                    style={{ marginLeft: '10px'}}
                    // onClick={() => desactivateCurso(curso)}
                >
                    <PlusOutlined />
                </Button>
                </Link>
                </Tooltip>
                <Tooltip title="Eliminar pregunta">
                <Button style={{ marginLeft: '10px' }} type="danger" 
                
                onClick={() => deleteQuestion(data)}
                >
                    <DeleteOutlined />
                </Button>
                </Tooltip>
                
               
            </div>,
        ],
    },
];


  return (
      <>
      <div className="list-exam">
          <div className="list-exam__header">
          <Button
					className="boton animate__animated animate__slideInRight"
					type="primary"
					onClick={addExamModal}
				>
					<BookOutlined /> Nueva Pregunta
				</Button>
          </div>

      </div>

      <Table
			className="boton animate__animated animate__fadeInUp"
			columns={columns}
			rowKey={(record) => {
				if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
				return record.__uniqueId;
			}}
			pagination={{ pageSize: 4 }}
			dataSource={exam}
		/>

<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>

      </>
  );
}
