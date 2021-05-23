import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FolderAddOutlined, HomeOutlined } from '@ant-design/icons';

import './MenuSidebar.scss';

function MenuSidebar(props) {
	const { menuCollapsed, location } = props;
	const id = props.match.params.id;
	const { Sider } = Layout;
	return (
		<Sider className="panel-sidebar" collapsed={menuCollapsed}>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
				<Menu.Item key="/panel/:id">
					<Link to={{ pathname: `/panel/${id}`, state: `${id}` }} className="center">
						<HomeOutlined />
						<span className="nac-text">Inicio</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="/panel/:id/cursos">
					<Link to={{ pathname: `/panel/${id}/cursos`, state: `${id}` }} className="center">
						<FolderAddOutlined />
						<span className="nac-text">Curso</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="/panel/:id/students">
					<Link to={{ pathname: `/panel/${id}/students`, state: `${id}` }} className="center">
						<FolderAddOutlined />
						<span className="nac-text">Estudiantes</span>
					</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
}
export default withRouter(MenuSidebar);
