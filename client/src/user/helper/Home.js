import React, { useEffect, useState } from "react";
import Base from "../../core/Base";
import { getAllFolders, postNewFolder } from "./userapicalls";
import { isAuthenticated } from "../../auth/helper/index";
import Folder from "../Folder";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function Home() {
  const { user, token } = isAuthenticated();
  const [folders, setFolders] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [reload, setReload] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    getAllFolders(user._id, token).then((data) => {
      if (data.error) return;
      setFolders(data);
    });
  }, [reload]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("Folder Name Is Required");
      return;
    }

    postNewFolder(user._id, token, {
      name: name.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }),
    }).then((data) => {
      setName("");
      setIsOpen(false);
      setReload(!reload);
    });
  };

  return (
    <Base title="Folders">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="row">
          <div>
            <form>
              <div className="form-group">
                <label className="text-dark">Folder Name</label>
                <input
                  value={name}
                  onChange={handleChange}
                  className="form-control "
                  autoFocus={true}
                />
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-info btn-block icon-cog"
                type="submit"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        {folders &&
          folders.length !== 0 &&
          folders.map((folder, i) => {
            return <Folder key={`~${i}`} folder={folder} />;
          })}

        <div className="col-xl-3 col-sm-12 col-md-4 mt-3">
          <div
            className="card mt-1 h-100"
            style={{ cursor: "pointer", opacity: 0.7 }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="text-dark mt-1">+</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
