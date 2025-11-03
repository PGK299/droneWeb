import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewConfig from "./pages/ViewConfig";
import TempForm from "./pages/TempForm";
import ViewLogs from "./pages/ViewLogs";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<ViewConfig />} />
          <Route path="/log" element={<TempForm />} />
          <Route path="/logs" element={<ViewLogs />} />
          <Route path="*" element={<Navigate to="/config" replace />} />
        </Routes>
      </main>
    </div>
  );
}
