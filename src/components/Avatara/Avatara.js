import React from 'react';
import { Avatar } from 'antd';
import NoAvatar from '../../assets/img/png/no-avatar.png';

export default function Avatara(props) {
	const { avatar } = props;

	return (
		<>
			<Avatar
				style={{
					width: 40,
					height: 40,
					float: 'right',
					marginBottom: 10,
					marginTop: 10,
				}}
				src={avatar ? avatar : NoAvatar}
			/>
			{/* <Button onLoad={setreload}>hola</Button> */}
		</>
	);
}
