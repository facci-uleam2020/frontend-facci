import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import MenuSidebar from "../components/Admin/MenuSidebar";
import MenuTop from "../components/Admin/MenuTop/MenuTop";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;

  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    if (user.role === "ESTUDIANTE" || user.role === "DOCENTE") {
      return (
        <>
          <Route path="/" component={Home} />;
          <Redirect to="/" />
        </>
      );
    }
  }

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />;
        <Redirect to="/admin/login" />
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSidebar menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              user={user}
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">
            Facci-Uleam &copy; Copyright 2020 &copy;{" "}
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
