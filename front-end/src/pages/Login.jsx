import React, { useEffect, useState } from "react";
import { CaretCircleLeft, User, UserGear, UserList } from "phosphor-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import * as styles from "./css/Login.css.jsx";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigation = useNavigate();

  const [currentScreen, setCurrentScreen] = useState(1);
  const [loginSelected, setLoginSelected] = useState(null);
  const [role, setRole] = useState(0);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleScreen = (num, role) => {
    setCurrentScreen(num);

    setData({
      login: "",
      password: "",
    });

    if (role) {
      setRole(role);
    }
  };

  const login = async () => {
    setLoadingRequest(true);

    try {
      await axios
        .post("http://localhost:8800/login", {
          login: data.login,
          password: data.password,
          role: role,
        })
        .then((resp) => {
          localStorage.setItem("jwt_session", resp.data.token);

          if (role === 1) {
            navigation(`/dashboard`);
          }

          if (role === 2) {
            navigation(`/dashboard/${resp.data.matricula}`);
          }

          if (role === 3) {
            navigation(
              `/dashboard/${resp.data.numero_conta}/${resp.data.cliente_CPF}`
            );
          }
        });
    } catch (e) {
      toast("Login e/ou senha incorreto!", {
        autoClose: 3000,
        theme: "light",
      });
      console.log(e);
    }

    setLoadingRequest(false);
  };

  return (
    <styles.Container>
      {currentScreen === 1 && (
        <styles.BoxesContainer>
          <styles.BoxItem onClick={() => handleScreen(2, 1)}>
            <UserGear size={35} color="#222" />
            <h3>Administrador/DBA</h3>
          </styles.BoxItem>

          <styles.BoxItem onClick={() => handleScreen(2, 2)}>
            <UserList size={38} color="#222" />
            <h3>Funcionário</h3>
          </styles.BoxItem>

          <styles.BoxItem onClick={() => handleScreen(2, 3)}>
            <User size={32} color="#222" />
            <h3>Cliente</h3>
          </styles.BoxItem>
        </styles.BoxesContainer>
      )}

      {currentScreen === 2 && (
        <>
          <styles.BackButton>
            <CaretCircleLeft
              size={40}
              color="#333"
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentScreen(currentScreen - 1)}
              className="icon__back"
            />
          </styles.BackButton>

          <styles.FormContainer>
            <styles.FormTitle>
              <h2>
                {role === 1 && "Administrador/DBA"}
                {role === 2 && "Funcionário"}
                {role === 3 && "Cliente"}
              </h2>
            </styles.FormTitle>

            <styles.Label>
              <span>
                {role === 1 && "Login"}
                {role === 2 && "Matricula"}
                {role === 3 && "CPF"}
              </span>
              <input
                type="text"
                name="login"
                id="login"
                value={data.login}
                onChange={(e) => setData({ ...data, login: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Senha</span>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </styles.Label>

            <styles.ButtonSubmit
              onClick={() => login()}
              style={
                !data.login || !data.password
                  ? { backgroundColor: "#aaa" }
                  : { backgroundColor: "#222" }
              }
            >
              {loadingRequest ? "Entrando..." : "Entrar"}
            </styles.ButtonSubmit>
          </styles.FormContainer>
        </>
      )}

      <ToastContainer />
    </styles.Container>
  );
};

export default Login;
