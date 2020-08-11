import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { deleteFolder, getAllNotes, postNewNote } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper/index";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
Modal.setAppElement("#root");

const FolderDetails = ({ match, history }) => {
  const { user, token } = isAuthenticated();
  const [notes, setNotes] = useState(undefined);
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
    getAllNotes(match.params.folderId).then((data) => {
      if (data.length !== 0) {
        if (data.error) return;
        setNotes(data);
      }
    });
  }, [reload]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("Note Title Is Required");
      return;
    }

    postNewNote(match.params.folderId, {
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
    <Base title={match.params.folder}>
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
                <label className="text-dark">Note Title</label>
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
                Create Note
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-12 text-right">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                deleteFolder(
                  user._id,
                  token,
                  match.params.folderId
                ).then((data) => history.push("/home"));
              }}
            >
              Delete The Folder
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {notes &&
          notes.length !== 0 &&
          notes.map((note, i) => {
            return (
              <div className="col-xl-3 col-sm-12 col-md-4 mt-3">
                <div
                  className="card mt-1 h-100"
                  style={{ cursor: "pointer", opacity: 0.8 }}
                  onClick={() => {
                    history.push(
                      `/folder/${match.params.folder}/${match.params.folderId}/note/${note.name}/${note._id}`
                    );
                  }}
                >
                  <div className="card-body">
                    <u>
                      <h4 className="card-title text-dark mt-1">{`${
                        note.name ? note.name : ""
                      }`}</h4>
                    </u>
                    <p className="card-text text-dark">{`${
                      note.noteText ? note.noteText.substring(0, 50) : ""
                    }...`}</p>
                  </div>
                </div>
              </div>
            );
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
                  <h2 className="text-dark mt-3">+</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default withRouter(FolderDetails);
