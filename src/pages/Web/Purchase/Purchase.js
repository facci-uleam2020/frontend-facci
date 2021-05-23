import React, { useEffect, useState } from 'react';
import { Row, Col, Button, List, Modal, Input, Card, Divider, notification, Spin } from 'antd';
import { Link,  useParams } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { getCursoOneApi } from '../../../api/curso';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import './Purchase.scss';
import { getAccessToken } from '../../../api/auth';
import { getPerfil } from '../../../api/user';
import useAuth from '../../../hooks/useAuth';
import { addCarrito, getCarritoApi } from '../../../api/carrito';
import { addPay, addPayCar } from '../../../api/compras';

export default function Purchase(props) {
	const [courseActive, setCourseActive] = useState([]);
	const [courseActiveShopping, setCourseActiveShopping] = useState([]);
	// const [courseActiveShoppingLength, setCourseActiveShoppingLength] = useState([]);
	const [reload, setReload] = useState(false);
	const token = getAccessToken();
	const { id } = useParams();
	const [userData, setUserData] = useState([]);
	// const [checkbook, setCheckbook] = useState({
	// 	value: 1,
	// });
	const { user, isLoading } = useAuth();
	if (!getAccessToken()) {
		window.location.href = '/login';
	}

	const [signUpLoading, setSignUpLoading] = useState(false);

	const [validCard, setValidCard] = useState({
		issuer: '',
		maxLength: '',
	});
	const [state, setState] = useState({
		user: '',
		cursos: '',
		number: '',
		name: '',
		cvc: '',
		expiry: '',
		exp_month: '',
		exp_year: '',
		focus: '',
	});

	useEffect(() => {
		setState({
			user: user?.id,
			cursos: courseActive?._id,
			number: '',
			name: '',
			cvc: '',
			expiry: '',
			exp_month: '',
			exp_year: '',
			focus: '',
			amount: courseActive?.price,
			email: user?.email,
			description: `Compra del curso ${courseActive?.name}`,
		});
	}, [courseActive, user]);

	useEffect(() => {
		getCursoOneApi(id).then((response) => {
			setCourseActive(response.cursos);
		});
		getCarritoApi(token, user?.id, true).then((response) => {
			setCourseActiveShopping(response.carrito);
		});
	}, [token, id, user, reload]);
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		user && !isLoading
			? getPerfil(token, user?.id).then((response) => {
					setUserData(response.Stored);
			  })
			: null;
	}, [token, user, isLoading]);

	// const onChange = (e) => {
	// 	// console.log('radio checked', e.target.value);
	// 	// this.setState({
	// 	//   value: e.target.value,
	// 	// });
	// 	setCheckbook({ value: e.target.value });
	// };

	// let a = courseActiveShopping.map((da) => da);
	// setResult(a);

	const datas = {
		data1: state,
		data2: courseActiveShopping,
	};

	const submitPaymentCar = (e) => {
		setSignUpLoading(true);
		e.preventDefault();
		if (validCard.issuer === 'unknown') {
			notification['error']({
				message: 'Tarjeta de credito desconocida',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.number || state.number === '') {
			notification['error']({
				message: 'Número de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.name || state.name === '') {
			notification['error']({
				message: 'Nombre de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.expiry || state.expiry === '') {
			notification['error']({
				message: 'El vencimiento de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.cvc || state.cvc === '') {
			notification['error']({
				message: 'El codigo de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else {
			addPayCar(token, datas).then((response) => {
				notification['success']({
					message: response,
					style: { marginTop: 50 },
				});
				setSignUpLoading(false);
				window.location.href = `/courses/${courseActive?._id}`;
			});
		}
	};

	const submitPayment = (e) => {
		setSignUpLoading(true);
		e.preventDefault();
		if (validCard.issuer === 'unknown') {
			notification['error']({
				message: 'Tarjeta de credito desconocida',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.number || state.number === '') {
			notification['error']({
				message: 'Número de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.name || state.name === '') {
			notification['error']({
				message: 'Nombre de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.expiry || state.expiry === '') {
			notification['error']({
				message: 'El vencimiento de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else if (!state.cvc || state.cvc === '') {
			notification['error']({
				message: 'El codigo de tarjeta inválido',
				style: { marginTop: 50 },
			});
			setSignUpLoading(false);
		} else {
			addPay(token, state).then((response) => {
				notification['success']({
					message: response,
					style: { marginTop: 50 },
				});
				setSignUpLoading(false);
				window.location.href = `/courses/${courseActive?._id}`;
			});
		}
	};

	return (
		<Row>
			<Col md={2}></Col>
			<Col md={14} className="row">
				<div className="link">
					<Link to="/courses">
						<Button type="link">Cursos </Button>
					</Link>
					<h3 style={{ marginLeft: -1 }}>
						<RightOutlined />
					</h3>
					{courseActive ? (
						<Link to={`/courses/${courseActive?._id}`}>
							<Button type="link">{courseActive?.name} </Button>
						</Link>
					) : null}
					<h3 style={{ marginLeft: -1 }}>
						<RightOutlined />
					</h3>
					<Link to={`/courses/${courseActive?._id}/purchase`}>
						<Button type="link">Compra </Button>
					</Link>
				</div>
				{/* <h3 className="texto">Pagar</h3>
				<Radio.Group onChange={onChange} value={checkbook.value}>
					<Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={1} className="a">
						Nueva Tarjeta de Pago
					</Radio>
					<Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={2}>
						Paypal
					</Radio>
				</Radio.Group>
	{checkbook.value === 1 ? <CardComponent /> : <h3 style={{ marginTop: 50 }}>Paypal</h3>} */}

				<h3 className="texto">Información del pago</h3>
				<Divider className="divider" />
				<CardComponent
					userData={userData}
					validCard={validCard}
					setValidCard={setValidCard}
					state={state}
					setState={setState}
					submitPayment={submitPayment}
				/>
			</Col>
			<Col md={5} className="row">
				<CardDetails
					// courseActiveShoppingLength={courseActiveShoppingLength}
					token={token}
					setReload={setReload}
					submitPaymentCar={submitPaymentCar}
					signUpLoading={signUpLoading}
					submitPayment={submitPayment}
					courseActive={courseActive}
					user={user}
					courseActiveShopping={courseActiveShopping}
				/>
			</Col>
			<Col md={1}></Col>
		</Row>
	);
}

function CardComponent(props) {
	const { userData, setValidCard, state, setState } = props;

	const handleFocus = (e) => {
		setState({
			...state,
			focus: e.target.name,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const cal = (cal) => {
		setValidCard(cal);
		// setValidCard(cal.maxLength);
		// console.log();
	};
	return (
		<Card className="cardComponent">
			<Row>
				<Col md={12}>
					<h3 className="h3">Nombre</h3>
					<p className="p">{userData?.name}</p>
					<h3 className="h3">Email</h3>
					<p className="p">{userData?.email}</p>
				</Col>
				<Col md={12}>
					<h3 className="h3">Apellidos</h3>
					<p className="p">{userData?.lastname}</p>
				</Col>
			</Row>
			<Divider className="divider" />
			<h3 className="texto">Información de la tarjeta</h3>
			<Divider className="divider" />
			<Row>
				<Col md={12}>
					<br></br>
					<Cards
						preview={true}
						cvc={state.cvc}
						expiry={state.expiry}
						focused={state.focus}
						name={state.name}
						number={state.number}
						locale={{ valid: 'valid thru' }}
						callback={cal}
					/>
				</Col>
				<Col md={12}>
					<form className="form-input">
						<div className="form-group">
							<label htmlFor="number">Número de la tarjeta</label>
							<Input
								type="number "
								className="form-control"
								name="number"
								maxLength="16"
								placeholder="Número de tarjeta"
								onChange={handleChange}
								onFocus={handleFocus}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="Nombre">Nombre</label>
							<Input
								type="text"
								className="form-control"
								name="name"
								maxLength="30"
								placeholder="Nombre"
								onChange={handleChange}
								onFocus={handleFocus}
							/>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="expiry">Vencimiento</label>
								<Input
									type="text"
									className="form-control"
									name="expiry"
									maxLength="4"
									placeholder="Expiración"
									onChange={handleChange}
									onFocus={handleFocus}
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="cvc">CVC</label>
								<Input
									type="text"
									className="form-control"
									name="cvc"
									maxLength="4"
									placeholder="CVC"
									onChange={handleChange}
									onFocus={handleFocus}
								/>
							</div>
						</div>
					</form>
				</Col>
			</Row>
			{/* <button type="button" className="btn btn-success btn-block btn-lg" onClick={submitPayment}>
				Pagar
			</button> */}
		</Card>
	);
}

function CardDetails(props) {
	const {
		courseActive,
		courseActiveShopping,
		submitPaymentCar,
		submitPayment,
		signUpLoading,
		user,
		token,
		setReload,
	} = props;
	const [agregar, setAgregar] = useState(false);
	const [visible, setVisible] = useState([]);

	const [pay, setPay] = useState([]);

	// console.log(courseActiveShopping.length === 1 ? true : false);
	const carritoData = {
		user: user?.id,
		cursos: courseActive?._id,
		estado: true,
	};
	const confirmacion = () => {
		setAgregar(true);
		setVisible(false);
		return courseActive
			? addCarrito(token, carritoData).then((response) => {
					notification['success']({
						message: 'cursos añadidos',
						style: { marginTop: 50 },
					});
					setReload(true);
			  })
			: null;
	};

	const negar = () => {
		setAgregar(false);
		setVisible(false);
	};
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		var totalAges = courseActiveShopping?.reduce(
			(sum, value) => (typeof value.cursos.price == 'number' ? sum + value.cursos.price : sum),
			0
		);
		setPay(totalAges);
	}, [courseActiveShopping]);

	return (
		<>
			{courseActiveShopping[0] !== undefined && courseActiveShopping[0]?.cursos?._id !== courseActive?._id ? (
				<Modal
					title="Carrito"
					visible={visible}
					onOk={confirmacion}
					onCancel={negar}
					okText="Si"
					cancelText="No"
				>
					<p>Desea agregar todos los cursos que estan en el carrito</p>
					{console.log(courseActiveShopping[0])}
				</Modal>
			) : null}
			{agregar && courseActiveShopping.length >= 1 ? (
				<Card className="cardDetails">
					<List
						className="list-cour animate__animated animate__slideInUp"
						itemLayout="horizontal"
						dataSource={courseActiveShopping}
						renderItem={(course) => <ListCourse course={course} />}
					/>
					<Divider />
					<h3 style={{ float: 'left' }}>Total a pagar: </h3>
					<h3 style={{ float: 'left', marginLeft: 5, color: 'green' }}> ${pay}</h3>
					<Divider className="divider" />
					<Button onClick={submitPaymentCar}>
						{!signUpLoading ? 'Comprar ahora' : <Spin animation="border" />}
					</Button>
				</Card>
			) : (
				<Card className="cardDetails">
					<h2>Resumen</h2>
					<h3>Nombre del curso:</h3>
					<p>{courseActive?.name}</p>
					<h3>Precio:</h3>
					<p>${courseActive?.price}</p>
					<Divider />

					<Button onClick={submitPayment} >
						{!signUpLoading ? 'Comprar ahora' : <Spin animation="border" />}
					</Button>
				</Card>
			)}

			{/* {courseActive ? (
				<Card className="cardDetails">
					<h2>Resumen</h2>
					<h3>Nombre del curso:</h3>
					<p>{courseActive?.name}</p>
					<h3>Precio:</h3>
					<p>${courseActive?.price}</p>
					<Divider />
					<Button>Realizar Pagos</Button>
				</Card>
			) : null} */}
		</>
	);
}

function ListCourse(props) {
	const { course } = props;

	return (
		<List.Item>
			<List.Item.Meta
				// avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
				title={`
         ${course?.cursos?.name ? course?.cursos?.name : '...'}
         
         `}
				description={`$ ${course?.cursos?.price} `}
			/>
		</List.Item>
	);
}
