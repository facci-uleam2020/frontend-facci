import { basePath, apiVersion } from './config';

export function getSeccionApi(token, cursoId) {
	const url = `${basePath}/${apiVersion}/list-seccion/${cursoId}`;

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

export function getSeccionOneApi(SeccionId) {
	const url = `${basePath}/${apiVersion}/query-seccion/${SeccionId}`;

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

export function getSeccionWebApi(cursoId) {
	const url = `${basePath}/${apiVersion}/list-seccion-web/${cursoId}`;

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
export function addSeccion(token, data) {
	const url = `${basePath}/${apiVersion}/add-seccion`;
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

export function updateSeccion(token, seccion, seccionId) {
	const url = `${basePath}/${apiVersion}/updateCampus-video/${seccionId}`;

	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(seccion),
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

export function uploadVideoSecionApi(token, video, seccionId) {
	const url = `${basePath}/${apiVersion}/upload-video/${seccionId}`;

	const formData = new FormData();
	formData.append('video', video, video.name);

	const params = {
		method: 'POST',
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
export function getVideoSeccion(videoName) {
	const url = `${basePath}/${apiVersion}/get-video/${videoName}`;

	return fetch(url)
		.then((response) => {
			return response.url;
		})
		.catch((err) => {
			return err.message;
		});
}
export function updateVideoApi(token, video, videoName, seccionId) {
	const url = `${basePath}/${apiVersion}/update-video/${videoName}?id=${seccionId}`;
	const formData = new FormData();
	formData.append('video', video, video.name);

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

export function updateDataSeccion(token, seccion, seccionId) {
	const url = `${basePath}/${apiVersion}/update-seccion/${seccionId}`;

	const params = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(seccion),
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

export function deleteSeccionApi(token, cursoId, seccion) {
	const url = `${basePath}/${apiVersion}/remove-seccion/${cursoId}/${seccion}`;

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
