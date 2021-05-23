import React, { useCallback, useState, useEffect } from 'react';
import { Image, Form, Input, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import { DollarOutlined, ContainerOutlined } from '@ant-design/icons';
import { getImgCurso, updateCursoApi, uploadImgCurso } from '../../../api/curso';

import { getAccessToken } from '../../../api/auth';

import './EditCursoForm.scss';

export default function EditCursoForm(props) {
	const { curso, setIsVisibleModal, setReloadUsers } = props;
	const [img, setImg] = useState(null);
	const [cursoData, setCursoData] = useState({});

	useEffect(() => {
		setCursoData({
			name: curso.name,
			description: curso.description,
			price: curso.price,
			img: curso.img,
		});
	}, [curso]);

	const updateCurso = (e) => {
		e.preventDefault();
		const token = getAccessToken();
		let cursoUpdate = cursoData;

		if (!cursoUpdate.name || cursoUpdate.name === '') {
			notification['warning']({
				message: 'El nombre  es obligatorio',
				style: { backgroundColor: '#FADF62' },
			});
		} else if (!cursoUpdate.description || cursoUpdate.description === '') {
			notification['warning']({
				message: 'La descripcion  es  obligatorios',
				style: { backgroundColor: '#FADF62' },
			});
		} else if (!cursoUpdate.price || cursoUpdate.price === '') {
			notification['warning']({
				message: 'el precio es obligatorios',
				style: { backgroundColor: '#FADF62' },
			});
		}
		if (typeof cursoUpdate.img === 'object') {
			uploadImgCurso(token, cursoUpdate.img, curso._id).then((response) => {
				cursoUpdate.img = response.cursoName;
				updateCursoApi(token, cursoUpdate, curso._id).then((result) => {
					notification['success']({
						message: result.message,
					});
				});

				setIsVisibleModal(false);
				setReloadUsers(true);
			});
		} else {
			updateCursoApi(token, cursoUpdate, curso._id).then((result) => {
				notification['success']({
					message: result.message,
					style: { backgroundColor: '#B8FB82' },
				});
			});
			// console.log(userUpdate);
			setIsVisibleModal(false);
			setReloadUsers(true);
		}
	};

	useEffect(() => {
		if (curso.img) {
			getImgCurso(curso.img).then((response) => {
				setImg(response);
			});
		} else {
			setImg(null);
		}
	}, [curso]);

	useEffect(() => {
		if (img) {
			setCursoData({ ...cursoData, img: img.file });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [img]);

	return (
		<div className="edit-curso-form">
			<UploadImg img={img} setImg={setImg} />
			<EditForm curso={curso} updateCurso={updateCurso} cursoData={cursoData} setCursoData={setCursoData} />
		</div>
	);
}

function UploadImg(props) {
	const { img, setImg } = props;
	const [imgUrl, setImgUrl] = useState(null);

	useEffect(() => {
		if (img) {
			if (img.preview) {
				setImgUrl(img.preview);
			} else {
				setImgUrl(img);
			}
		} else {
			setImgUrl(null);
		}
	}, [img]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			setImg({ file, preview: URL.createObjectURL(file) });
		},
		[setImg]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		onDrop,
	});
	return (
		<div className="upload-img" {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Image preview={false} size={150} src={NoAvatar} />
			) : (
				<Image height={150} width={150} preview={false} src={img ? imgUrl : NoAvatar} />
			)}
		</div>
	);
}

function EditForm(props) {
	const { cursoData, setCursoData, updateCurso } = props;
	const { TextArea } = Input;
	return (
		<Form className="form-edit" onSubmitCapture={updateCurso}>
			<Row gutter={24}>
				<Col span={24}>
					<Form.Item>
						<label className="label">Nombre</label>
						<Input
							addonBefore={<ContainerOutlined />}
							className="tamano"
							placeholder="nombre"
							value={cursoData.name}
							defaultValue={cursoData.name}
							onChange={(e) => setCursoData({ ...cursoData, name: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item>
						{/* <TextArea
						// placeholder="Autosize height with minimum and maximum number of lines"
						autoSize={{ minRows: 2, maxRows: 6 }}
						defaultValue={cursoData.description}
						onChange={(e) => setCursoData({ ...cursoData, description: e.target.value })}
					/> */}
						<label className="label">Descripción</label>
						<TextArea
							autoSize={{ minRows: 2, maxRows: 6 }}
							defaultValue={cursoData.description}
							value={cursoData.description}
							onChange={(e) => setCursoData({ ...cursoData, description: e.target.value })}
						/>
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item>
						<label className="label">Precio</label>
						<Input
							addonBefore={<DollarOutlined />}
							className="tamano"
							type="number"
							step="0.01"
							placeholder="precio"
							value={cursoData.price}
							defaultValue={cursoData.price}
							onChange={(e) => setCursoData({ ...cursoData, price: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Actualizar Curso
				</Button>
			</Form.Item>
		</Form>
	);
}
