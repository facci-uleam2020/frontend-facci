import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import JwDecode from 'jwt-decode';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { minLengthValidation } from '../utils/formValidation';
import { ActiveUserApi } from '../api/user';
import './ActivateUser.scss';

export default function ActivateUser() {
	const { token } = useParams();
	const [inputs, setInputs] = useState({
		token: token,
		password: '',
		repeatPassword: '',
	});

	const [formValid, setFormValid] = useState({
		password: false,
		repeatPassword: false,
	});

	const { email } = JwDecode(token);

	const register = async (e) => {
		e.preventDefault()
		const { password, repeatPassword } = formValid;
		const passwordVal = inputs.password;
		const repeatPasswordVal = inputs.repeatPassword;
		if (!passwordVal || !repeatPasswordVal) {
			notification['error']({
				message: 'Todos los campos son obligatorios',
				style: { marginTop: 48 },
			});
		} else if (!password) {
			notification['error']({
				message: 'La contraseña minimo son 6 caracteres',
				style: { marginTop: 48 },
			});
		} else if (!repeatPassword) {
			notification['error']({
				message: 'La Repeticion de la contraseña minimo son 6 caracteres',
				style: { marginTop: 48 },
			});
		} else {
			if (passwordVal !== repeatPasswordVal) {
				notification['error']({
					message: 'Las contraseñas tienen que ser iguales.',
					style: { marginTop: 48 },
				});
			} else if (passwordVal === '123456' || repeatPasswordVal === '123456') {
				notification['error']({
					message: `Las contraseñas ${passwordVal} es muy basica cambiala para mas seguridad`,
					style: { marginTop: 48 },
				});
			} else {
				const result = await ActiveUserApi(inputs);

				if (!result) {
					notification['error']({
						message: result.message,
						style: { marginTop: 48 },
					});
				} else {
					notification['success']({
						message: result.message,
						style: { marginTop: 48 },
					});
					window.location.href = '/login';
				}
			}
		}
	};
	const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};
	const inputValidation = (e) => {
		const { type, name } = e.target;
		if (type === 'password') {
			setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
		}
	};

	return (
		<Row>
			<Col md={4}></Col>
			<Col md={16} className="colum">
				<h3 className="title">Activar Cuenta</h3>
				<Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
					<Form.Item>
						<Input
							//   prefix={<MailOutlined />}
							type="email"
							name="email"
							placeholder="Correo electronico"
							className="register-form__input"
							value={email}
							disabled={true}
							//   onChange={inputValidation}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							//   prefix={<LockOutlined />}
							type="password"
							name="password"
							placeholder="Contraseña"
							className="register-form__input"
							value={inputs.password}
							onChange={inputValidation}
						/>
					</Form.Item>
					<Form.Item>
						<Input
							//   prefix={<LockOutlined />}
							type="password"
							name="repeatPassword"
							placeholder="Repetir Contraseña"
							className="register-form__input"
							value={inputs.repeatPassword}
							onChange={inputValidation}
						/>
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" className="register-form__button">
							Activar Cuenta
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col md={4}></Col>
		</Row>
	);
}
