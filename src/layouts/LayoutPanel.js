import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../pages/Home';
import './LayoutPanel.scss';
import useAuth from '../hooks/useAuth';
import MenuTop from '../components/WebPanel/MenuTop';
import MenuSidebar from '../components/WebPanel/MenuSidebar';
import { getAccessToken } from '../api/auth';
import jwt from 'jwt-simple';
import { SECRET_KEY } from '../utils/constants';

export default function LayoutPanel(props) {
	const { routes } = props;
	const { Header, Content, Footer } = Layout;
	const [menuCollapsed, setMenuCollapsed] = useState(false);

	const { user, isLoading } = useAuth();

	const token = getAccessToken();
	const usera = token ? jwt.decode(token, SECRET_KEY, true) : false;

	if (!user && !isLoading) {
		return (
			<>
				<Route path="/" component={Home} />;
				<Redirect to="/" />
			</>
		);
	}
	if (token ? usera.role === 'ESTUDIANTE' && !isLoading : null) {
		return (
			<>
				<Route path="/" component={Home} />;
				<Redirect to="/" />
			</>
		);
	}

	if (user && !isLoading) {
		return (
			<Layout>
				<MenuSidebar menuCollapsed={menuCollapsed} />
				<Layout className="layout-panel" style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}>
					<Header className="layout-panel__header">
						<MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
					</Header>
					<Content className="layout-panel__content">
						<LoadRoutes routes={routes} />
					</Content>
					<Footer className="layout-panel__footer">Facci-Uleam &copy; Copyright 2020 &copy;</Footer>
				</Layout>
			</Layout>
		);
	}
	return null;
}
function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
