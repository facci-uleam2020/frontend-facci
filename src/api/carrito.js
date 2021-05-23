import { basePath, apiVersion } from './config';

export function addCarrito(token, data) {
	const url = `${basePath}/${apiVersion}/add-carrito`;
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

export function getCarritoApi(token, userId, estado) {
	const url = `${basePath}/${apiVersion}/list-carrito/${userId}?estado=${estado}`;

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
export function activateCarritoApi(token, carritoId, estado) {
	const url = `${basePath}/${apiVersion}//activate-carrito/${carritoId}`;
	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			estado: estado,
		}),
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

export function deleteCarApi(token, carId) {
	const url = `${basePath}/${apiVersion}/delete-car/${carId}`;

	const params = {
		method: 'DELETE',
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
			return result.message;
		})
		.catch((err) => {
			return err.message;
		});
}
