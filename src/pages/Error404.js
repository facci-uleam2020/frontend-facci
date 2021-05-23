import React from 'react';
import { Button, Result } from 'antd';
import './Error404.scss';
import { Link } from 'react-router-dom';

export default function Error404() {
	return (
		<Result
			className="result"
			status="404"
			title="404"
			subTitle="Lo siento, pagina no encontrada"
			extra={
				<Link to={'/'}>
					<Button type="primary">Regresar al inicio</Button>
				</Link>
			}
		/>
	);
}
