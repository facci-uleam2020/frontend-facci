import React, { useState, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Home from "../pages/Home";

import useAuth from "../hooks/useAuth";
import MenuTop from "../components/UserProfile/MenuTop";
import { getAccessToken } from "../api/auth";

import { getAvatarApi, getPerfil } from "../api/user";
import UserProfile from "../pages/UserProfile";

export default function LayouUserProfile(props) {
  const userId = props.match.params.id;
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { user, isLoading } = useAuth();

  const token = getAccessToken();

  const [userD, setUserD] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [load, setLoad] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getPerfil(token, userId).then((response) => {
      setUserD(response.Stored);
      setLoad(true);
      setReloadUsers(false);
    });
  }, [token, userId, reloadUsers]);

  useEffect(() => {
    setUserData({
      name: userD ? userD.name : "",
      lastname: userD ? userD.lastname : "",
      email: userD ? userD.email : "",
      role: userD ? userD.role : "",
      avatar: userD ? userD.avatar : "",
      birthday: userD ? userD.birthday : "",
      description: userD ? userD.description : "",
    });
  }, [userD]);

  useEffect(() => {
    if (userD ? userD.avatar : null) {
      getAvatarApi(userD.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [userD]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  if (!getAccessToken()) {
    return <Redirect to="/" />;
  }

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/" component={Home} />;
        <Redirect to="/" />
      </>
    );
  }
  //   if (usera.role === "ESTUDIANTE" && !isLoading) {
  //     return (
  //       <>
  //         <Route path="/" component={Home} />;
  //         <Redirect to="/" />
  //       </>
  //     );
  //   }

  if (user && !isLoading) {
    return (
      <Layout>
        {/* <MenuSidebar menuCollapsed={menuCollapsed} /> */}
        <Layout
          className="layout-panel"
          //   style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-panel__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
              userD={userD}
              avatar={avatar}
              setReloadUsers={setReloadUsers}
            />
          </Header>
          <Content className="layout-panel__content">
            {/* <LoadRoutes routes={routes} /> */}

            <UserProfile
              userD={userD}
              avatar={avatar}
              setReloadUsers={setReloadUsers}
              userData={userData}
              setUserData={setUserData}
              setAvatar={setAvatar}
              load={load}
              reloadUsers={reloadUsers}
            />
          </Content>
          <Footer className="layout-panel__footer">
            Facci-Uleam &copy; Copyright 2020 &copy;
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
