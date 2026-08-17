/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Employee } from "@/src/types/Employee";
import { Link, useNavigate } from "react-router-dom";

import Modal from "@/components/Modal";

export default function EmployeeData() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [employee, setEmployee] = useState<Employee[]>([]);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchEmployee = async (page: number = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/employees?page=${page}`,
      );

      setEmployee(res.data.data);
      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/deleteEmployee/${id}`,
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_pegawai");
      }, 2000);

      // refresh the data
      fetchEmployee();
    } catch (error) {
      console.error("Error : ", error);
      setShowModal(true);
      setMessage("Error, failed to delete the data!");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

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
                Data Pegawai
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300">
                <Download className="h-3.5 w-3.5" />{" "}
                <span className="hidden sm:inline">Export report</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </section>

          <div className="mt-3">
            <h2>
              <Link
                to={"/tambah_pegawai"}
                className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
              >
                Tambah Pegawai
              </Link>
            </h2>
          </div>

          <div className="overflow-x-auto mt-3">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Employee ID
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        NIP
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Full Name
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        NIK
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Jenis Kelamin
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Tempat Lahir
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Tanggal Lahir
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Phone
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Address
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Status Pernikahan
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Agama
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Tanggal Bergabung
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Department
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Posisi
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.id}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.nip}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.full_name}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.nik}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.jenis_kelamin}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.birth_place}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.birth_Date.toString()}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.phone}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.address}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.statusPernikahan}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.agama}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.join_date.toString()}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.departments?.name}
                        </TableCell>
                        <TableCell className="border border-gray-300 font-medium px-4 py-2">
                          {data.positions?.title}
                        </TableCell>
                        <TableCell className="border border-gray-300 space-x-2 px-4 py-2">
                          <Link
                            to={`/edit_pegawai/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deleteEmployee(data.id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Paginations */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={paginations.current_page === 1}
                    onClick={() => fetchEmployee(paginations.current_page - 1)}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Pages {paginations.current_page} from{" "}
                    {paginations.last_page}
                  </span>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      paginations.current_page === paginations.last_page
                    }
                    onClick={() => fetchEmployee(paginations.current_page + 1)}
                  >
                    Next
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
