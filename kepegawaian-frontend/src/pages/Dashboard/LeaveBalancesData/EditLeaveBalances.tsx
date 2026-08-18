/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import axios from "axios";

import Modal from "@/components/Modal";

import type { Employee } from "@/src/types/Employee";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditLeaveBalancesForm() {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [employee, setEmployee] = useState<Employee[]>([]);

  const [year, setYear] = useState(0);
  const [remainingQuota, setRemainingQuota] = useState(0);
  const [employeeId, setEmployeeId] = useState("");

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

  useEffect(() => {
    const fetchLeaveBalancesById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/leaveBalances/${id}`,
        );

        const { year, remaining_quota, employee_id } = res.data.data;

        setYear(year);
        setRemainingQuota(remaining_quota);
        setEmployeeId(employee_id);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchLeaveBalancesById();
    fetchEmployee();
  }, []);

  const editLeaveBalances = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateLeaveBalances/${id}`,
        {
          year: year,
          remaining_quota: remainingQuota,
          employee_id: employeeId,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_sisa_cuti");
      }, 2000);

      // clear the form
      setYear(0);
      setRemainingQuota(0);
      setEmployeeId("");
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, failed to add new data!");
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

      <main className="min-h-screen md:pl-[248px]">
        <Header
          search={search}
          setSearch={setSearch}
          setMobileNavOpen={setMobileNavOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <div className="mx-auto max-w-[1520px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <p className="text-center text-gray-700">{message}</p>
            </Modal>
            <div>
              <h2 className="text-[29px] font-extrabold tracking-[-0.055em] text-slate-950 sm:text-[34px]">
                Form edit sisa cuti
              </h2>
            </div>
          </section>

          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form className="space-x-4 p-6" onSubmit={editLeaveBalances}>
                  <div className="mb-5">
                    <label
                      htmlFor="year"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Tahun Cuti <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tahun cuti..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="remaining_quota"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Sisa cuti <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="remaining_quota"
                      name="remaining_quota"
                      value={remainingQuota}
                      onChange={(e) =>
                        setRemainingQuota(parseInt(e.target.value))
                      }
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan sisa cuti..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="employee_id"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Pegawai
                    </label>
                    <select
                      id="employee_id"
                      name="employee_id"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Pegawai -- </option>
                      {employee.map((data) => (
                        <option value={data.id} key={data.id}>
                          {data.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Edit!
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  to={"/data_sisa_cuti"}
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
