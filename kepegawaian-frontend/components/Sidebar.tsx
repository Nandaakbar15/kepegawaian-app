import {
  Building2,
  ChevronDown,
  LayoutFreeform,
  Users,
  X,
  CircleGauge,
  Scale,
  GitPullRequestArrow,
  FileText,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Data Users", icon: User, link: "/users_data" },
  { label: "Data Departemen", icon: Building2, link: "/data_departemen" },
  { label: "Data Posisi", icon: LayoutFreeform, link: "/data_posisi" },
  { label: "Data Pegawai", icon: Users, link: "/data_pegawai" },
  { label: "Data Jenis Cuti", icon: CircleGauge, link: "/data_jenis_cuti" },
  { label: "Data Sisa Cuti", icon: Scale, link: "/data_sisa_cuti" },
  {
    label: "Data Permintaan Cuti",
    icon: GitPullRequestArrow,
    link: "/data_permintaan_cuti",
  },
  {
    label: "Data Dokumen Pegawai",
    icon: FileText,
    link: "/data_dokumen_pegawai",
  },
];

export default function Sidebar({
  activeNav,
  setActiveNav,
  mobileNavOpen,
  setMobileNavOpen,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col bg-[#111827] px-4 py-5 text-slate-300 md:flex">
        <div className="flex items-center gap-3 px-3">
          <span className="text-[17px] font-extrabold tracking-[-0.04em] text-white">
            Kepegawaian App
          </span>
        </div>

        <div className="mt-11 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </div>
        <nav className="mt-3 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.label;
            return (
              <Link
                to={item.link}
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-[13px] font-semibold transition ${active ? "bg-white/[0.1] text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className={`h-[17px] w-[17px] ${active ? "text-[#c9f27d]" : "text-slate-500 group-hover:text-slate-300"}`}
                  />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7b267] text-[11px] font-extrabold text-[#4d2b12]">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-white">
              Super Admin
            </p>
            <p className="truncate text-[10px] text-slate-500">Admin account</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#111827] px-4 py-5 text-slate-300 transition-transform duration-300 md:hidden ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <span className="text-[17px] font-extrabold text-white">
              Kepegawaian App
            </span>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-11 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </div>
        <nav className="mt-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveNav(item.label);
                  setMobileNavOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold ${activeNav === item.label ? "bg-white/[0.1] text-white" : "text-slate-400"}`}
              >
                <Icon
                  className={`h-[17px] w-[17px] ${activeNav === item.label ? "text-[#c9f27d]" : "text-slate-500"}`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
