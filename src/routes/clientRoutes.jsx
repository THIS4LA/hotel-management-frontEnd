import { Route, Routes } from "react-router";
import Home from "../pages/client/home.jsx";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
