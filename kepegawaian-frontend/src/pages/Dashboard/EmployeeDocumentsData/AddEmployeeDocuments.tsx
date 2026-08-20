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
import { Link, useNavigate } from "react-router-dom";

export default function AddEmployeeDocumentsForm() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [employee, setEmployee] = useState<Employee[]>([]);

  const [type, setType] = useState("");
  const [filePath, setFilePath] = useState<File | null>(null);
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
    fetchEmployee();
  }, []);

  const addEmployeeDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("employee_id", employeeId);

      if (filePath) {
        formData.append("file_path", filePath);
      }

      const res = await axios.post(
        "http://localhost:3000/api/v1/createEmployeeDocument",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_dokumen_pegawai");
      }, 2000);
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

      <main className="min-h-screen md:pl-62">
        <Header
          search={search}
          setSearch={setSearch}
          setMobileNavOpen={setMobileNavOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />

        <div className="mx-auto max-w-380 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <p className="text-center text-gray-700">{message}</p>
          </Modal>
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[29px] font-extrabold tracking-[-0.055em] text-slate-950 sm:text-[34px]">
                Form tambah dokumen pegawai
              </h2>
            </div>
          </section>

          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form className="space-x-4 p-6" onSubmit={addEmployeeDocument}>
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
                      htmlFor="type"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Tipe Dokumen Pegawai{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      onChange={(e) => setType(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Tipe Dokumen -- </option>
                      <option value="KTP">KTP</option>
                      <option value="Ijazah">Ijazah</option>
                      <option value="Kontrak_kerja">Kontrak Kerja</option>
                      <option value="NPWP">NPWP</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      className="block mb-2.5 text-sm font-medium text-heading"
                      htmlFor="file_path"
                    >
                      Upload file <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full text-sm text-heading border border-default-medium rounded-lg cursor-pointer bg-neutral-secondary-medium focus:outline-none focus:ring-brand focus:border-brand shadow-lg placeholder:text-body file:mr-4 file:py-2.5 file:px-4 file:rounded-l-base file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand/90"
                      id="file_path"
                      name="file_path"
                      onChange={(e) => setFilePath(e.target.files?.[0] || null)}
                      type="file"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-500 focus:ring-4 focus:ring-brand-medium shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Tambah!
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  to={"/data_dokumen_pegawai"}
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
