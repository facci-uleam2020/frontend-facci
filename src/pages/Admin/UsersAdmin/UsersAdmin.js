import React, { useState, useEffect } from 'react';
import './UsersAdmin.scss';
import { getAccessToken } from '../../../api/auth';
import { getUserAdminActive } from '../../../api/user';
import ListUserA from '../../../components/Admin/Users/ListUserAdmin';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
function UsersAdmin(props) {
	const { location, history } = props;
	const [userAdminActive, setUserAdminActive] = useState([]);
	const [userAdminInactive, setUserAdminInactive] = useState([]);
	const [reloadUsers, setReloadUsers] = useState(false);
	const { page = 1 } = queryString.parse(location.search);

	const token = getAccessToken();

	useEffect(() => {
		getUserAdminActive(token, true, page, 5).then((response) => {
			setUserAdminActive(response?.user);
		});
		getUserAdminActive(token, false, page, 5).then((response) => {
			setUserAdminInactive(response?.user);
		});
		setReloadUsers(false);
	}, [token, page, reloadUsers]);

	return (
		<div className="users-admin">
			<ListUserA
				location={location}
				history={history}
				setReloadUsers={setReloadUsers}
				userAdminActive={userAdminActive}
				userAdminInactive={userAdminInactive}
			/>
		</div>
	);
}

export default withRouter(UsersAdmin);
