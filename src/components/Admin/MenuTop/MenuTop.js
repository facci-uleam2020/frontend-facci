import React, { useState, useEffect } from 'react';
import { logout } from '../../../api/auth';
import { Link } from 'react-router-dom';
import Avatara from '../../../components/Avatara';

import { Button, notification, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';

import { getAccessToken } from '../../../api/auth';
import jwt from 'jwt-simple';
import { SECRET_KEY } from '../../../utils/constants';
import { getAvatarApi, getPerfil } from '../../../api/user';
import logoFacci from '../../../assets/img/png/logoFaci.png';

import './MenuTop.scss';

export default function MenuTop(pro) {
	const token = getAccessToken();
	const usera = jwt.decode(token, SECRET_KEY, true);
	const [user, setUser] = useState([]);
	const { menuCollapsed, setMenuCollapsed } = pro;
	const [logoutValid, setLogoutValid] = useState(false);
	const { SubMenu } = Menu;
	const [avatar, setAvatar] = useState(null);
	const [userData, setUserData] = useState([]);

	let id = usera?.id;

	const logoutUser = () => {
		notification['success']({
			message: 'Desconectado correctamente',
			style: { backgroundColor: '#B8FB82' },
		});
		logout();

		setLogoutValid(true);

		window.location.reload();
	};

	useEffect(() => {
		getPerfil(token, id).then((response) => {
			setUser(response.Stored);

			// setUserData(false);
		});
	}, [token, id]);
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

	// function actual() {
	//   let fecha = new Date(); //Actualizar fecha.
	//   let hora = fecha.getHours(); //hora actual
	//   let minuto = fecha.getMinutes(); //minuto actual
	//   let segundo = fecha.getSeconds(); //segundo actual
	//   if (hora < 10) {
	//     //dos cifras para la hora
	//     hora = "0" + hora;
	//   }
	//   if (minuto < 10) {
	//     //dos cifras para el minuto
	//     minuto = "0" + minuto;
	//   }
	//   if (segundo < 10) {
	//     //dos cifras para el segundo
	//     segundo = "0" + segundo;
	//   }
	//   //devolver los datos:
	//   let mireloj = hora + " : " + minuto + " : " + segundo;
	//   return mireloj;
	// }
	// function actualizar() {
	//   //función del temporizador
	//   let mihora = actual(); //recoger hora actual
	//   let mireloj = document.getElementById("reloj"); //buscar elemento reloj
	//   mireloj.innerHTML = mihora; //incluir hora en elemento
	// }
	// setInterval(actualizar, 1000); //iniciar temporizador
	// function outputEvent() {}

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
		<>
			{/* <div id="reloj"> 00 : 00 : 00</div> */}
			<div className="menu-top">
				<div className="menu-top__left">
					<img className="menu-top__left-logo" src={logoFacci} alt="facci" />
					<Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
						{menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</Button>
				</div>
				<div className="menu-top__right">
					{/* <Avatara avatar={avatar} setreload={outputEvent} /> */}
					<Avatara avatar={avatar} />
					<Menu className="menu" defaultSelectedKeys={['1']} mode="horizontal">
						<SubMenu
							className="nombre"
							key="SubMenu"
							// icon={user ? <SettingOutlined /> : null}
							title={user ? [user.name, ' ', user.lastname] : null}
						>
							<Menu.ItemGroup title="Usuario">
								<Menu.Item key="setting:1" className="subm">
									<Link to={{ pathname: `/profile/${user?._id}`, state: `${user?._id}` }}>
										Perfil
									</Link>
								</Menu.Item>
								<Menu.Item key="setting:2"><label>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => toggleThemeChange()}
          />
        </label></Menu.Item>
							</Menu.ItemGroup>
						</SubMenu>
					</Menu>
					<Button type="link" className="logout" onClick={logoutUser}>
						{logoutValid ? <SyncOutlined spin /> : <PoweroffOutlined />}
					</Button>
				</div>
			</div>
		</>
	);
}
