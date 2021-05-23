import React, { useState } from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Bienvenido from "../../../assets/img/png/bienvenido.png";
import "./SignSignOut.scss";
import RegisterForm from "../../../components/Web/RegisterForm/RegisterForm";
import LoginForm from "../../../components/Web/LoginForm/LoginForm";
import { getAccessToken } from "../../../api/auth";

export default function SignSignOut() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const [signUpLoading, setSignUpLoading] = useState(false);

  if (getAccessToken()) {
    return <Redirect to="/" />;
  }
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Bienvenido} alt="fa" />
        </h1>

        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span className="loginSpan">Entrar</span>} key="1">
              <LoginForm
                signUpLoading={signUpLoading}
                setSignUpLoading={setSignUpLoading}
              />
            </TabPane>
            <TabPane tab={<span>Nuevo usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
