import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./conponents/users";
import SearchStatus from "./conponents/searchStatus";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <SearchStatus />
        <Users />
    </>
);
