import React from 'react';
import { Button } from 'antd';

import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import logoFacci from '../../../assets/img/png/logoFaci.png';
import './MenuTop.scss';
import { Link } from 'react-router-dom';
export default function MenuTop(props) {
	const { menuCollapsed, setMenuCollapsed } = props;
	// const [logoutValid, setLogoutValid] = useState(false);

	return (
		<div className="menu-top">
			<div className="menu-top__left">
				<img className="menu-top__left-logo" src={logoFacci} alt="facci" />
				<Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
					{menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</div>
			<div className="menu-top__right">
				<Button type="link" className="power">
					<Link to={'/'}>
						<PoweroffOutlined /> Salir
					</Link>
				</Button>
			</div>
		</div>
	);
}
