// import './App.css'

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import DepartementData from "./pages/Dashboard/DepartmentsData/IndexDepartmentsData";
import PositionsData from "./pages/Dashboard/PositionsData/IndexPositionsData";
import AddDepartments from "./pages/Dashboard/DepartmentsData/AddDepartments";
import AddPosition from "./pages/Dashboard/PositionsData/AddPosition";
import EmployeeData from "./pages/Dashboard/EmployeeData/IndexEmployeeData";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Routes departments */}
        <Route path="/data_departemen" element={<DepartementData />} />
        <Route path="/tambah_departemen" element={<AddDepartments />} />
        <Route path="/edit_departemen/:id" />

        {/* Routes position */}
        <Route path="/data_posisi" element={<PositionsData />} />
        <Route path="/tambah_posisi" element={<AddPosition />} />

        {/* Routes employee */}
        <Route path="/data_pegawai" element={<EmployeeData />} />
      </Routes>
    </BrowserRouter>
  );
}
