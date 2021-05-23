import { basePath, apiVersion } from './config';


export function getExamApi(token, userId, cursos) {
	const url = `${basePath}/${apiVersion}/list-exam/${userId}?cursos=${cursos}`;

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


export function updateExamApi(token, data, examId) {
	const url = `${basePath}/${apiVersion}/update-exam/${examId}`;

	const params = {
		method: 'PUT',
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
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}


export function deleteExamApi(token, examId) {
	const url = `${basePath}/${apiVersion}/delete-exam/${examId}`;

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

export function addExamApi(token, data) {
	const url = `${basePath}/${apiVersion}/add-exam`;

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

export function getExamWebApi(token, cursos) {
	const url = `${basePath}/${apiVersion}/list-exam-web/${cursos}`;

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


export function updateExamPanelApi(token, data, examId) {
	const url = `${basePath}/${apiVersion}/update-exam-panel/${examId}`;

	const params = {
		method: 'PUT',
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
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

