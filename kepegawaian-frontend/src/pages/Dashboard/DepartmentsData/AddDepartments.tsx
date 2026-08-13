/* eslint-disable @typescript-eslint/no-unused-vars */
import { Download } from "lucide-react";

import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../../../../components/Modal";

export default function AddDepartments() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [code, setCodes] = useState("");
  const [name, setName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const addDepartments = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/createDepartments",
        {
          code: code,
          name: name,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_departemen");
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
                Form tambah departemen
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

          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form className="space-x-4 p-6" onSubmit={addDepartments}>
                  <div className="mb-5">
                    <label
                      htmlFor="code"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Kode Departemen
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      onChange={(e) => setCodes(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                      placeholder="masukan kode departemen..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Nama Departemen
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                      placeholder="masukan nama departemen..."
                      required
                    />
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
                  to={"/data_departemen"}
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
