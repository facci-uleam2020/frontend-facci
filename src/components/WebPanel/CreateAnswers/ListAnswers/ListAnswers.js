import React, { useEffect, useState } from "react";
import { deleteAnswersApi, getAnswersApi } from "../../../../api/answers";
import { getAccessToken } from "../../../../api/auth";
import {
  Button,
  Table,
  notification,
  Modal as ModalCurso,
  Tooltip,
} from "antd";
import {
  BookOutlined,
  EditOutlined,
  
  DeleteOutlined,
 
} from "@ant-design/icons";

import Modal from "../../../Modal";
import AddAnswers from "../AddAnswers/AddAnswers";
import EditAnswers from "../EditAnswers/EditAnswers";


const { confirm } = ModalCurso;
export default function ListAnswers(props) {
  const { idUser, idCurso, idQuestion } = props;

  const token = getAccessToken();
  let uniqueId = 0;

  const [answers, setAnswers] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [reloaders, setReloaders] = useState(false);

  useEffect(() => {
    getAnswersApi(token, idUser, idQuestion).then((response) => {
      setAnswers(response.answers);
      //   console.log(response);
      setReloaders(false)
    });
  }, [idUser, idQuestion, token, reloaders]);




  const addAnswersModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nueva Respuesta");
    setModalContent(
      <AddAnswers
        setIsVisibleModal={setIsVisibleModal}
        answers={answers}
        idQuestion={idQuestion}
        idCurso={idCurso}
        idUser={idUser}
        setReloaders={setReloaders}
        token={token}
      />
    );
  };
  const editAnswers = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar repuesta `);
    setModalContent(
      <EditAnswers
        answers={answers}
        setIsVisibleModal={setIsVisibleModal}
        data={data}
        token={token}
        setReloaders={setReloaders}
        reloaders={reloaders}
      />
    );
  };
  const deleteAnswer = (curso) => {
    
    // console.log(response.cursos[0].cursos._id);

    
        confirm({
            title: 'Eliminando respuesta',
            content: `¿Estas seguro que deseas eliminar la siguiente respuesta  ${curso.answers} ?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteAnswersApi(token, curso._id)
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
    

   

};

  const columns = [
    // { title: 'pregunta', dataIndex: '', key: `1`, render: (curso) => curso?.exam?.question },
    { title: "Respuesta", dataIndex: "answers", key: `1` },
    {
      title: "Correcta",
      dataIndex: "",
      key: `1`,
      render: (data) => (data?.correctAnswers ? "si" : "no"),
    },

    {
      title: "Acciones",
      dataIndex: "",
      key: "1",
      render: (data) => [
        <div key="1" style={{ display: "flex" }}>
          {/* {setcurso(curso)} */}
          <Tooltip title="editar respuesta">
            <Button
              type="primary"
              style={{
                marginLeft: "10px",
                backgroundColor: "#E9D22E",
                borderColor: "#E9D22E",
              }}
              onClick={() => editAnswers(data)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Eliminar respuesta">
            <Button
              style={{ marginLeft: "10px" }}
              type="danger"

              onClick={() => deleteAnswer(data)}
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
            onClick={addAnswersModal}
          >
            <BookOutlined /> Nueva Respuesta
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
        dataSource={answers}
      />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </>
  );
}
