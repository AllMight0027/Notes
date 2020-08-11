import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getNote, deleteNote, updateNote } from "./helper/userapicalls";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Note = ({ match, history }) => {
  const [text, setText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(match.params.note);

  useEffect(() => {
    getNote(match.params.noteId).then((data) => {
      if (data.error) return;
      setText(data.noteText);
    });
  }, []);

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

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("Title Required");
      return;
    }
    updateNote(match.params.noteId, {
      name: name.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }),
    }).then((data) => {
      history.push(`/folder/${match.params.folder}/${match.params.folderId}`);
    });
  };

  return (
    <Base title={match.params.note}>
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
                  onChange={handleName}
                  className="form-control "
                  autoFocus={true}
                />
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-info btn-block icon-cog"
                type="submit"
              >
                Update Title
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div className="col-6 text-left">
          <button
            className="btn btn-outline-info"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Update Title
          </button>
        </div>
        <div className="col-6 text-right">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              deleteNote(match.params.noteId).then((data) =>
                history.push(
                  `/folder/${match.params.folder}/${match.params.folderId}`
                )
              );
            }}
          >
            Delete The Note
          </button>
        </div>
      </div>
      <div className="container-fluid mt-2">
        <textarea
          onChange={handleChange}
          name=""
          id=""
          rows="15"
          style={{ width: "100%", maxWidth: "100%", borderRadius: "15px" }}
          value={text}
        ></textarea>
        <div className="row">
          <div
            className="col-sm-2 btn btn-warning mt-1"
            onClick={() =>
              history.push(
                `/folder/${match.params.folder}/${match.params.folderId}`
              )
            }
          >
            Back
          </div>
          <div
            className="offset-sm-8 col-sm-2 btn btn-success mt-1"
            onClick={() => {
              updateNote(match.params.noteId, { noteText: text }).then(
                (data) => {
                  if (data.error) return;
                  alert(`${match.params.note} Saved`);
                }
              );
            }}
          >
            Save
          </div>
        </div>
      </div>
    </Base>
  );
};
export default withRouter(Note);
