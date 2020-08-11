import { API } from "../../backend";

//get user's folders
export const getAllFolders = (userId, token) => {
  return fetch(`${API}folder/all/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//create new folder
export const postNewFolder = (userId, token, folder) => {
  return fetch(`${API}folder/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(folder),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//delete folder
export const deleteFolder = (userId, token, folderId) => {
  return fetch(`${API}folder/delete/${userId}/${folderId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//get all notes
export const getAllNotes = (folderId) => {
  return fetch(`${API}note/all/${folderId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//create new note
export const postNewNote = (folderId, note) => {
  return fetch(`${API}note/create/${folderId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//get note
export const getNote = (noteId) => {
  return fetch(`${API}note/${noteId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//delete note
export const deleteNote = (noteId) => {
  return fetch(`${API}note/delete/${noteId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};

//update note
export const updateNote = (noteId, note) => {
  return fetch(`${API}note/update/${noteId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.log(e));
};
