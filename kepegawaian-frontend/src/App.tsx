// import './App.css'

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import DepartementData from "./pages/Dashboard/DepartmentsData/IndexDepartmentsData";
import PositionsData from "./pages/Dashboard/PositionsData/IndexPositionsData";
import AddDepartments from "./pages/Dashboard/DepartmentsData/AddDepartments";
import AddPosition from "./pages/Dashboard/PositionsData/AddPosition";
import EmployeeData from "./pages/Dashboard/EmployeeData/IndexEmployeeData";
import AddEmployee from "./pages/Dashboard/EmployeeData/AddEmployee";
import EditDepartments from "./pages/Dashboard/DepartmentsData/EditDepartments";
import EditPosition from "./pages/Dashboard/PositionsData/EditPosition";
import EditEmployee from "./pages/Dashboard/EmployeeData/EditEmployee";
import LeaveTypesData from "./pages/Dashboard/LeaveTypesData/IndexLeaveTypesData";
import AddLeavesTypeForm from "./pages/Dashboard/LeaveTypesData/AddLeaveTypes";
import EditLeavesTypeForm from "./pages/Dashboard/LeaveTypesData/EditLeaveTypes";
import LeaveRequestData from "./pages/Dashboard/LeaveRequestData/IndexLeaveRequestData";
import LeaveBalancesData from "./pages/Dashboard/LeaveBalancesData/IndexLeaveBalancesData";
import AddLeaveBalancesForm from "./pages/Dashboard/LeaveBalancesData/AddLeaveBalances";
import EditLeaveBalancesForm from "./pages/Dashboard/LeaveBalancesData/EditLeaveBalances";
import AddLeaveRequestForm from "./pages/Dashboard/LeaveRequestData/AddLeaveRequestData";
import EditLeaveRequestForm from "./pages/Dashboard/LeaveRequestData/EditLeaveRequestData";
import LoginPages from "./pages/LoginPages";
import EmployeeDocumentData from "./pages/Dashboard/EmployeeDocumentsData/IndexEmployeeDocumentsData";
import AddEmployeeDocumentsForm from "./pages/Dashboard/EmployeeDocumentsData/AddEmployeeDocuments";
import EditEmployeeDocumentsForm from "./pages/Dashboard/EmployeeDocumentsData/EditEmployeeDocuments";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/loginPage"} />} />

        {/* Login Pages */}
        <Route path="/loginPage" element={<LoginPages />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Routes departments */}
        <Route path="/data_departemen" element={<DepartementData />} />
        <Route path="/tambah_departemen" element={<AddDepartments />} />
        <Route path="/edit_departments/:id" element={<EditDepartments />} />

        {/* Routes position */}
        <Route path="/data_posisi" element={<PositionsData />} />
        <Route path="/tambah_posisi" element={<AddPosition />} />
        <Route path="/edit_position/:id" element={<EditPosition />} />

        {/* Routes employee */}
        <Route path="/data_pegawai" element={<EmployeeData />} />
        <Route path="/tambah_pegawai" element={<AddEmployee />} />
        <Route path="/edit_pegawai/:id" element={<EditEmployee />} />

        {/* Routes Leave Types */}
        <Route path="/data_jenis_cuti" element={<LeaveTypesData />} />
        <Route path="/tambah_jenis_cuti" element={<AddLeavesTypeForm />} />
        <Route path="/edit_jenis_cuti/:id" element={<EditLeavesTypeForm />} />

        {/* Routes Leave Balances */}
        <Route path="/data_sisa_cuti" element={<LeaveBalancesData />} />
        <Route path="/tambah_sisa_cuti" element={<AddLeaveBalancesForm />} />
        <Route path="/edit_sisa_cuti/:id" element={<EditLeaveBalancesForm />} />

        {/* Routes Leave Request */}
        <Route path="/data_permintaan_cuti" element={<LeaveRequestData />} />
        <Route
          path="/tambah_permintaan_cuti"
          element={<AddLeaveRequestForm />}
        />
        <Route
          path="/edit_permintaan_cuti/:id"
          element={<EditLeaveRequestForm />}
        />

        {/* Routes Emplyee Document */}
        <Route
          path="/data_dokumen_pegawai"
          element={<EmployeeDocumentData />}
        />
        <Route
          path="/tambah_dokumen_pegawai"
          element={<AddEmployeeDocumentsForm />}
        />
        <Route
          path="/edit_dokumen_pegawai/:id"
          element={<EditEmployeeDocumentsForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}
