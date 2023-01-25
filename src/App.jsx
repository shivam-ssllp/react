import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";

function App() {
  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HashRouter>
        <div className="container-fluid">
          <Navbar />
          <Routes>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
