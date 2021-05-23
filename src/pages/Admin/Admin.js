import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { getAccessToken } from '../../api/auth';
import { getUserAdminActive, getUserDocentesActive } from '../../api/user';
import nube from '../../assets/img/png/nube.png';
import { Pie, Doughnut } from 'react-chartjs-2';

import './Admin.scss';

export default function Admin() {
	const [userAdminActive, setUserAdminActive] = useState([]);
	const [userAdminInactive, setUserAdminInactive] = useState([]);
	const [usersActive, setUsersActive] = useState([]);
	const [usersInactive, setUsersInactive] = useState([]);

	const token = getAccessToken();

	useEffect(() => {
		getUserAdminActive(token, true).then((response) => {
			setUserAdminActive(response.user);
		});
		getUserAdminActive(token, false).then((response) => {
			setUserAdminInactive(response.user);
			// setReloadUsers(false)
		});
		getUserDocentesActive(token, true).then((response) => {
			setUsersActive(response.user);
		});
		getUserDocentesActive(token, false).then((response) => {
			setUsersInactive(response.user);
		});
	}, [token]);

	const active = userAdminActive.total;
	const inactive = userAdminInactive.total;
	const activeDocente = usersActive.total;
	const InactiveDocente = usersInactive.total;
	const userAdmin = active + inactive;
	const userDocente = activeDocente + InactiveDocente;
	const data = {
		labels: ['Admin Activo', 'Admin Inactivo'],
		datasets: [
			{
				data: [active, inactive],
				backgroundColor: ['#FF6384', '#36A2EB'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB'],
			},
		],
	};
	const datas = {
		labels: ['Docente Activo', 'Docente Inactivo'],
		datasets: [
			{
				data: [activeDocente, InactiveDocente],
				backgroundColor: ['#2EE92E', '#2E53E9'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB'],
			},
		],
	};

	return (
		<div className="site-statistic-demo-card ">
			<Row gutter={16} className="center">
				<Col span={6} className="spaci">
					<Card className="card-admin animate__animated animate__fadeInTopLeft">
						<img className="foto" src={nube} alt="" />
						<Statistic
							className="static"
							title="Usuarios Administrador"
							value={userAdmin}
							// precision={2}
							valueStyle={{ color: '#3f8600' }}
							prefix={<ArrowUpOutlined />}
							// suffix=""
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card className="card-admin animate__animated animate__fadeInTopRight">
						<img className="foto" src={nube} alt="" />

						<Statistic
							title="Usuarios Docentes"
							value={userDocente}
							// precision={2}
							valueStyle={{ color: '#3f8600' }}
							prefix={<ArrowUpOutlined />}
							// suffix="%"
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={24} className="docente">
				<Col span={12} className="admin animate__animated animate__fadeInLeft">
					<Pie className="doug" data={data} />
				</Col>
				<Col span={12} className=" animate__animated animate__fadeInRight">
					<Doughnut className="doug" data={datas} />
				</Col>
			</Row>
		</div>
	);
}
