import React, { useState } from 'react';
import { DollarOutlined, ContainerOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { registrarCursoApi } from '../../../api/curso';
import { getAccessToken } from '../../../api/auth';

import './AddCurso.scss';

export default function AddCurso(props) {
	const { setIsVisibleModal, setReloadUsers, idUser } = props;
	const [cursoData, setCursoData] = useState({
		estado: false,
		user: idUser,
	});

	const addCurso = (e) => {
		e.preventDefault();
		if (!cursoData.name || cursoData.name === '') {
			notification['warning']({
				message: 'El nombre es requerido',
			});
		} else if (!cursoData.description || cursoData.description === '') {
			notification['warning']({
				message: 'La descripcion es requerida',
			});
		} else if (!cursoData.price || cursoData.price === '') {
			notification['warning']({
				message: 'El precio es requerido',
			});
		} else {
			const accessToken = getAccessToken();
			registrarCursoApi(accessToken, cursoData)
				.then((response) => {
					notification['success']({
						message: response,
					});
					notification['info']({
						message: "no te olvides de llenar tu descripción de docente en el perfil",
					});
					// activeEmail(accessToken, userData)
					setIsVisibleModal(false);
					setReloadUsers(true);
					setCursoData({ estado: false, user: idUser });
				})
				.catch((err) => {
					notification['error']({
						message: err,
					});
				});
		}
	};

	return (
		<div className="add-curso">
			<AddForm addCurso={addCurso} cursoData={cursoData} setCursoData={setCursoData} />
		</div>
	);
}

function AddForm(props) {
	const { cursoData, setCursoData, addCurso } = props;
	const { TextArea } = Input;
	return (
		<Form className="form-edit" onSubmitCapture={addCurso}>
			<Row gutter={24}>
				<Col span={24}>
					<Form.Item>
						<label className="label">Nombre</label>
						<Input
							addonBefore={<ContainerOutlined />}
							className="tamano"
							placeholder="nombre"
							value={cursoData.name}
							// defaultValue={cursoData.name}
							onChange={(e) => setCursoData({ ...cursoData, name: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item>
						{/* <TextArea
					// placeholder="Autosize height with minimum and maximum number of lines"
					autoSize={{ minRows: 2, maxRows: 6 }}
					defaultValue={cursoData.description}
					onChange={(e) => setCursoData({ ...cursoData, description: e.target.value })}
				/> */}
						<label className="label">Descripción</label>
						<TextArea
							autoSize={{ minRows: 2, maxRows: 6 }}
							// defaultValue={cursoData.description}
							value={cursoData.description}
							onChange={(e) => setCursoData({ ...cursoData, description: e.target.value })}
						/>
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item>
						<label className="label">Precio</label>
						<Input
							addonBefore={<DollarOutlined />}
							className="tamano"
							type="number"
							step="0.01"
							placeholder="precio"
							value={cursoData.price}
							// defaultValue={cursoData.price}
							onChange={(e) => setCursoData({ ...cursoData, price: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Crear Curso
				</Button>
			</Form.Item>
		</Form>
	);
}
