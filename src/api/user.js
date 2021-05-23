import { basePath, apiVersion } from "./config";

export function apiLogin(data) {
  const url = `${basePath}/${apiVersion}/login`;

  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
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

export function getUserDocentes(token) {
  const url = `${basePath}/${apiVersion}/users/?role=DOCENTE`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export function getUserDocentesActive(token, status, page, limit) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}&role=DOCENTE&limit=${limit}&page=${page}`;
  // http://localhost:2002/api/v1/users-active?active=true&role=DOCENTE&skip=1&limit=5

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
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

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
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

export function activateUserApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      active: status,
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

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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

export function registrarDocente(token, data) {
  const url = `${basePath}/${apiVersion}/register-docente`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export function getUserAdmin(token) {
  const url = `${basePath}/${apiVersion}/users/?role=ADMIN`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export function getUserAdminActive(token, status, page, limit) {
  const url = `${basePath}/${apiVersion}/users-active/?active=${status}&role=ADMIN&limit=${limit}&page=${page}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export function registrarEstudiante(data) {
  const url = `${basePath}/${apiVersion}/register-estudiante`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export function getPerfil(token, userId) {
  const url = `${basePath}/${apiVersion}/get-perfil/${userId}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
export function getUserWeb(userId) {
  const url = `${basePath}/${apiVersion}/get-user-web/${userId}`;

  const params = {
    method: "GET",
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

export function ActiveUserApi(data) {
  const url = `${basePath}/${apiVersion}/activate-verify`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

export function sendEmailResetPasswordApi(data) {
  const url = `${basePath}/${apiVersion}/send-mail-reset`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export function ResetPasswordApi(data) {
  const url = `${basePath}/${apiVersion}/reset-password`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

export function activeAddCourse(token, user, userId) {
  let data = { course: user };
  console.log(data);

  const url = `${basePath}/${apiVersion}/activate-add-course/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
