import React, { useState, useEffect } from "react";
import {
  Switch,
  Modal as ModalAntd,
  List,
  Avatar,
  Button,
  notification,
  Tooltip,
} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditOutlined,
  StopOutlined,
  CodepenCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Pagination from "../../../Pagination";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
  activeAddCourse,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
import Modal from "../../../Modal";
import EditUserAdmin from "../EditUserAdmin";
import JwtDecode from "jwt-decode";
import "./ListUserAdmin.scss";
import AddUserAdmin from "../AddUserAdmin";

const { confirm } = ModalAntd;
export default function ListUserAdmin(props) {
  const {
    location,
    history,
    userAdminActive,
    userAdminInactive,
    setReloadUsers,
  } = props;
  const [viewUserActives, setviewUserActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalContentAdmin, setModalContentAdmin] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Usuario");
    setModalContentAdmin(
      <AddUserAdmin
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <div className="list-users-admin">
      <div className="list-users-admin__header">
        <div className="list-users-admin__header-switch">
          <Switch
            defaultChecked
            onChange={() => setviewUserActives(!viewUserActives)}
          />
          <span>
            {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button
          className="boton animate__animated animate__slideInRight"
          type="primary"
          onClick={addUserModal}
        >
          <UserAddOutlined /> Nuevo Usuario
        </Button>
      </div>
      {viewUserActives ? (
        <UsersActiveAdmin
          userAdminActive={userAdminActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContentAdmin}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactiveAdmin
          setReloadUsers={setReloadUsers}
          userAdminInactive={userAdminInactive}
        />
      )}
      <Pagination
        location={location}
        history={history}
        usersActive={userAdminActive}
        usersInactive={userAdminInactive}
        viewUserActives={viewUserActives}
        className="pagination"
      />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContentAdmin}
      </Modal>
    </div>
  );
}

function UsersActiveAdmin(props) {
  const {
    userAdminActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;
  const editUserAd = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar a :  ${user.name} ${user.lastname}`);
    setModalContent(
      <EditUserAdmin
        setReloadUsers={setReloadUsers}
        user={user}
        setIsVisibleModal={setIsVisibleModal}
      />
    );
  };

  return (
    <List
      className="users-active-admin"
      itemLayout="horizontal"
      dataSource={userAdminActive?.docs}
      // loading={!userAdminActive }
      renderItem={(user) => (
        <UserActiveAdmin
          editUserAd={editUserAd}
          user={user}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}
function UserActiveAdmin(props) {
  const { user, editUserAd, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user?.avatar) {
      getAvatarApi(user?.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  const desactivateUser = () => {
    const accessToken = getAccessToken();

    const userToken = JwtDecode(accessToken);
    // console.log(userToken._id)
    if (user?._id === userToken?.id) {
      notification["error"]({
        message: "Estas logeado no puedes bloquearte",
      });
    } else {
      activateUserApi(accessToken, user?._id, false)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setReloadUsers(true);
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessToken();
    const userToken = JwtDecode(accessToken);
    if (user?._id === userToken?.id) {
      notification["error"]({
        message: "Estas logeado no puedes eliminarte",
      });
    } else {
      confirm({
        title: "Eliminando usuario",
        content: `¿Estas seguro que deseas eliminar a ${user?.name} ${user?.lastname}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteUserApi(accessToken, user?._id)
            .then((response) => {
              notification["success"]({
                message: response,
              });
              setReloadUsers(true);
            })
            .catch((err) => {
              notification["error"]({
                message: err,
              });
              //     .then((response) => {

              //     .catch((err) => {
            });
        },
      });
    }
  };

  const activeAddCour = (user) => {
    
    const token = getAccessToken();
    console.log(user?.course);
    activeAddCourse(token, user?.course ? false : true , user._id).then((res) => {
      notification["success"]({
        message: res.message,
      });
      setReloadUsers(true);
    });
  };
  return (
    <List.Item
      actions={[
        <Tooltip title="editar usuario">
          <Button type="primary" onClick={() => editUserAd(user)}>
            <EditOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title="desactivar usuario">
          <Button
            type="danger"
            style={{ backgroundColor: "#E9D22E", borderColor: "#E9D22E" }}
            onClick={desactivateUser}
          >
            <StopOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title="Eliminar usuario">
          <Button type="danger" onClick={showDeleteConfirm}>
            <DeleteOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title={user?.course ? "deshabilitar para crear curso": "habilitar para crear curso"}>
          <Button
            type="danger"
            style={{ backgroundColor: "#489226 ", borderColor: "#489226 " }}
            onClick={() => activeAddCour(user)}
          >
            <CodepenCircleOutlined />
          </Button>
        </Tooltip>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
     ${user?.name ? user?.name : " ..."} 
     ${user?.lastname ? user?.lastname : "..."}
     `}
        description={user?.email}
      />
    </List.Item>
  );
}

function UsersInactiveAdmin(props) {
  const { userAdminInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active-admin"
      itemLayout="horizontal"
      dataSource={userAdminInactive?.docs}
      renderItem={(user) => (
        <UserInactiveAdmin user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactiveAdmin(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user?.avatar) {
      getAvatarApi(user?.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  const activateUser = () => {
    const accessToken = getAccessToken();

    activateUserApi(accessToken, user?._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessToken();
    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que deseas eliminar a ${user.name} ${user.lastname}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
            //     .then((response) => {

            //     .catch((err) => {
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          style={{ backgroundColor: "#5A9401", borderColor: "#5A9401" }}
          onClick={activateUser}
        >
          <CheckOutlined />
        </Button>,

        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
         ${user?.name ? user?.name : " ..."} 
         ${user?.lastname ? user?.lastname : "..."}
         `}
        description={user.email}
      />
    </List.Item>
  );
}
