import { basePath, apiVersion } from './config';

export function getCompraApi(token, userId, cursos) {
	const url = `${basePath}/${apiVersion}/list-compras/${userId}?cursos=${cursos}`;

	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};
	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function getPurchase(token, userId) {
	const url = `${basePath}/${apiVersion}/list-purchase/${userId}`;

	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};
	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}
export function getPurchaseCourse(token, courseId) {
	const url = `${basePath}/${apiVersion}/list-purchase-course/${courseId}`;

	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};
	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}



export function addPay(token, data) {
	const url = `${basePath}/${apiVersion}/add-compras`;
	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(data),
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result.message;
		})
		.catch((err) => {
			return err.message;
		});
}

export function addPayCar(token, data) {
	const url = `${basePath}/${apiVersion}/add-purchase-car`;
	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(data),
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result.message;
		})
		.catch((err) => {
			return err.message;
		});
}

export function getPurchaseApi(token, userId, courseId){

	const url = `${basePath}/${apiVersion}/query-compras/${userId}?courseId=${courseId}`;

	const params = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};
	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}
