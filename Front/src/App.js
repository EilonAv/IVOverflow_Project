import { useEffect } from "react";
import Layout from "./containers/layout";
import Login from "./containers/login";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { userSetReducer } from "store/userInfoSlice";
import { AppContainer } from "containers/styles/AppContainer.style";

function App() {
  console.log("App starts");
  //navigating between components instance
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const InitApp = function () {
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email");

    if (!jwt) {
      localStorage.setItem("jwt", null);
      localStorage.setItem("email", null);
      navigate("/login");
    }

    axios({
      method: "post",
      url: "http://localhost:80/userInfo",
      data: {
        email,
        jwt,
      },
    })
      .then((res) => {
        dispatch(userSetReducer(res.data));
      })
      .catch(function (error) {
        navigate("/login");
      });
  };

  useEffect(() => {
    console.log("App.js useEffect");
    InitApp();
  }, []);

  //hide loading splash

  //check if user already verified with jwt in the past hour

  return (
    <div>
      <AppContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
