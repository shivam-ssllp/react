import React, { useReducer } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductsList from "./ProductsList";

let initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

// reducer
let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };
    case "logout":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state;
  }
};

function App() {
  // let [user, setUser] = useState(initialUser);
  let [user, dispatch] = useReducer(reducer, initialUser);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <div className="container-fluid">
          <Navbar />
          <Routes>
            <Route path="/" exact={true} element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
