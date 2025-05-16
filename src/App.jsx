import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../src/pages/client/home.jsx"
import Dashboard from "./pages/admin/dashboard.jsx";

function App() {
  return (
  <BrowserRouter>
  <Routes path="/">
  <Route path="/admin/*" element={<Dashboard />} />
  <Route path="/*" element={<Home />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
