import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./user/helper/Home";
import Signup from "./user/Signup";
import FolderDetails from "./user/FolderDetails";
import Note from "./user/Note";

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/folder/:folder/:folderId"
            component={FolderDetails}
          />
          <PrivateRoute
            exact
            path="/folder/:folder/:folderId/note/:note/:noteId"
            component={Note}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
