import React, { useEffect, useState } from 'react';
import { List, Image, Button, notification, Tooltip, Modal } from 'antd';
import './Car.scss';

import NoAvatar from '../../../assets/img/png/no-avatar.png';
import { WarningOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { getImgCurso } from '../../../api/curso';
import { activateCarritoApi, deleteCarApi } from '../../../api/carrito';
import { getAccessToken } from '../../../api/auth';
const { confirm } = Modal;
export default function Car(props) {
	const { carrito, setrRealod } = props;

	return (
		<List
			className="list-carrito"
			itemLayout="horizontal"
			dataSource={carrito}
			renderItem={(data) => <ListCar data={data} setrRealod={setrRealod} />}
		/>
	);
}

function ListCar(props) {
	const { data, setrRealod } = props;
	const token = getAccessToken();
	const [img, setImg] = useState(null);
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		data?.cursos?.img
			? getImgCurso(data?.cursos?.img).then((response) => {
					setImg(response);
			  })
			: false;
	}, [data]);

	const PendingCar = () => {
		activateCarritoApi(token, data._id, false).then((response) => {
			notification['success']({
				message: response,
				style: { marginTop: 50 },
			});
			setrRealod(true);
		});
	};
	const showDeleteConfirm = () => {
		confirm({
			title: 'Eliminando curso del carrito',
			content: `¿Estas seguro que deseas eliminar del carrito a ${data?.cursos?.name} ?`,
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				deleteCarApi(token, data._id)
					.then((response) => {
						notification['success']({
							message: response,
							style: { marginTop: 50 },
						});
						setrRealod(true);
					})
					.catch((err) => {
						notification['error']({
							message: err,
							style: { marginTop: 50 },
						});
						//     .then((response) => {

						//     .catch((err) => {
					});
			},
		});
	};

	return (
		<List.Item
			actions={[
				<Tooltip title="dejar para despues" color="#E9D22E">
					<Button
						type="danger"
						style={{ backgroundColor: '#E9D22E', borderColor: '#E9D22E' }}
						onClick={PendingCar}
					>
						<WarningOutlined />
					</Button>
				</Tooltip>,
				<Button type="danger" onClick={showDeleteConfirm}>
					<DeleteOutlined />
				</Button>,
			]}
		>
			<List.Item.Meta
				avatar={<Image width={50} height={50} preview={false} src={img ? img : NoAvatar} />}
				title={`
     ${data.cursos.name ? data.cursos.name : ' ...'} 
     
     `}
				description={<h3 style={{ color: 'green' }}>${data.cursos.price}</h3>}
			/>
		</List.Item>
	);
}

export function ListCarpending(props) {
	const { carritoPending, setrRealod } = props;

	return (
		<List
			className="list-carrito"
			itemLayout="horizontal"
			dataSource={carritoPending}
			renderItem={(data) => <ListCarRender data={data} setrRealod={setrRealod} />}
		/>
	);
}

function ListCarRender(props) {
	const { data, setrRealod } = props;
	const token = getAccessToken();
	const [img, setImg] = useState(null);
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		data?.cursos?.img
			? getImgCurso(data?.cursos?.img).then((response) => {
					setImg(response);
			  })
			: false;
	}, [data]);
	const ActiveCar = () => {
		activateCarritoApi(token, data._id, true).then((response) => {
			notification['success']({
				message: response,
				style: { marginTop: 50 },
			});
			setrRealod(true);
		});
	};
	const showDeleteConfirm = () => {
		confirm({
			title: 'Eliminando usuario',
			content: `¿Estas seguro que deseas eliminar a ${data?.cursos?.name} ?`,
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				deleteCarApi(token, data._id)
					.then((response) => {
						notification['success']({
							message: response,
							style: { marginTop: 50 },
						});
						setrRealod(true);
					})
					.catch((err) => {
						notification['error']({
							message: err,
							style: { marginTop: 50 },
						});
						//     .then((response) => {

						//     .catch((err) => {
					});
			},
		});
	};

	return (
		<List.Item
			actions={[
				<Tooltip title="Añadir a la compra" color="#E9D22E">
					<Button
						type="danger"
						style={{ backgroundColor: '#5A9401', borderColor: '#5A9401' }}
						onClick={ActiveCar}
					>
						<CheckOutlined />
					</Button>
				</Tooltip>,
				<Button type="danger" onClick={showDeleteConfirm}>
					<DeleteOutlined />
				</Button>,
			]}
		>
			<List.Item.Meta
				avatar={<Image width={50} height={50} preview={false} src={img ? img : NoAvatar} />}
				title={`
     ${data.cursos.name ? data.cursos.name : ' ...'} 
     
     `}
				description={<h3 style={{ color: 'green' }}>${data.cursos.price}</h3>}
			/>
		</List.Item>
	);
}
