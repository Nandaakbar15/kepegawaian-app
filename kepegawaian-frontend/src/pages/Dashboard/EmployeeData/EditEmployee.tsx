/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Department } from "@/src/types/Department";
import type { Positions } from "@/src/types/Position";

import Modal from "@/components/Modal";

export default function EditEmployee() {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [nip, setNip] = useState("");
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [statusPernikahan, setStatusPernikahan] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [positionId, setPositionId] = useState("");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Positions[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/departments?limit=100",
      );

      setDepartments(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/positions?limit=100",
      );

      setPositions(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/employees/${id}`,
        );

        const {
          nip,
          full_name,
          nik,
          jenis_kelamin,
          birth_place,
          birth_Date,
          phone,
          address,
          statusPernikahan,
          agama,
          join_date,
          departmentId,
          position_id,
        } = res.data.data;

        setNip(nip);
        setNik(nik);
        setFullName(full_name);
        setJenisKelamin(jenis_kelamin);
        setBirthPlace(birth_place);

        // Format birthDate to yyyy-MM-dd for input type="date"
        if (birth_Date) {
          const birthDateObj = new Date(birth_Date);
          const formattedBirthDate = birthDateObj.toISOString().split("T")[0];
          setBirthDate(formattedBirthDate);
        }

        setPhoneNumber(phone);
        setAlamat(address);
        setStatusPernikahan(statusPernikahan);
        setAgama(agama);

        // Format joinDate to yyyy-MM-dd for input type="date"
        if (join_date) {
          const joinDateObj = new Date(join_date);
          const formattedJoinDate = joinDateObj.toISOString().split("T")[0];
          setJoinDate(formattedJoinDate);
        }

        // Convert IDs to string to match select option values
        console.log("Raw departmentId from API:", departmentId); // Debug
        console.log("Raw position_id from API:", position_id); // Debug

        setDepartmentId(departmentId ? String(departmentId) : "");
        setPositionId(position_id ? String(position_id) : "");
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchDepartments();
    fetchPositions();
    fetchEmployeeById();
  }, [id]);

  const updateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateEmployee/${id}`,
        {
          nik: nik,
          nip: nip,
          full_name: fullName,
          jenis_kelamin: jenisKelamin,
          birth_place: birthPlace,
          birth_Date: birthDate,
          agama: agama,
          address: alamat,
          phone: phoneNumber,
          statusPernikahan: statusPernikahan,
          join_date: joinDate,
          departmentId: departmentId,
          position_id: positionId,
        },
      );

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/data_pegawai");
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
                Edit Data Pegawai
              </h2>
            </div>
          </section>

          <div className="max-w mt-10 mx-auto">
            <Card>
              <CardContent>
                <form className="space-x-4 p-6" onSubmit={updateEmployee}>
                  <div className="mb-5">
                    <label
                      htmlFor="nip"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      NIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nip"
                      name="nip"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan nip"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="full_name"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan nama panjang pegawai..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="nik"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan nik pegawai..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="jenis_kelamin"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Jenis kelamin <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="jenis_kelamin"
                      name="jenis_kelamin"
                      value={jenisKelamin}
                      onChange={(e) => setJenisKelamin(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option value={""}>-- Pilih Jenis Kelamin --</option>
                      <option value="Laki_laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="birth_place"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="birth_place"
                      name="birth_place"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tempat lahir..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="birth_Date"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="birth_Date"
                      name="birth_Date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tanggal lahir..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan nomor telepon..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      rows={4}
                      name="address"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                      placeholder="Masukan alamat pegawai..."
                    ></textarea>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="statusPernikahan"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Status Pernikahan <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="statusPernikahan"
                      name="statusPernikahan"
                      value={statusPernikahan}
                      onChange={(e) => setStatusPernikahan(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                    >
                      <option selected>-- Pilih status Pernikahan --</option>
                      <option value="Belum_menikah">Belum Menikah</option>
                      <option value="Sudah_menikah">Sudah Menikah</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="agama"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="agama"
                      name="agama"
                      value={agama}
                      onChange={(e) => setAgama(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan agama pegawai.."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="birth_Date"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Tanggal Bergabung <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="join_date"
                      name="join_date"
                      value={joinDate}
                      onChange={(e) => setJoinDate(e.target.value)}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                      placeholder="masukan tanggal bergabungnya pegawai..."
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="departmentId"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Departemen <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="departmentId"
                      name="departmentId"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      required
                    >
                      <option value={""}>-- Pilih departemen --</option>
                      {departments.map((department) => (
                        <option
                          value={String(department.id)}
                          key={department.id}
                        >
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="position_id"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Posisi <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="position_id"
                      name="position_id"
                      value={positionId}
                      onChange={(e) => setPositionId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      required
                    >
                      <option value={""}>-- Pilih posisi --</option>
                      {positions.map((position) => (
                        <option value={String(position.id)} key={position.id}>
                          {position.title}
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
                  to={"/data_pegawai"}
                  className="inline-block text-white rounded-lg shadow-lg bg-slate-500 hover:bg-slate-700 px-4 py-2"
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
