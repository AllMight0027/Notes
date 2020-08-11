import React from "react";
import { withRouter } from "react-router-dom";

const Folder = ({ folder, history }) => {
  return (
    <div className="col-xl-3 col-sm-12 col-md-4 mt-3">
      <div
        className="card mt-1 h-100"
        style={{ cursor: "pointer", opacity: 0.8 }}
        onClick={() => {
          history.push(`/folder/${folder.name}/${folder._id}`);
        }}
      >
        <div className="card-body">
          <u>
            <h4 className="card-title text-dark mt-1">{`${folder.name}`}</h4>
          </u>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Folder);
