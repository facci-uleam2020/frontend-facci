import { basePath, apiVersion } from './config';

export function getCursoActive(token, estado, idUser) {
	const url = `${basePath}/${apiVersion}/list-curso/${idUser}?estado=${estado}`;

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

export function getCursoShopingApi(token, id, estado) {
	const url = `${basePath}/${apiVersion}/list-curso-shopping/${id}?estado=${estado}`;

	const params = {
		method: 'GET',
		headers: {
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
export function getCursoFiveWebApi(estado) {
	const url = `${basePath}/${apiVersion}/list-curso-five?estado=${estado}`;

	const params = {
		method: 'GET',
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
export function getCursoWeb(estado, limit, page) {
	const url = `${basePath}/${apiVersion}/list-curso-web?estado=${estado}&limit=${limit}&page=${page}`;

	const params = {
		method: 'GET',
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

export function getCursoOneApi(idCurso) {
	
	const url = `${basePath}/${apiVersion}/query-curso/${idCurso}`;

	const params = {
		method: 'GET',
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
export function uploadImgCurso(token, img, cursoId) {
	const url = `${basePath}/${apiVersion}/upload-img/${cursoId}`;

	const formData = new FormData();
	formData.append('img', img, img.name);
	console.log(img);

	const params = {
		method: 'PUT',
		body: formData,
		headers: {
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

export function getImgCurso(cursoName) {
	const url = `${basePath}/${apiVersion}/get-img/${cursoName}`;

	return fetch(url)
		.then((response) => {
			return response.url;
		})
		.catch((err) => {
			return err.message;
		});
}

export function updateCursoApi(token, curso, cursoId) {
	const url = `${basePath}/${apiVersion}/update-curso/${cursoId}`;

	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(curso),
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

export function activateCursoApi(token, cursoId, estado) {
	const url = `${basePath}/${apiVersion}/active-curso/${cursoId}`;
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

export function deleteCursoApi(token, cursoId) {
	const url = `${basePath}/${apiVersion}/remove-curso/${cursoId}`;

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
export function registrarCursoApi(token, data) {
	const url = `${basePath}/${apiVersion}/add-curso`;

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

export function listCursoOne(token, cursoId) {
	const url = `${basePath}/${apiVersion}/query-curso/${cursoId}`;

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
