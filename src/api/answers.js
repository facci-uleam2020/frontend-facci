import { basePath, apiVersion } from './config';

export function getAnswersApi(token, userId, idQuestion) {
	const url = `${basePath}/${apiVersion}/list-answers/${userId}?exam=${idQuestion}`;

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



export function addAnswersApi(token, data) {
	
	const url = `${basePath}/${apiVersion}/add-answers`;

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
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}


export function updateAnswerApi(token, data, answersId) {
	const url = `${basePath}/${apiVersion}/update-answers/${answersId}`;

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


export function deleteAnswersApi(token, answersId) {
	const url = `${basePath}/${apiVersion}/delete-answers/${answersId}`;

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


export function getAnswersWebApi(token, idQuestion) {
	const url = `${basePath}/${apiVersion}/list-answers-web/${idQuestion}`;

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

