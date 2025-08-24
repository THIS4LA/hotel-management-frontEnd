import { BrowserRouter, Route, Routes } from "react-router";
import ClientRoutes from "./routes/clientRoutes.jsx";
import AdminRoutes from "./routes/adminRoutes.jsx";
import Login from "./pages/authentication/login.jsx";
import "./App.css";

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
