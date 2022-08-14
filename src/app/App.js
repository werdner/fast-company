import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";
import { Switch, Route } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";

function App() {
    return (
        <div className="d-flex flex-column align-items-center">
            <NavBar />
            <Switch>
                <Route exact path="/users/:userId?" component={Users}/>
                <Route exact path="/main" component={Main}/>
                <Route exact path="/login" component={Login}/>
                <Route component={Main}/>
            </Switch>
        </div>
    );
}

export default App;
