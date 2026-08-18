/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import axios from "axios";

import Modal from "@/components/Modal";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { Employee } from "@/src/types/Employee";

import type { LeaveTypes } from "@/src/types/LeaveTypes";
import { Link, useNavigate } from "react-router-dom";

export default function AddLeaveRequestForm() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [employee, setEmployee] = useState<Employee[]>([]);

  const [leaveTypes, setLeaveTypes] = useState<LeaveTypes[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/employees?limit=100",
      );

      setEmployee(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/leaveTypes?limit=100",
      );

      setLeaveTypes(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchLeaveTypes();
  }, []);

  const addLeaveRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/createLeaveRequest",
        {
          employee_id: employeeId,
          leave_type_id: leaveTypeId,
          start_date: startDate,
          end_date: endDate,
          reason: reason,
          status: status,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_permintaan_cuti");
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, cannot add new data!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <main className="min-h-screen md:pl-62">
        <Header
          search={search}
          setSearch={setSearch}
          setMobileNavOpen={setMobileNavOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <div className="mx-auto max-w-380 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <p className="text-center text-gray-700">{message}</p>
            </Modal>
            <div>
              <h2 className="text-[29px] font-extrabold tracking-[-0.055em] text-slate-950 sm:text-[34px]">
                Form tambah permintaan cuti pegawai
              </h2>
            </div>
          </section>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form className="space-x-4 p-6" onSubmit={addLeaveRequest}>
                  <div className="mb-5">
                    <label
                      htmlFor="employee_id"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Pegawai <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="employee_id"
                      name="employee_id"
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Pegawai --</option>
                      {employee.map((data) => (
                        <option value={data.id} key={data.id}>
                          {data.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="leave_type_id"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Jenis Cuti <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="leave_type_id"
                      name="leave_type_id"
                      onChange={(e) => setLeaveTypeId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Jenis Cuti --</option>
                      {leaveTypes.map((data) => (
                        <option value={data.id} key={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="start_date"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Mulai cuti <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      name="start_date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tanggal mulai cuti..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="end_date"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Selesai cuti <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      name="end_date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tanggal selesai cuti..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="reason"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Alasan Cuti <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="reason"
                      rows={4}
                      name="reason"
                      onChange={(e) => setReason(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                      placeholder="masukan alasan cuti..."
                    ></textarea>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="status"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Status -- </option>
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Tambah!
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  to={"/data_permintaan_cuti"}
                  className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
                >
                  Back
                </Link>
              </CardFooter>
            </Card>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
