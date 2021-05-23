import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, notification } from 'antd';
import { registrarDocente } from '../../../../api/user';
import { getAccessToken } from '../../../../api/auth';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { isEmailValid } from '../../../../utils/validation';

import './AddUserAdmin.scss';

export default function AddUserAdmin(props) {
	const { setIsVisibleModal, setReloadUsers } = props;
	const [userData, setUserData] = useState({
		role: 'ADMIN',
		course: false,
	});
	const addUser = (e) => {
		e.preventDefault();
		if (!userData.name || userData.name === '') {
			notification['warning']({
				message: 'Los nombres son requeridos',
			});
		} else if (!userData.lastname || userData.lastname === '') {
			notification['warning']({
				message: 'Los apellidos son requeridos',
			});
		} else if (!isEmailValid(userData.email)) {
			notification['warning']({
				message: 'Email invalido',
				style: { backgroundColor: '#FADF62' },
			});
			return null;
		} else if (!userData.email || userData.email === '') {
			notification['warning']({
				message: 'El email es requerido',
			});
		} else if (!userData.password || userData.password === '') {
			notification['warning']({
				message: 'El Apellido es requerido',
			});
		} else if (userData.password < 6) {
			notification['warning']({
				message: 'La contraseña debe tener máximo 6 carácteres',
			});
		} else if (!userData.birthday || userData.birthday === '') {
			notification['warning']({
				message: 'Debe ingresar su fecha de nacimiento',
			});
		} else {
			const accessToken = getAccessToken();

			registrarDocente(accessToken, userData)
				.then((response) => {
					notification['info']({
						message: response,
					});
					// activeEmail(accessToken, userData)
					setIsVisibleModal(false);
					setReloadUsers(true);
					setUserData({});
					setUserData({ role: 'DOCENTE' });
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
			<AddForm userData={userData} setUserData={setUserData} addUser={addUser} />
		</div>
	);
}
function AddForm(props) {
	const { userData, setUserData, addUser } = props;

	return (
		<Form className="form-add" onSubmitCapture={addUser}>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Nombres"
							value={userData.name}
							onChange={(e) => setUserData({ ...userData, name: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Apellidos"
							value={userData.lastname}
							onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<MailOutlined />}
							placeholder="Email"
							type="email"
							value={userData.email}
							onChange={(e) => setUserData({ ...userData, email: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<LockOutlined />}
							placeholder="password"
							type="password"
							value={userData.password}
							onChange={(e) => setUserData({ ...userData, password: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<DatePicker
							placeholder="Fecha de Nacimiento: 1997-18-09"
							value={userData.birthday}
							onChange={(e) => setUserData({ ...userData, birthday: e })}
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item>
						<Input
							className="centrar"
							disabled
							value={userData.role}
							onChange={(e) => setUserData({ ...userData, password: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Registrar
				</Button>
			</Form.Item>
		</Form>
	);
}
