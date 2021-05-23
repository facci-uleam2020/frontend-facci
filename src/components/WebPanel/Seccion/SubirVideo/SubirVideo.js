import React, { useCallback, useEffect, useState } from 'react';
import NoAvatar from '../../../../assets/img/png/screenshot.png';
import { Image, Form, Button, notification, Spin } from 'antd';
import NoVideo from '../../../../assets/img/png/video.png';
// import { PlusOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import { LoadingOutlined } from '@ant-design/icons';

import './SubirVideo.scss';
import { getAccessToken } from '../../../../api/auth';
import { uploadVideoSecionApi, updateSeccion, getVideoSeccion, updateVideoApi } from '../../../../api/seccion';

export default function SubirVideo(props) {
	const { seccion, setIsVisibleModal, setReloadUsers } = props;
	const antIcon = <LoadingOutlined twoToneColor="#fff" style={{ fontSize: 24 }} spin />;

	const [signUpLoading, setSignUpLoading] = useState(false);
	const [verificarVideo, setVerificarVideo] = useState(null);
	const [video, setVideo] = useState(null);
	const [seccionData, setSeccionData] = useState({
		video: '',
	});
	useEffect(() => {
		if (video) {
			setSeccionData({ ...seccionData, video: video.file });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video]);

	useEffect(() => {
		if (seccion) {
			getVideoSeccion(seccion.video).then((response) => {
				setVerificarVideo(response);
			});
		} else {
			setVerificarVideo(null);
		}
	}, [seccion]);

	const addVideo = (e) => {
		e.preventDefault();
		setSignUpLoading(true);
		const token = getAccessToken();
		let seccionUpdate = seccionData;

		if (typeof seccionUpdate.video !== 'object') {
			notification['warning']({
				message: 'El video es obligatorio',
				style: { backgroundColor: '#FADF62' },
			});
			setSignUpLoading(false);
		} else {
			if (verificarVideo === 'http://localhost:2002/api/v1/get-video/undefined') {
				uploadVideoSecionApi(token, seccionUpdate.video, seccion._id).then((response) => {
					seccionUpdate.video = response.seccionName;

					updateSeccion(token, seccionUpdate, seccion._id).then((result) => {
						console.log(result);
						notification['success']({
							message: result.message,
						});
					});
					setSignUpLoading(false);
					setIsVisibleModal(false);
					setReloadUsers(true);
				});
			} else {
				console.log(seccion.video);
				updateVideoApi(token, seccionUpdate.video, seccion.video, seccion._id).then((response) => {
					seccionUpdate.video = response.seccionName;

					updateSeccion(token, seccionUpdate, seccion._id).then((result) => {
						console.log(result);
						notification['success']({
							message: result.message,
						});
					});
					setSignUpLoading(false);
					setIsVisibleModal(false);
					setReloadUsers(true);
				});
			}
		}
	};
	return (
		<div>
			<UploadVideo video={video} setVideo={setVideo} />

			<Form className="form-edit" onSubmitCapture={addVideo}>
				<Form.Item>
					{verificarVideo === 'http://localhost:2002/api/v1/get-video/undefined' ? (
						<Button
							style={
								signUpLoading
									? { backgroundColor: 'white', borderColor: 'white' }
									: { backgroundColor: '#2296ff', borderColor: '#2296ff' }
							}
							type="primary"
							htmlType="submit"
							className="btn-submit"
						>
							{signUpLoading ? <Spin indicator={antIcon} /> : 'Subir video'}
						</Button>
					) : (
						<Button
							style={
								signUpLoading
									? { backgroundColor: 'white', borderColor: 'white' }
									: { backgroundColor: '#2296ff', borderColor: '#2296ff' }
							}
							type="primary"
							htmlType="submit"
							className="btn-submit"
						>
							{signUpLoading ? <Spin indicator={antIcon} /> : 'Actualizar video'}
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	);
}

function UploadVideo(props) {
	const { video, setVideo } = props;
	

	

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			setVideo({ file, preview: URL.createObjectURL(file) });
		},
		[setVideo]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'video/mp4',
		noKeyboard: true,
		onDrop,
	});
	return (
		<div className="upload-video" {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Image preview={false} size={150} src={NoAvatar} />
			) : (
				<Image height={150} width={150} preview={false} src={video ? NoVideo : NoAvatar} />
			)}
		</div>
	);
}
