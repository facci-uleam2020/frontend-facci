import React, { useEffect } from 'react';
import { useState } from 'react';
import { getAccessToken } from '../../../api/auth';
import { getPurchaseCourse } from '../../../api/compras';
import { Table, Image } from 'antd';
import { getAvatarApi } from '../../../api/user';
import NoAvatar from "../../../assets/img/png/no-avatar.png"
import { Link } from 'react-router-dom';
export default function ListStudentsView(props) {
     
	const { idCourse, id } = props.match.params;
	let uniqueId = 0;
    const [courseStudents, setCourseStudents] = useState([]);
    

    const token = getAccessToken();
    
	const columns = [
		{
			title: 'Img',
			dataIndex: `user`,
			// key: `${courses ? courses?.img : null}`,
			render: (coursesRender) => <ListImgRender coursesRender={coursesRender} />,
		},
		{
			title: 'Nombre',
			dataIndex: 'user',
			key: `${courseStudents?.user?.name}`,
			render: (coursesRender) => [coursesRender.name, ' ', coursesRender.lastname],
		},
		{
			title: 'Email',
			dataIndex: 'user',
			key: `${courseStudents?.user?.name}`,
			render: (coursesRender) => coursesRender.email,
		},
		// { title: 'Descripcion', dataIndex: 'description', key: `${courses.description}` },

		// {
		// 	title: 'Acciones',
		// 	dataIndex: '',
		// 	key: '1',
		// 	render: (course) => [

		// 		<div key={course?._id} style={{ display: 'flex' }}>
		// 			<Link to={{ pathname: `/panel/${id}/students/view/${course?._id}`, state: `${course?._id}` }}>
		// 				<Button type="primary">
		// 			 <BookOutlined /> Ver Estudiantes
		// 				</Button>
		//             </Link>

		//             </div>

		// 	],
		// },
	];
	console.log(courseStudents);

	useEffect(() => {
		getPurchaseCourse(token, idCourse).then((response) => {
			setCourseStudents(response.compras);
		});
    }, [token, idCourse]);
    

 

	return (
		<div>
            <Link style={{ float: 'left' , marginBottom: 20 }} to={`/panel/${id}/students`}>
				Regresar
			</Link>
            
			<Table
				className="boton animate__animated animate__fadeInUp"
				columns={columns}
				rowKey={(record) => {
					if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
					return record.__uniqueId;
				}}
				pagination={{ pageSize: 4 }}
				dataSource={courseStudents}
			/>
		</div>
	);
}

function ListImgRender(props) {
	const { coursesRender } = props;
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		if (coursesRender?.avatar) {
			getAvatarApi(coursesRender?.avatar).then((response) => {
				setAvatar(response);
			});
		} else {
			setAvatar(null);
		}
    }, [coursesRender]);
    console.log(coursesRender);
	

	return <Image style={{cursor: "pointer"}} width={30} height={30} key="img" src={avatar ? avatar : NoAvatar} />;
}