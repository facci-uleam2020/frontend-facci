import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { getImgCurso, listCursoOne } from '../../../api/curso';
import { getAccessToken } from '../../../api/auth';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import { CaretRightOutlined } from '@ant-design/icons';
import { getSeccionApi } from '../../../api/seccion';
import ListSeccion from '../../../components/WebPanel/Seccion/ListSeccion';

export default function Seccion(props) {
	const token = getAccessToken();
	const id = props.location.state;
	const idUser = props.match.params.id;
	const [cursoData, setCursoData] = useState([]);
	const [seccion, setSeccion] = useState([]);
	const [img, setImg] = useState(null);
	const { Panel } = Collapse;
	const [reloadUsers, setReloadUsers] = useState(false);

	useEffect(() => {
		listCursoOne(token, id).then((response) => {
			setCursoData(response.cursos);
		});

		setReloadUsers(false);
	}, [token, id, reloadUsers]);

	useEffect(() => {
		if (cursoData.img) {
			getImgCurso(cursoData.img).then((response) => {
				setImg(response);
			});
		} else {
			setImg(null);
		}
	}, [cursoData]);

	useEffect(() => {
		getSeccionApi(token, id).then((response) => {
			setSeccion(response.seccion);
		});
	}, [token, id, reloadUsers]);
	return (
		<>
			<Link style={{ float: 'left' }} to={`/panel/${idUser}/cursos`}>
				Regresar
			</Link>
			<br></br>
			<Row gutter={24} style={{ marginTop: 20 }}>
				<Col span={8}>
					<div className="site-card-border-less-wrapper">
						<Card className="card2 " title="Información del  Curso" bordered={false}>
							<Image
								width={100}
								height={80}
								key="img"
								src={img ? img : NoAvatar}
								style={{ marginBottom: '10%', marginLeft: '25%', marginRight: '25%' }}
							/>

							<br />
							<Collapse
								bordered={false}
								defaultActiveKey={['1']}
								expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
								className="site-collapse-custom-collapse"
							>
								<Panel header="Nombre" key="1" className="site-collapse-custom-panel">
									<p style={{ fontWeight: 'bold' }}>{cursoData.name}</p>
								</Panel>
								<Panel header="Descripcion" key="2" className="site-collapse-custom-panel">
									<p style={{ fontWeight: 'bold' }}>{cursoData.description}</p>
								</Panel>
								<Panel header="Precio" key="3" className="site-collapse-custom-panel">
									<p style={{ fontWeight: 'bold' }}>${cursoData.price}</p>
								</Panel>
								<Panel header="Estado" key="4" className="site-collapse-custom-panel">
									{cursoData.estado ? (
										<h4 style={{ color: 'green' }}>Activo</h4>
									) : (
										<h4 style={{ color: 'red' }}>Inactivo</h4>
									)}
								</Panel>
							</Collapse>
						</Card>
					</div>
				</Col>

				<Col span={16}>
					<ListSeccion setReloadUsers={setReloadUsers} token={token} id={id} seccion={seccion} />
				</Col>
			</Row>
		</>
	);
}
