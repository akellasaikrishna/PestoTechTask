import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import Container from "../components/common/AppContainer";
import AddTask from "../components/Add";


const AppRoutes = () => {
    return (
        <Routes>
            <Route key="AppContainer" path="/" element={<Container />}>
                <Route key="Home" path="/" element={<Navigate to="/list" />} />
                <Route key="Task Home" path="/list" element={<Home />} />
                <Route key="Task Home" path="/add" element={<AddTask />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;