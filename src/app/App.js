import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import UserPage from "./components/page/userPage/index";
import UsersListPage from "./components/page/usersListPage/usersListPage";
import UserEditForm from "./components/ui/userEditForm";

function App() {
    return (
        <div className="d-flex flex-column align-items-center">
            <NavBar />
            <Switch>
                <Route path="/users/:userId/edit" component={UserEditForm}/>
                <Route path="/users/:userId" component={UserPage}/>
                <Route path="/users" component={UsersListPage}/>
                <Route path="/main" component={Main}/>
                <Route path="/login/:type?" component={Login}/>
                <Route component={Main}/>
            </Switch>
        </div>
    );
}

export default App;
