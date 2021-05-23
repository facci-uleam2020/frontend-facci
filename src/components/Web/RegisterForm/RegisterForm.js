import React, { useState } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification, DatePicker } from 'antd';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { registrarEstudiante } from '../../../api/user';

import './RegisterForm.scss';
export default function RegisterForm() {
	const [inputs, setInputs] = useState({
		name: '',
		lastname: '',
		email: '',
		password: '',
		repeatPassword: '',
		birthday: '',
		role: 'ESTUDIANTE',
	});

	const [formValid, setFormValid] = useState({
		email: false,
		password: false,
		name: false,
		lastname: false,
		repeatPassword: false,
	});

	const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const inputValidation = (e) => {
		const { type, name } = e.target;
		if (type === 'text') {
			setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 3) });
		}

		if (type === 'email') {
			setFormValid({ ...formValid, [name]: emailValidation(e.target) });
		}

		if (type === 'password') {
			setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
		}
	};
	const register = async (e) => {
		e.preventDefault();

		const { email, name, lastname, password, repeatPassword } = formValid;
		const nameVal = inputs.name;
		const lastnameVal = inputs.lastname;
		const birthday = inputs.birthday;
		const emailVal = inputs.email;
		const passwordVal = inputs.password;
		const repeatPasswordVal = inputs.repeatPassword;

		if (!nameVal || !lastnameVal || !emailVal || !passwordVal || !repeatPasswordVal) {
			notification['error']({
				message: 'Todos los campos son obligatorios',
				style: { marginTop: 48 },
			});
		} else if (!name) {
			notification['error']({
				message: 'Los nombres son minimo 3 carateres  ',
				style: { marginTop: 48 },
			});
		} else if (!lastname) {
			notification['error']({
				message: 'Los apellidos son minimo 3 carateres ',
				style: { marginTop: 48 },
			});
		} else if (!email) {
			notification['error']({
				message: 'El email es incorrecto ',
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
		} else if (!birthday || birthday === '') {
			notification['error']({
				message: 'La fecha de nacimiento debe ser valida',
				style: { marginTop: 48 },
			});
		} else {
			if (passwordVal !== repeatPasswordVal) {
				notification['error']({
					message: 'Las contraseñas tienen que ser iguales.',
					style: { marginTop: 48 },
				});
			} else {
				const result = await registrarEstudiante(inputs);

				if (!result) {
					notification['error']({
						message: result,
						style: { marginTop: 48 },
					});
				} else {
					notification['success']({
						message: result,
						style: { marginTop: 48 },
					});
					resetForm();
				}
			}
		}
	};

	const resetForm = () => {
		const inputs = document.getElementsByTagName('input');

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].classList.remove('success');
			inputs[i].classList.remove('error');
		}

		setInputs({
			name: '',
			lastname: '',
			email: '',
			password: '',
			repeatPassword: '',
			birthday: '',
			role: 'ESTUDIANTE',
		});

		setFormValid({
			name: false,
			lastname: false,
			email: false,
			password: false,
			repeatPassword: false,
		});
	};

	return (
		<Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
			<Form.Item>
				<Input
					prefix={<UserOutlined />}
					type="text"
					name="name"
					placeholder="Nombres"
					className="register-form__input"
					value={inputs.name}
					onChange={inputValidation}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<UserOutlined />}
					type="text"
					name="lastname"
					placeholder="Apellidos"
					className="register-form__input"
					value={inputs.lastname}
					onChange={inputValidation}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<MailOutlined />}
					type="email"
					name="email"
					placeholder="Correo electronico"
					className="register-form__input"
					value={inputs.email}
					onChange={inputValidation}
				/>
			</Form.Item>
			<Form.Item>
				<DatePicker
					placeholder="Fecha de Nacimiento: 1997-18-09"
					value={inputs.birthday}
					onChange={(e) => setInputs({ ...inputs, birthday: e })}
					style={{ width: '100%' }}
					className="register-form__input"
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<LockOutlined />}
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
					prefix={<LockOutlined />}
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
					Crear cuenta
				</Button>
			</Form.Item>
		</Form>
	);
}
