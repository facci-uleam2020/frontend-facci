import React, { useState } from 'react';
import { Table, Button, Tooltip, Modal as ModalCurso, notification } from 'antd';
import AddCurso from '../../Seccion/AddSeccion';
import Modal from '../../../../components/Modal';

import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import './ListSeccion.scss';
import SubirVideo from '../SubirVideo';
import ViewVideo from '../ViewVideo/ViewVideo';
import EditSeccionForm from '../EditSeccionForm';
import { deleteSeccionApi } from '../../../../api/seccion';

export default function ListSeccion(props) {
	const { token, id, seccion, setReloadUsers } = props;

	const { confirm } = ModalCurso;

	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState([]);
	const [modalContent, setModalContent] = useState(null);

	const addSeccionModal = () => {
		setIsVisibleModal(true);
		setModalTitle('Creando Nueva Seccion');
		setModalContent(
			<AddCurso setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} id={id} seccion={seccion} />
		);
	};
	const ViewSeccionModal = (curso) => {
		setIsVisibleModal(true);
		setModalTitle(`Visualizando video de ${curso.name} `);
		setModalContent(
			// <AddCurso setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} id={id} seccion={seccion} />
			<ViewVideo curso={curso} />
		);
	};

	let uniqueId = 0;

	const subirVideo = (seccion) => {
		setIsVisibleModal(true);
		setModalTitle(`Editar a :  ${seccion.name}`);
		setModalContent(
			<SubirVideo setReloadUsers={setReloadUsers} setIsVisibleModal={setIsVisibleModal} seccion={seccion} />
		);
	};
	const editSeccion = (curso) => {
		setIsVisibleModal(true);
		setModalTitle(`Editar a :  ${curso.name}`);
		setModalContent(
			<EditSeccionForm setReloadUsers={setReloadUsers} curso={curso} setIsVisibleModal={setIsVisibleModal} />
		);
	};
	const deleteSeccion = (curso) => {
		// console.log(response.cursos[0].cursos._id);

		if (curso) {
			confirm({
				title: 'Eliminando Curso',
				content: `¿Estas seguro que deseas eliminar a ${curso.name} ?`,
				okText: 'Eliminar',
				okType: 'danger',
				cancelText: 'Cancelar',
				onOk() {
					deleteSeccionApi(token, curso._id, curso.video)
						.then((response) => {
							console.log(response);
							notification['success']({
								message: response,
							});
							setReloadUsers(true);
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
		}

		// return response.cursos.map((secciones) => {
		// 	if (secciones.cursos._id === curso._id) {
		// 		notification['error']({
		// 			message: 'Aun tienes secciones dentro borralas y continua',
		// 		});
		// 	} else {
		// 		notification['error']({
		// 			message: 'No tienes secciones dentro borralas y continua',
		// 		});
		// 	}
		// });
	};
	const columns = [
		{ title: 'Nombre', dataIndex: 'name', key: `${seccion.name}` },
		{ title: 'Descripcion', dataIndex: 'description', key: `${seccion.description}` },
		{ title: 'Video', dataIndex: 'nameVideo', key: `${seccion.nameVideo}` },
		{
			title: 'Recurso',
			dataIndex: 'recurso',
			key: `${seccion.recurso}`,
			render: (text) =>
				text ? (
					<a target="_blank" rel="noopener noreferrer" href={text}>
						ir
					</a>
				) : (
					''
				),
		},

		{
			title: 'Acciones',
			dataIndex: '',
			key: '1',
			render: (curso) => [
				<div key="1" style={{ display: 'flex' }}>
					<Tooltip title="Subir  y actualizar video" color="yellow">
						<Button
							type="primary"
							style={{ marginLeft: '10px', backgroundColor: '#E9D22E', borderColor: '#E9D22E' }}
							onClick={() => subirVideo(curso)}
						>
							<PlusOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Visualizar video" color="blue">
						<Button type="primary" style={{ marginLeft: '10px' }} onClick={() => ViewSeccionModal(curso)}>
							<EyeOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Editar Seccion" color="green">
						<Button
							type="primary"
							style={{ marginLeft: '10px', backgroundColor: '#6BF55D', borderColor: '#6BF55D' }}
							onClick={() => editSeccion(curso)}
						>
							<EditOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="eliminar Seccion" color="red">
						<Button style={{ marginLeft: '10px' }} type="danger" onClick={() => deleteSeccion(curso)}>
							<DeleteOutlined />
						</Button>
					</Tooltip>
					{/* <Link to={{ pathname: `/panel/cursos/${curso._id}`, state: `${curso._id}` }}>
						<Button type="primary">
							<BookOutlined />
						</Button>
					</Link>
					
					<Button
						type="primary"
						style={{ marginLeft: '10px', backgroundColor: '#E9D22E', borderColor: '#E9D22E' }}
						onClick={() => editCurso(curso)}
					>
						<EditOutlined />
					</Button>
					<Button
						type="danger"
						style={{ marginLeft: '10px', backgroundColor: '#5BD754', borderColor: '#5BD754' }}
						onClick={() => desactivateCurso(curso)}
					>
						<StopOutlined />
					</Button>
					<Button style={{ marginLeft: '10px' }} type="danger" onClick={() => deleteCurso(curso)}>
						<DeleteOutlined />
					</Button> */}
				</div>,
			],
		},
	];

	return (
		<>
			<Button
				type="primary"
				style={{ marginBottom: '5%', marginTop: '4%', float: 'right' }}
				onClick={addSeccionModal}
			>
				Nueva Seccion
			</Button>

			<Table
				className="boton animate__animated animate__fadeInUp"
				columns={columns}
				rowKey={(record) => {
					if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
					return record.__uniqueId;
				}}
				dataSource={seccion}
				pagination={{ pageSize: 3 }}
			/>
			<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</>
	);
}
