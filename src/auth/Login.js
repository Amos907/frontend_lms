import "./login.css";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useDispatch } from "react-redux";
import loginSlice from "../features/loginSlice";
import { useHistory } from "react-router";

import axios from "axios";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (email || password != null) {
      axios
        .post("https://lms-api-testing.herokuapp.com/api/auth/login/", {
          email: email.trim(),
          password: password.trim(),
        })
        .then((res) => {
          localStorage.setItem("AccessToken", res.data.access);
          dispatch(
            loginSlice.actions.setAuthTokens({
              access: res.data.access,
              refresh: res.data.refresh,
            })
          );
          dispatch(
            loginSlice.actions.setUser({
              user: res.data.user,
            })
          );
          history.push("/");
        })
        .catch((err) => {
          alert("Unable to Login. Check username and password and try again.");
        });
    } else {
      alert("Fill Missing Values!");
    }
  };
  return (
    <div>
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <h3 id="form-title">LOGIN</h3>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <EmailIcon />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email..."
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <LockIcon />
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <input
                    className="btn login_btn"
                    type="submit"
                    defaultValue="Login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
