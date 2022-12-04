import React, { useEffect } from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import { Users } from "./components/layouts/users";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components/common/form/protectedRout";
import { LogOut } from "./components/layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
