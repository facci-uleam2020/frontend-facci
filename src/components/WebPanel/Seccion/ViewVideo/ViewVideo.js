import React, { useEffect, useState } from 'react';
import { getVideoSeccion } from '../../../../api/seccion';
import { Image } from 'antd';
import Novideo from './../../../../assets/img/jpg/no-video.jpg';

export default function ViewVideo(props) {
	const { curso } = props;
	const [video, setVideo] = useState(null);
	useEffect(() => {
		if (curso) {
			getVideoSeccion(curso.video).then((response) => {
				setVideo(response);
			});
		} else {
			setVideo(null);
		}
	}, [curso]);

	return curso?.video ? (
		<video style={{ width: '100%' }} src={video} controls></video>
	) : (
		<Image preview={false} src={Novideo} />
	);
}
