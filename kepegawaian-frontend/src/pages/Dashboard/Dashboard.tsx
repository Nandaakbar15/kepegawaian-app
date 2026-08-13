/* eslint-disable @typescript-eslint/no-unused-vars */
import { Activity, Download, Sparkles } from "lucide-react";
import { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#dcefb8] bg-[#f2fbdc] px-2.5 py-1 text-[10px] font-bold text-[#628b24]">
                <Activity className="h-3 w-3" /> Live overview
              </div>
              <h2 className="text-[29px] font-extrabold tracking-[-0.055em] text-slate-950 sm:text-[34px]">
                Dashboard Kepegawaian App
              </h2>
              <p className="mt-1 text-[13px] text-slate-500">
                Aplikasi mengelola Data Kepegawaian Non ASN
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300">
                <Download className="h-3.5 w-3.5" />{" "}
                <span className="hidden sm:inline">Export report</span>
                <span className="sm:hidden">Export</span>
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#111827] px-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1f2937]">
                <Sparkles className="h-3.5 w-3.5 text-[#c9f27d]" /> Add new
              </button>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
