import React, { useState } from 'react';

import { Form, Input, Button, Row, Col, notification } from 'antd';

import './AddSeccion.scss';
import { getAccessToken } from '../../../../api/auth';
import { addSeccion } from '../../../../api/seccion';
export default function AddSeccion(props) {
	const { id, setIsVisibleModal, setReloadUsers } = props;

	const [seccionData, setSeccionData] = useState({
		name: '',
		description: '',
		video: '',
		recurso: '',
		cursos: id,
	});

	const addUser = (e) => {
		e.preventDefault();
		if (!seccionData.name || seccionData.name === '') {
			notification['warning']({
				message: 'El nombre es requerido',
			});
		} else if (!seccionData.description || seccionData.description === '') {
			notification['warning']({
				message: 'La descripcion es requerida',
			});
		} else {
			const token = getAccessToken();
			addSeccion(token, seccionData)
				.then((response) => {
					notification['success']({
						message: response,
					});
					setSeccionData({ cursos: id });
					setIsVisibleModal(false);
					setReloadUsers(true);
				})
				.catch((err) => {
					notification['error']({
						message: err,
					});
				});
		}
	};
	return (
		<div className="add-user-form">
			<AddForm seccionData={seccionData} setSeccionData={setSeccionData} addUser={addUser} />
		</div>
	);
}

function AddForm(props) {
	const { setSeccionData, seccionData, addUser } = props;
	const { TextArea } = Input;
	return (
		<Form className="form-edit" onSubmitCapture={addUser}>
			<Row gutter={24}>
				<Col span={24}>
					<Form.Item>
						<label className="label">Nombre</label>
						<Input
							// addonBefore={<ContainerOutlined />}
							className="tamano"
							placeholder="nombre"
							value={seccionData.name}
							// defaultValue={cursoData.name}
							onChange={(e) => setSeccionData({ ...seccionData, name: e.target.value })}
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
							value={seccionData.description}
							onChange={(e) => setSeccionData({ ...seccionData, description: e.target.value })}
						/>
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item>
						<label className="label">Recurso</label>
						<Input
							addonBefore="http"
							className="tamano"
							type="text"
							step="0.01"
							placeholder="Recurso"
							value={setSeccionData.recurso}
							// defaultValue={cursoData.price}
							onChange={(e) => setSeccionData({ ...seccionData, recurso: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Crear Seccion
				</Button>
			</Form.Item>
		</Form>
	);
}
