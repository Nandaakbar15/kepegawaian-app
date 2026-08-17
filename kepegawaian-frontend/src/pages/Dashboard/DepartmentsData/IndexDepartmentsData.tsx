/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";

import type { Department } from "@/src/types/Department";
import { Link, useNavigate } from "react-router-dom";

import Modal from "@/components/Modal";

export default function DepartementData() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [departements, setDepartement] = useState<Department[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchDepartment = async (page: number = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/departments?page=${page}`,
      );

      setDepartement(res.data.data);
      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const deleteDepartments = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/deleteDepartments/${id}`,
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_departments");
      }, 2000);

      // refresh the data
      fetchDepartment();
    } catch (error) {
      console.error("Error : ", error);
      setShowModal(true);
      setMessage("Error, failed to delete the data!");
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
                Data Departemen
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
                to={"/tambah_departemen"}
                className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
              >
                Add Departments
              </Link>
            </h2>
          </div>

          <section className="overflow-x-auto mt-3">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Departement ID
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Code
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-[16ox] px-4 py-2">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departements.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="border border-gray-300 px-4 py-2 font-medium">
                          {data.id}
                        </TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2 font-medium">
                          {data.code}
                        </TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2 font-medium">
                          {data.name}
                        </TableCell>
                        <TableCell className="border border-gray-300 space-x-2 px-4 py-2">
                          <Link
                            to={`/edit_departments/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deleteDepartments(data.id)}
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
                    onClick={() =>
                      fetchDepartment(paginations.current_page - 1)
                    }
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
                    onClick={() =>
                      fetchDepartment(paginations.current_page + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
