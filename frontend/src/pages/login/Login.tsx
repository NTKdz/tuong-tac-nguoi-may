import React from "react";
import "./styles.css";
import { Button } from "../../components/button/Button";
import Input from "../../components/input/Input";
export default function Login() {
  return (
    <div id="login-page">
      <div className="login-form-container">
        <div id="login-logo-container">
          <img id="login-logo" src="src/assets/logos/logo-black.svg" alt="" />
        </div>
        <h2 style={{marginBottom:"0px",marginTop:"28px"}}>Welcome back</h2>
        <span>Please enter your details.</span>

        <form id="login-form" action="">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="">Email</span>
            <Input type="text" placeholder="abc12@gmail.com" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Password</span>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div id="remember-me">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              style={{ height: "100%" }}
            />
            <span>Remember me</span>
          </div>
          <Button content="Login" onClick={() => {}} />
        </form>
      </div>
      <div className="login-side"></div>
    </div>
  );
}
