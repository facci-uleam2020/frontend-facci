import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification } from 'antd';
import { getAccessToken } from '../../../../api/auth';
import { updateDataSeccion } from '../../../../api/seccion';
export default function EditSeccionForm(props) {
	const { TextArea } = Input;
	const { curso, setReloadUsers, setIsVisibleModal } = props;
	const [seccionData, setSeccionData] = useState([]);

	useEffect(() => {
		setSeccionData({
			name: curso.name,
			description: curso.description,
			recurso: curso.recurso,
		});
	}, [curso]);

	const updateSeccion = (e) => {
		e.preventDefault();
		const token = getAccessToken();
		let seccionUpdate = seccionData;

		if (!seccionUpdate.name || seccionUpdate.name === '') {
			notification['warning']({
				message: 'El nombre  es obligatorio',
				style: { backgroundColor: '#FADF62' },
			});
		} else if (!seccionUpdate.description || seccionUpdate.description === '') {
			notification['warning']({
				message: 'La descripcion  es  obligatorios',
				style: { backgroundColor: '#FADF62' },
			});
		} else {
			updateDataSeccion(token, seccionUpdate, curso._id).then((result) => {
				notification['success']({
					message: result.message,
					style: { backgroundColor: '#B8FB82' },
				});
			});
			// console.log(userUpdate);
			setIsVisibleModal(false);
			setReloadUsers(true);
		}
	};
	return (
		<Form className="form-edit" onSubmitCapture={updateSeccion}>
			<Row gutter={24}>
				<Col span={24}>
					<Form.Item>
						<label className="label">Nombre</label>
						<Input
							// addonBefore={<ContainerOutlined />}
							className="tamano"
							placeholder="nombre"
							value={seccionData.name}
							defaultValue={seccionData.name}
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
							defaultValue={seccionData.description}
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
							placeholder="https://www.google.com/"
							value={seccionData.recurso}
							defaultValue={seccionData.recurso}
							onChange={(e) => setSeccionData({ ...seccionData, recurso: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Actualizar Seccion
				</Button>
			</Form.Item>
		</Form>
	);
}
