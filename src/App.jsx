import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../src/pages/client/home.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import Login from "./pages/authentication/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="/user/*" element={<Home />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
