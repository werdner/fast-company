import React from "react";
import NavBar from "./components/navBar";
// import Users from "./components/layouts/users";
import { Switch, Route } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import UserPage from "./components/userPage";
import UsersPage from "./components/usersPage";

function App() {
    return (
        <div className="d-flex flex-column align-items-center">
            <NavBar />
            <Switch>
                <Route path="/users/:userId" component={UserPage}/>
                <Route path="/users" component={UsersPage}/>
                <Route path="/main" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route component={Main}/>
            </Switch>
        </div>
    );
}

export default App;
