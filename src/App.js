import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import "./App.css";


import GenderList from "./components/gender-list.component";
import AddUser from "./components/add-user";
import UserList from "./components/user-list.component";
import EditUser from "./components/edit-user";

function App() {
  return (
      <div>

          <nav className="purple darken-4">
              <div className="nav-wrapper">
                  <a href="#" className="brand-logo">User API</a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li>
                            <Link to={"/users"} className="nav-link">
                                Listar Usuarios
                            </Link>
                      </li>
                      <li>
                          <Link to={"/addUser"} className="nav-link">
                            Crear Usuario
                            </Link>
                      </li>
                  </ul>
              </div>
          </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UserList} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/editUser/:id" component={EditUser} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
