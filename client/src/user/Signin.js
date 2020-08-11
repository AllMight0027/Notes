import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect, Link } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index";

const Signin = () => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
    loading: false,
    error: "",
    isRedirected: "",
  });

  const { email, password, loading, error, isRedirected } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    return setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setvalues({ ...values, isRedirected: true });
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isRedirected) {
      if (user) {
        return <Redirect to="/home" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/home" />;
    }
  };

  const onLoading = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading.....
      </div>
    </div>
  );

  const onError = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    </div>
  );

  const signinForm = () => {
    function myFunction() {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control "
                type="email"
              />
            </div>
            <div className="form-group ">
              <label className="text-light">Password</label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control "
                type="password"
                id="password"
              />
              <small
                className="mt-1 text-muted"
                onClick={myFunction}
                style={{ cursor: "pointer" }}
              >
                Show Password
              </small>
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-info btn-block icon-cog"
              type="submit"
            >
              Submit
            </button>
            <div className="row">
              <span className="col-sm-12 text-light">
                Not registered? <Link to="/signup">Signup Here</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Notes" description="Signin here please">
      {onLoading()}
      {onError()}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
