import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../../api/user";

import { getAccessToken } from "../../../../api/auth";
import { isEmailValid } from "../../../../utils/validation";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;

  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      birthday: user.birthday,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    e.preventDefault();
    const token = getAccessToken();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["warning"]({
          message: "Las contraseñas deben ser iguales",
          style: { backgroundColor: "#FADF62" },
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }
    if (!userUpdate.name || userUpdate.name === "") {
      notification["warning"]({
        message: "El nombre  es obligatorio",
        style: { backgroundColor: "#FADF62" },
      });
    } else if (!userUpdate.lastname || userUpdate.lastname === "") {
      notification["warning"]({
        message: "Los Apellidos son  obligatorios",
        style: { backgroundColor: "#FADF62" },
      });
    } else if (!isEmailValid(userUpdate.email)) {
      notification["warning"]({
        message: "Email invalido",
        style: { backgroundColor: "#FADF62" },
      });
      return null;
    } else if (!userUpdate.email || userUpdate.email === "") {
      notification["error"]({
        message: "El email es obligatorio",
      });
    }
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
        });

        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
          style: { backgroundColor: "#B8FB82" },
        });
      });
      console.log(userUpdate);
      setIsVisibleModal(false);
      setReloadUsers(true);
    }
  };
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
        onChange={onChange}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser, onChange } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateUser} onChange={onChange}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              type="text"
              value={userData.name}
              name="name"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="Apellidos"
              value={userData.lastname}
              name="lastname"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Correo electronico"
              type="email"
              value={userData.email}
              name="email"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccióna una rol"
              name="role"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e })}
            >
              <Option value="ADMIN">Administrador</Option>
              <Option value="DOCENTE">Docente</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              name="password"
              // value={userData.password}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              name="repeatPassword"
              value={userData.repeatPassword}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={updateUser}
          className="btn-submit"
        >
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
