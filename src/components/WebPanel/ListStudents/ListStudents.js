import React, { useEffect, useState } from 'react'
import "./ListStudents.scss"
import {Button, Table, Image} from "antd"
import NoAvatar from "../../../assets/img/png/no-img.png"
import { getImgCurso } from '../../../api/curso';
import { Link } from 'react-router-dom';
import { BookOutlined} from '@ant-design/icons';

export default function ListStudents(props) {
   const  {courses, id} = props 
   let uniqueId = 0;
    const columns = [
		{
			title: 'Img',
			dataIndex: 'img',
			key: `${courses ? courses?.img : null}`,
			render: (coursesRender) =>  <ListImgRender coursesRender={coursesRender} />,
		},
		{ title: 'Nombre', dataIndex: 'name', key: `${courses?.name}` },
		// { title: 'Descripcion', dataIndex: 'description', key: `${courses.description}` },
		

		{
			title: 'Acciones',
			dataIndex: '',
			key: '1',
			render: (course) => [
               
              
				<div key={course?._id} style={{ display: 'flex' }}>
					<Link to={{ pathname: `/panel/${id}/students/view/${course?._id}`, state: `${course?._id}` }}> 
						<Button type="primary">
					 <BookOutlined /> Ver Estudiantes
						</Button>
                    </Link> 
                    
                    </div>
					
			
			],
		},
	];
    return (
        <div>
            <Table
			className="boton animate__animated animate__fadeInUp"
			columns={columns}
			rowKey={(record) => {
				if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
				return record.__uniqueId;
			}}
			pagination={{ pageSize: 4 }}
			dataSource={courses}
		/>
        </div>
    )
}

function ListImgRender(props) {
	const { coursesRender } = props;
	const [img, setImg] = useState(null);

	useEffect(() => {
		if (coursesRender) {
			getImgCurso(coursesRender).then((response) => {
                setImg(response);
                console.log(response);
			});
		} else {
			setImg(null);
		}
	}, [coursesRender]);

	return <Image style={{cursor: "pointer"}} width={30} height={30} key="img" src={img ? img : NoAvatar} />;
}
