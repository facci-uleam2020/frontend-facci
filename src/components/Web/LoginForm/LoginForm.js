import React, { useState } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { apiLogin,  sendEmailResetPasswordApi } from '../../../api/user';
import Modal from '../../../components/Modal';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import { emailValidation } from '../../../utils/formValidation';

import './LoginForm.scss';

export default function LoginForm(props) {
	const { signUpLoading, setSignUpLoading } = props;
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState([]);
  const [modalContentAdmin, setModalContentAdmin] = useState(null);
  
	const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const login = async (e) => {
		setSignUpLoading(true);
		e.preventDefault();
		const result = await apiLogin(inputs);
		console.log(result);
		if (result.message) {
			notification['error']({
				message: result.message,
				style: { marginTop: 45 },
			});
		} else {
			const { accessToken, refreshToken } = result;
			localStorage.setItem(ACCESS_TOKEN, accessToken);
			localStorage.setItem(REFRESH_TOKEN, refreshToken);
			notification['success']({
				message: 'login correcto',
				style: { marginTop: 45 },
			});
			window.location.href = '/';
		}
	};
	const resetModal = () => {
		setIsVisibleModal(true);
		setModalTitle('Cambiar contraseña');
		setModalContentAdmin(<FormResetPassword setIsVisibleModal={setIsVisibleModal}/>);
		// <AddUserAdmin setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
  };
  

	return (
		<>
			<Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
				<Form.Item>
					<Input
						prefix={<UserOutlined className="icon" />}
						type="email"
						name="email"
						placeholder="Correo Electronico"
						className="login-form__input"
					/>
				</Form.Item>
				<Form.Item>
					<Input
						prefix={<LockOutlined className="icon" />}
						type="password"
						name="password"
						placeholder="Contraseña"
						className="login-form__input"
					/>
				</Form.Item>
				<Form.Item className="forget">
					<p onClick={resetModal}>¿se te olvidó la contraseña</p>
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit" className="login-form__button">
						{!signUpLoading ? 'Iniciar sesion' : <Spin animation="border" />}
					</Button>
				</Form.Item>
			</Form>
			<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContentAdmin}
			</Modal>
		</>
	);
}

function FormResetPassword(props){
  const {setIsVisibleModal} = props
  // sendEmailResetPasswordApi
  const [inputs, setInputs] = useState({
    email: ""
  })
  const [formValid, setFormValid] = useState({
		email: false,
		
	});

  const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
  };
  const login = async (e) => {
    e.preventDefault();
    const { email, } = formValid;
    const emailVal = inputs.email;
    if ( !emailVal ) {
			notification['error']({
				message: 'El campo email obligatorio',
				style: { marginTop: 48 },
			});
		}else if (!email) {
			notification['error']({
				message: 'El email es incorrecto ',
				style: { marginTop: 48 },
			});
		}else {
      const result = await sendEmailResetPasswordApi(inputs);

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
          setIsVisibleModal(false)
          setInputs({email: ""})
          console.log(inputs);

					// resetForm();
				}
    }
    
    
  }
  const inputValidation = (e) => {
	
    const { type, name } = e.target;
		if (type === 'email') {
			setFormValid({ ...formValid, [name]: emailValidation(e.target) });
		}

		
	};

  return (
    <Form onChange={changeForm} onSubmitCapture={login}>
      <Form.Item>
        <Input
        	prefix={<UserOutlined className="icon" />}
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="login-form__input"
          // value={inputs.email}
					onChange={inputValidation}
          
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" >Reset password</Button>
      </Form.Item>
    </Form>
  )
}