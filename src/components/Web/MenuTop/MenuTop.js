import React, { useState, useEffect } from 'react';
import { Menu, Button, Badge, Drawer, Tooltip, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { PoweroffOutlined, ShoppingCartOutlined, AlignRightOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import Logo from '../../../assets/img/png/logoFaci.png';
import './MenuTop.scss';

import { logout } from '../../../api/auth';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getAccessToken } from '../../../api/auth';
import jwt from 'jwt-simple';
import { SECRET_KEY } from '../../../utils/constants';
import { getAvatarApi, getPerfil } from '../../../api/user';
import Avatara from '../../Avatara';
import Car, { ListCarpending } from '../Car/Car';
import { getCarritoApi } from '../../../api/carrito';

export default function MenuTop(props) {
	// const { usera } = props;
	const token = getAccessToken();

	// console.log(usera);
	const usera = token ? jwt.decode(token, SECRET_KEY, true) : false;
	const [user, setUser] = useState([]);
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [userData, setUserData] = useState([]);
	const [total, setTotal] = useState([]);
	const [realod, setrRealod] = useState(false);

	const [carrito, setCarrito] = useState([]);
	const [carritoPending, setCarritoPending] = useState([]);
	const logoutUser = () => {
		notification['success']({
			message: 'Desconectado correctamente',
			style: { backgroundColor: '#B8FB82' },
		});
		logout();

		window.location.reload();
	};

	useEffect(() => {
		if (token) {
			getPerfil(token, usera.id).then((response) => {
				setUser(response.Stored);

				// setUserData(false);
			});
		}
	}, [token, usera.id]);
	useEffect(() => {
		setUserData({
			name: user ? user.name : '',
			lastname: user ? user.lastname : '',
			email: user ? user.email : '',
			role: user ? user.role : '',
			avatar: user ? user.avatar : '',
			birthday: user ? user.birthday : '',
		});
	}, [user]);
	useEffect(() => {
		if (user?.avatar) {
			getAvatarApi(user?.avatar).then((response) => {
				setAvatar(response);
			});
		} else {
			setAvatar(null);
		}
	}, [user]);
	useEffect(() => {
		if (avatar) {
			setUserData({ ...userData, avatar: avatar.file });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [avatar]);

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		realod
			? getCarritoApi(token, user?._id, true).then((response) => {
					setCarrito(response.carrito);
			  })
			: null;
		// eslint-disable-next-line no-unused-expressions
		realod
			? getCarritoApi(token, user?._id, false).then((response) => {
					setCarritoPending(response.carrito);
					console.log(response.carrito);
			  })
			: null;

		setrRealod(false);
	}, [token, user, realod]);
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		var totalAges = carrito?.reduce(
			(sum, value) => (typeof value.cursos.price == 'number' ? sum + value.cursos.price : sum),
			0
		);
		setTotal(totalAges);
	}, [carrito]);
	// var arr = JSON.parse(carrito);

	const showDrawer = () => {
		setVisibleDrawer(true);
		setrRealod(true);
	};
	const onClose = () => {
		setVisibleDrawer(false);
	};
	const [checked, setChecked] = useState(
		localStorage.getItem("theme") === "dark" ? true : false
	  );
	  useEffect(() => {
		document
		  .getElementsByTagName("HTML")[0]
		  .setAttribute("data-theme", localStorage.getItem("theme"));
	  }, [checked]);
	
	  const toggleThemeChange = () => {
		if (checked === false) {
		  localStorage.setItem("theme", "dark");
		  setChecked(true);
		} else {
		  localStorage.setItem("theme", "light");
		  setChecked(false);
		}
	  };

	  

	return (
		<Menu className="menu-top" mode="horizontal"  overflowedIndicator={<AlignRightOutlined style={{color: "#fff"}} />}>
			<Menu.Item className="menu-top__logo es">
				<Link to={'/'}>
					<img src={Logo} alt="facci" />
				</Link>
			</Menu.Item>
			<Menu.Item className="menu-top__item">
				<Link to={'/'}> Inicio </Link>
			</Menu.Item>
			<Menu.Item className="menu-top__item">
				<Link to={'/quienes-somos'}> ¿Quienes somos? </Link>
			</Menu.Item>
			{token ? (
				<Menu.Item className="menu-top__item">
					<Link to={'/courses-acquired'}> Mis cursos </Link>
				</Menu.Item>
			) : null}

			<Menu.Item>
				<Tooltip title="Lista de Carrito" color="green">
					{token ? (
						<Button type="link" onClick={showDrawer} className="shopping">
							{/* <Badge size="small" dot>
						<ShoppingCartOutlined style={{ fontSize: 20 }} />
					</Badge> */}
							<Badge dot>
								<ShoppingCartOutlined style={{ fontSize: 20 }} />
							</Badge>
						</Button>
					) : null}
				</Tooltip>
				<Drawer
					title="Lista del carrito"
					width={720}
					onClose={onClose}
					visible={visibleDrawer}
					// bodyStyle={{ paddingBottom: 80, marginTop: 40 }}
					footer={
						<div
							style={{
								textAlign: 'right',
							}}
						>
							<h3 style={{ float: 'left' }}>Total a pagar: </h3>
							<h3 style={{ float: 'left', marginLeft: 5, color: 'green' }}> ${total}</h3>
							<Button style={{ marginRight: 8 }} onClick={onClose}>
								Cancel
							</Button>
							<Link to={`/courses/${user?._id}/purchase`}>
								<Button type="primary">Comprar</Button>
							</Link>
						</div>
					}
				>
					<Car carrito={carrito} setrRealod={setrRealod} />
					<DrawerComponent carritoPending={carritoPending} setrRealod={setrRealod} />
				</Drawer>
			</Menu.Item>
			<Menu.Item className="admin" >
				<h3>
					{user ? (
						user.role === 'ADMIN' ? (
							<Button type="ghost" className="boton">
								<Link to={{ pathname: `/admin` }}>Admin</Link>
							</Button>
						) : null
					) : null}
				</h3>
				
			</Menu.Item>
			<Menu.Item className="login">
				<h3>
					{user ? (
						user.role === 'ADMIN' && user?.course === true ? (
							<Button type="ghost" className="boton">
								<Link to={{ pathname: `/panel/${user._id}`, state: `${user._id}` }}>Panel</Link>
							</Button>
						) : null
					) : null}
				</h3>
				<h3>
					{user ? (
						user.role === 'DOCENTE' && user?.course === true ? (
							<Button type="ghost" className="boton">
								<Link to={{ pathname: `/panel/${user._id}`, state: `${user._id}` }}>Panel</Link>
							</Button>
						) : null
					) : null}
				</h3>
			</Menu.Item>
			
			

			{token ? (
				<Menu.Item>
					<Avatara avatar={avatar} />
				</Menu.Item>
			) : null}

			<SubMenu
				className="nombre"
				key="SubMenu"
				// icon={user ? <SettingOutlined /> : null}
				
				
				title={user ? [user.name, ' ', user.lastname] : null}
			>
				<Menu.ItemGroup  title="Usuario"  >
					<Menu.Item key="setting:1"   >
						<Link to={{ pathname: `/profile/${user?._id}`, state: `${user?._id}` }}>
							<p style={{float: "left"}} className="item" >Perfil</p>
						</Link>
					</Menu.Item>
					<Menu.Item key="setting:2"  >
					<Switch  defaultChecked={checked}
            onChange={() => toggleThemeChange()}  /> {checked ? 'Modo Dark': 'Modo Light'}
					</Menu.Item>
				
				</Menu.ItemGroup>
			</SubMenu>
			<Menu.Item>
				{token ? (
					<Button type="link" className="power" >
						<PoweroffOutlined onClick={logoutUser} />
					</Button>
				) : (
					<Button type="ghost" className="boton">
						<Link to={'/login'}>Login</Link>
					</Button>
				)}
			</Menu.Item>
			{/* <SocialLinks /> */}
		</Menu>
	);
}

function DrawerComponent(props) {
	const { carritoPending, setrRealod } = props;

	const [visibleDrawer, setVisibleDrawer] = useState(false);

	const showDrawer = () => {
		setVisibleDrawer(true);
		setrRealod(true);
	};
	const onClose = () => {
		setVisibleDrawer(false);
	};
	return (
		<>
			<Button type="default" onClick={showDrawer} style={{ position: 'fixed', bottom: '10%' }}>
				Pendientes
				{/* onClick={this.showChildrenDrawer} */}
			</Button>
			<Drawer title="Lista carrito pendiente" width={720} onClose={onClose} visible={visibleDrawer}>
				<ListCarpending carritoPending={carritoPending} setrRealod={setrRealod} />
			</Drawer>
		</>
	);
}
