import React from 'react';
import { Button, Menu } from 'antd';

import { PoweroffOutlined } from '@ant-design/icons';
import Avatara from '../../../components/Avatara';
import logoFacci from '../../../assets/img/png/logoFaci.png';
// import "./MenuTop.scss";
import { Link } from 'react-router-dom';
export default function MenuTop(props) {
	const { userD, avatar } = props;
	const { SubMenu } = Menu;
	// const [logoutValid, setLogoutValid] = useState(false);

	return (
		<div className="menu-top">
			<div className="menu-top__left">
				<img className="menu-top__left-logo" src={logoFacci} alt="facci" />
				{/* <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
			</div>
			<div className="menu-top__right">
				<Avatara avatar={avatar} />
				<Menu className="menu" defaultSelectedKeys={['1']} mode="horizontal">
					<SubMenu
						className="nombre"
						key="SubMenu"
						// icon={user ? <SettingOutlined /> : null}
						title={userD ? [userD.name, ' ', userD.lastname] : null}
					>
						<Menu.ItemGroup title="Usuario">
							<Menu.Item key="setting:1" className="subm">
								<Link to={`profile/ ${userD ? userD._id : null}`}>Perfil</Link>
							</Menu.Item>
							<Menu.Item key="setting:2">Modo oscuro</Menu.Item>
						</Menu.ItemGroup>
					</SubMenu>
				</Menu>
				{userD ? (
					userD.role === 'DOCENTE' || userD.role === 'ESTUDIANTE' ? (
						<Button type="link" style={{ marginTop: 15 }}>
							<Link to={'/'}>
								<PoweroffOutlined /> Salir
							</Link>
						</Button>
					) : null
				) : null}
				{userD ? (
					userD.role === 'ADMIN' ? (
						<Button type="link" style={{ marginTop: 15 }}>
							<Link to={'/admin'}>
								<PoweroffOutlined /> Salir
							</Link>
						</Button>
					) : null
				) : null}
			</div>
		</div>
	);
}
