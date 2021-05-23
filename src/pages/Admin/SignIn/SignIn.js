import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Spin, notification } from "antd";
import { apiLogin } from "../../../api/user";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import LogoFacci from "../../../assets/img/png/logoFaci.png";
import wave from "../../../assets/img/png/wave.png";
import bg from "../../../assets/img/svg/bg.svg";
import { getAccessToken } from "../../../api/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import jwtDecode from "jwt-decode";
import { logout } from "../../../api/auth";
import { values, size } from "lodash";
import { isEmailValid } from "../../../utils/validation";
import "./SignIn.scss";

export default function SignIn() {
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  if (getAccessToken()) {
    return <Redirect to="/admin" />;
  }
  const login = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    let validCount = 0;

    values(formData).some((value) => {
      value && validCount++;

      return null;
    });

    if (validCount !== size(formData)) {
      setSignUpLoading(false);
      notification["warning"]({
        message: "Completa todos los campos ",
        style: {backgroundColor: '#FADF62'} 
      });
    } else {
      if (!isEmailValid(formData.email)) {
        setSignUpLoading(false);
        notification["warning"]({
          message: "Email invalido",
          style: {backgroundColor: '#FADF62'} 
        });
        return null;
      } else if (size(formData.password) < 6) {
        setSignUpLoading(false);
        notification["warning"]({
          message: "La contraseña deber tener al menos 6 carácteres",
          style: {backgroundColor: '#FADF62'} 
        });
        return null;
      }
      const result = await apiLogin(formData);
      const tr = validarToken(result);

      if (tr === true) {
        notification["error"]({
          message: "No eres administrador, lo siento",
          style: {backgroundColor: '#FB9382'} 
          
        });
        setSignUpLoading(false);
      } else if (result.message) {
        notification["error"]({
          message: result.message,
          style: {backgroundColor: '#FB9382'} 
        });
        setSignUpLoading(false);
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        notification["success"]({
          message: "Login correcto",
          style: {backgroundColor: '#B8FB82'} 
        });
        window.location.href = "/admin";
      }
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <img className="wave" src={wave} alt="wave"></img>
      <div className="container">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={login} onChange={onChange}>
            <img src={LogoFacci} className="facci" alt="logoFacci" />

            {/* <h2 className="title">Login</h2> */}
            <div className="input-div one">
              <div className="i">
                <UserOutlined style={{ color: "#38d39f" }} />
              </div>
              <div className="div">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  name="email"
                  defaultValue={formData.email}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <UnlockOutlined style={{ color: "#38d39f" }} />
              </div>
              <div className="div">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  name="password"
                  defaultValue={formData.password}
                />
              </div>
            </div>
            <Link to="/">Forgot Password?</Link>

            <Button className="btn" type="link" htmlType="submit">
              {!signUpLoading ? "Iniciar sesion" : <Spin animation="border" />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}

function validarToken(props) {
  const { accessToken } = props;

  if (!accessToken || accessToken === "null") {
    // setSignUpLoading(false);
    return null;
  }

  const user = jwtDecode(accessToken);

  if (user.role === "DOCENTE" || user.role === "ESTUDIANTE") {
    logout();
    return true;
  }
  return false;
}
