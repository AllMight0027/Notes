import React from "react";
import { isAuthenticated, signout } from "../auth/helper/index";
import { withRouter } from "react-router-dom";

const Base = ({
  title = "",
  description = "",
  className = "text-dark p-4",
  children,
  history,
  stopped = false,
}) => (
  <div>
    <div className="container-fluid">
      <div className="row bg-white">
        <div className="col-8">
          <img
            title="Home"
            src={require("./sticky.png")}
            alt="LOGO"
            style={{ maxHeight: "75px", cursor: "pointer" }}
            onClick={() => {
              if (isAuthenticated()) {
                history.push("/home");
              } else {
                history.push("/");
              }
            }}
          />
        </div>
        {isAuthenticated() && (
          <div className="col-4 text-right pt-3">
            <i
              title="Signout"
              className="fa fa-sign-out pl-2"
              style={{ fontSize: "40px", color: "danger", cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            ></i>
          </div>
        )}
      </div>
      <div className="row" style={{ display: stopped ? "" : "none" }}>
        <div className="wrapper">
          <p className="lead p-2 text-white" style={{ fontSize: "40px" }}>
            Hey, how you're doing? Sorry you can't get through.
          </p>
        </div>
      </div>
      <div className="text-warning text-center mt-4 p-4" style={{}}>
        <h2 className="display-4">
          <b>{title}</b>
        </h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <br />
    <br />
  </div>
);

export default withRouter(Base);
