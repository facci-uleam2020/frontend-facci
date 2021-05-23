import React, { useEffect, useState } from 'react';
import { Switch, Image, Button, Table, notification, Modal as ModalCurso, Tooltip } from 'antd';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import { BookOutlined, EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined, SnippetsOutlined} from '@ant-design/icons';
import Modal from '../../../components/Modal';
import EditCursoForm from '../EditCursoForm';

import { getImgCurso, activateCursoApi, deleteCursoApi } from '../../../api/curso';
import { getSeccionApi } from '../../../api/seccion';
import AddCurso from '../AddCurso';
import { getAccessToken } from '../../../api/auth';
import './ListCursos.scss';

import { Link } from 'react-router-dom';

const { confirm } = ModalCurso;

export default function ListCursos(props) {
	const { cursosActive, cursosInactive, setReloadUsers, idUser } = props;

	const [viewCursosActive, setviewCursosActive] = useState(true);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState([]);
	const [modalContent, setModalContent] = useState(null);
	const addCursoModal = () => {
		setIsVisibleModal(true);
		setModalTitle('Creando Nuevo Curso');
		setModalContent(
			<AddCurso setIsVisibleModal={setIsVisibleModal} idUser={idUser} setReloadUsers={setReloadUsers} />
		);
	};
	return (
		<div className="list-curso">
			<div className="list-curso__header">
				<div className="list-curso__header-switch">
					<Switch defaultChecked onChange={() => setviewCursosActive(!viewCursosActive)} />
					<span>{viewCursosActive ? 'Cursos Activos' : 'Cursos Inactivos'}</span>
				</div>
				<Button
					className="boton animate__animated animate__slideInRight"
					type="primary"
					onClick={addCursoModal}
				>
					<BookOutlined /> Nuevo Curso
				</Button>
			</div>

			{viewCursosActive ? (
				<CursosActive
					idUser={idUser}
					setIsVisibleModal={setIsVisibleModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
					cursosActive={cursosActive}
					setReloadUsers={setReloadUsers}
				/>
			) : (
				<CursosInactive idUser={idUser} setReloadUsers={setReloadUsers} cursosInactive={cursosInactive} />
			)}
			<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</div>
	);
}

function CursosActive(props) {
	const { idUser, setReloadUsers, cursosActive, setIsVisibleModal, setModalTitle, setModalContent } = props;
	const accessToken = getAccessToken();

	let uniqueId = 0;

	const editCurso = (curso) => {
		setIsVisibleModal(true);
		setModalTitle(`Editar a :  ${curso.name}`);
		setModalContent(
			<EditCursoForm setReloadUsers={setReloadUsers} curso={curso} setIsVisibleModal={setIsVisibleModal} />
		);
	};

	const desactivateCurso = (curso) => {
		const accessToken = getAccessToken();

		activateCursoApi(accessToken, curso._id, false)
			.then((response) => {
				notification['success']({
					message: response,
				});
				setReloadUsers(true);
			})
			.catch((err) => {
				notification['error']({
					message: err,
				});
			});
	};
	const deleteCurso = (curso) => {
		getSeccionApi(accessToken, curso._id).then((response) => {
			// console.log(response.cursos[0].cursos._id);

			if (response.seccion.length === 0 || !response.seccion.length) {
				confirm({
					title: 'Eliminando Curso',
					content: `¿Estas seguro que deseas eliminar a ${curso.name} ?`,
					okText: 'Eliminar',
					okType: 'danger',
					cancelText: 'Cancelar',
					onOk() {
						deleteCursoApi(accessToken, curso._id)
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
			} else {
				if (response.seccion[0].cursos._id === curso._id) {
					notification['error']({
						message: 'Aun tienes secciones dentro borralas y continua',
					});
				} else {
					notification['error']({
						message: 'No tienes secciones dentro borralas y continua',
					});
				}
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
		});
	};

	const columns = [
		{
			title: 'Img',
			dataIndex: 'img',
			key: `${cursosActive ? cursosActive.img : null}`,
			render: (cursosRender) => <ListImgRender cursosRender={cursosRender} />,
		},
		{ title: 'Nombre', dataIndex: 'name', key: `${cursosActive.name}` },
		{ title: 'Descripcion', dataIndex: 'description', key: `${cursosActive.description}` },
		{ title: 'Precio', dataIndex: 'price', key: `${cursosActive.price}` },

		{
			title: 'Acciones',
			dataIndex: '',
			key: '1',
			render: (curso) => [

				
				<div key="1" style={{ display: 'flex' }}>
					<Link to={{ pathname: `/panel/${idUser}/cursos/seccion`, state: `${curso._id}` }}>
					<Tooltip title="crear sección">
						<Button type="primary">
							<BookOutlined />
						</Button>
						</Tooltip>
					</Link>
					{/* {setcurso(curso)} */}
					<Tooltip title="editar curso">
					<Button
						type="primary"
						style={{ marginLeft: '10px', backgroundColor: '#E9D22E', borderColor: '#E9D22E' }}
						onClick={() => editCurso(curso)}
					>
						<EditOutlined />
					</Button>
					</Tooltip>
					<Tooltip title="desactivar curso">
					<Button
						type="danger"
						style={{ marginLeft: '10px', backgroundColor: '#5BD754', borderColor: '#5BD754' }}
						onClick={() => desactivateCurso(curso)}
					>
						<StopOutlined />
					</Button>
					</Tooltip>
					<Tooltip title="Eliminar curso">
					<Button style={{ marginLeft: '10px' }} type="danger" onClick={() => deleteCurso(curso)}>
						<DeleteOutlined />
					</Button>
					</Tooltip>
					
					<Link to={{ pathname: `/panel/${idUser}/cursos/exam/${curso._id}`, state: `${curso._id}` }}>
					<Tooltip title="Crear Examen">
					<Button style={{ marginLeft: '10px', backgroundColor: '#FF5900 ' }} type="danger">
					<SnippetsOutlined />
					</Button>
					</Tooltip>
					</Link>
				</div>,
			],
		},
	];

	return (
		<Table
			className="boton animate__animated animate__fadeInUp"
			columns={columns}
			rowKey={(record) => {
				if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
				return record.__uniqueId;
			}}
			pagination={{ pageSize: 4 }}
			dataSource={cursosActive}
		/>

		// <List
		// 	className="cursos-active"
		// 	itemLayout="horizontal"
		// 	dataSource={cursosActive}
		// 	renderItem={(cursos) => (
		// 		<List.Item>
		// 			<List.Item.Meta
		// 				avatar={<Avatar src={cursos.img ? cursos.img : NoAvatar} />}
		// 				title={`
		// 				${cursos.name ? cursos.name : ''}
		// 			`}
		// 				description={cursos.description}
		// 				style={{ textAlign: 'justify' }}
		// 			/>
		// 			<List.Item.Meta
		// 				// avatar={<Avatar src={cursos.img ? cursos.img : NoAvatar} />}
		// 				title={`
		// 				$ ${cursos.price ? cursos.price : ''}
		// 			`}
		// 				style={{ marginLeft: '10%' }} // description={cursos.description}
		// 			/>
		// 		</List.Item>
		// 	)}
		// />
	);
}

function ListImgRender(props) {
	const { cursosRender } = props;
	const [img, setImg] = useState(null);

	useEffect(() => {
		if (cursosRender) {
			getImgCurso(cursosRender).then((response) => {
				setImg(response);
			});
		} else {
			setImg(null);
		}
	}, [cursosRender]);

	return <Image width={30} height={30} key="img" src={img ? img : NoAvatar} />;
}

function CursosInactive(props) {
	const { idUser, cursosInactive, setReloadUsers } = props;
	const accessToken = getAccessToken();

	let uniqueId = 0;
	const activateCurso = (curso) => {
		const accessToken = getAccessToken();
		getSeccionApi(accessToken, curso._id).then((response) => {
			// console.log(response.cursos[0].cursos._id);

			if (response.seccion.length === 0 || !response.seccion.length) {
				notification['error']({
					message: 'No tienes secciones creadas, crea una y activa  el curso',
				});
			} else {
				// if (response.seccion[0].cursos._id === curso._id) {
				// 	notification['error']({
				// 		message: 'Aun tienes secciones dentro borralas y continua',
				// 	});
				// } else {
				// 	notification['error']({
				// 		message: 'No tienes secciones dentro borralas y continua',
				// 	});
				// }
				activateCursoApi(accessToken, curso._id, true)
					.then((response) => {
						notification['success']({
							message: response,
						});
						setReloadUsers(true);
					})
					.catch((err) => {
						notification['error']({
							message: err,
						});
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
		});
	};
	const deleteCurso = (curso) => {
		getSeccionApi(accessToken, curso._id).then((response) => {
			// console.log(response.cursos[0].cursos._id);

			if (response.seccion.length === 0 || !response.seccion.length) {
				confirm({
					title: 'Eliminando Curso',
					content: `¿Estas seguro que deseas eliminar a ${curso.name} ?`,
					okText: 'Eliminar',
					okType: 'danger',
					cancelText: 'Cancelar',
					onOk() {
						deleteCursoApi(accessToken, curso._id)
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
			} else {
				if (response.seccion[0].cursos._id === curso._id) {
					notification['error']({
						message: 'Aun tienes secciones dentro borralas y continua',
					});
				} else {
					notification['error']({
						message: 'No tienes secciones dentro borralas y continua',
					});
				}
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
		});
	};

	const columns = [
		{
			title: 'Img',
			dataIndex: 'img',
			key: `${cursosInactive.img}`,
			render: (cursosRender) => <ListImgRenderInactive cursosRender={cursosRender} />,
		},
		{ title: 'Nombre', dataIndex: 'name', key: `${cursosInactive.name}` },
		{ title: 'Descripcion', dataIndex: 'description', key: `${cursosInactive.description}` },
		{ title: 'Precio', dataIndex: 'price', key: `${cursosInactive.price}` },

		{
			title: 'Acciones',
			dataIndex: '',
			key: '1',
			render: (curso) => [
				<div key="1" style={{ display: 'flex' }}>
					<Link to={{ pathname: `/panel/${idUser}/cursos/seccion`, state: `${curso._id}` }}>
						<Button type="primary">
							<BookOutlined />
						</Button>
					</Link>
					<Button
						type="primary"
						style={{ marginLeft: 10, backgroundColor: '#5A9401', borderColor: '#5A9401' }}
						onClick={() => activateCurso(curso)}
					>
						<CheckOutlined />
					</Button>
					<Button style={{ marginLeft: '10px' }} type="danger" onClick={() => deleteCurso(curso)}>
						<DeleteOutlined />
					</Button>
				</div>,
			],
		},
	];

	return (
		<Table
			className="boton animate__animated animate__fadeInUp"
			columns={columns}
			rowKey={(record) => {
				if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
				return record.__uniqueId;
			}}
			dataSource={cursosInactive}
		/>

		// <List
		// 	className="cursos-active"
		// 	itemLayout="horizontal"
		// 	dataSource={cursosActive}
		// 	renderItem={(cursos) => (
		// 		<List.Item>
		// 			<List.Item.Meta
		// 				avatar={<Avatar src={cursos.img ? cursos.img : NoAvatar} />}
		// 				title={`
		// 				${cursos.name ? cursos.name : ''}
		// 			`}
		// 				description={cursos.description}
		// 				style={{ textAlign: 'justify' }}
		// 			/>
		// 			<List.Item.Meta
		// 				// avatar={<Avatar src={cursos.img ? cursos.img : NoAvatar} />}
		// 				title={`
		// 				$ ${cursos.price ? cursos.price : ''}
		// 			`}
		// 				style={{ marginLeft: '10%' }} // description={cursos.description}
		// 			/>
		// 		</List.Item>
		// 	)}
		// />
	);
}
function ListImgRenderInactive(props) {
	const { cursosRender } = props;
	const [img, setImg] = useState(null);

	useEffect(() => {
		if (cursosRender) {
			cursosRender
				? getImgCurso(cursosRender).then((response) => {
						setImg(response);
				  })
				: setImg(null);
		} else {
			setImg(null);
		}
	}, [cursosRender]);

	return <Image width={30} height={30} key="img" src={img ? img : NoAvatar} />;
}
