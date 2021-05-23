import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { UsergroupAddOutlined, FormOutlined } from '@ant-design/icons';
import { getCursoActive } from '../../../api/curso';
import { getAccessToken } from '../../../api/auth';
import { useParams } from 'react-router-dom';

export default function Principal(props) {

	// let id = props.match.params
	const {id} = useParams()
	const [course, setCourse] = useState([])
	

const token = getAccessToken()
useEffect(() => {
	getCursoActive(token, true, id).then((response) => {
		setCourse(response.curso);
	});

	
}, [token,  id]);


	return (
		<div className="site-statistic-demo-card ">
			<Row gutter={16} >
				<Col span={6} >
					<Card className="card-admin animate__animated animate__bounceIn">
						{/* <img className="foto" src={nube} alt="" /> */}
						<Statistic
							// className="static"
							title="Estudiantes"
							value={1}
							// precision={2}
							valueStyle={{ color: '#3f8600' }}
							prefix={<UsergroupAddOutlined />}
							// suffix=""
						/>
					</Card>
				</Col>
				<Col span={6} >
					<Card className="card-admin animate__animated animate__bounceIn">
						{/* <img className="foto" src={nube} alt="" /> */}
						<Statistic
							// className="static"
							title="Cursos"
							value={course.length}
							// precision={2}
							valueStyle={{ color: '#3f8600' }}
							prefix={<FormOutlined />}
							// suffix=""
						/>
					</Card>
				</Col>
				</Row>
				</div>
	);
}
