import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import { Users } from "./components/layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
function App() {
    return (
        <div className="d-flex flex-column align-items-center">
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/users/:userId?/:edit?" component={Users}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/main" component={Main}/>
                        <Route component={Main}/>
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
