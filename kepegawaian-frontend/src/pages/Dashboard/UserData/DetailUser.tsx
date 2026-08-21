import { useEffect, useState } from "react";

import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function DetailUser() {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/users/${id}`);

        const { username, email, role } = res.data.data;

        setUsername(username);
        setEmail(email);
        setRole(role);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    getUserById();
  }, [id]);

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
            <div>
              <h2 className="text-[29px] font-extrabold tracking-[-0.055em] text-slate-950 sm:text-[34px]">
                Detail User
              </h2>
            </div>
          </section>
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                  src="/images/user.png"
                  alt=""
                />
                <div className="py-2">
                  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                    {username}
                  </h3>
                  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      />
                    </svg>
                    {email}
                  </div>
                  <p className="font-bold text-slate-400">Role: {role}</p>
                </div>
              </div>
              <div className="flex gap-2 px-2">
                <Link
                  to={"/users_data"}
                  className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
