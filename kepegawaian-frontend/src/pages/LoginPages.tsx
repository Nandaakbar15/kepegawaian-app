/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import Modal from "@/components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email: email,
        password: password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      let payload = JSON.parse(atob(token.split(".")[1]));

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        payload = navigate("/dashboard");
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, cannot login! Please try again.");
    }
  };

  return (
    <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p className="text-center text-gray-700">{message}</p>
      </Modal>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <a href="#">
            <img
              src="/images/kepegawaian_logo.png"
              alt="logo"
              className="w-32 min-h-32 mb-8 mx-auto block"
            />
          </a>

          <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
            <h1 className="text-slate-900 text-center text-3xl font-bold dark:text-slate-50">
              Sign in
            </h1>

            <form className="space-y-6 mt-10" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@readymadeui.com"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Sign in
              </button>

              <div className="text-slate-900 text-sm text-center dark:text-slate-50">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
