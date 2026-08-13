import { Bell, ChevronDown, Menu, Search } from "lucide-react";

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
  setMobileNavOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
}

export default function Header({
  search,
  setSearch,
  setMobileNavOpen,
  notificationsOpen,
  setNotificationsOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-slate-200/80 bg-[#f7f8fb]/95 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="rounded-lg p-2 text-slate-500 hover:bg-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[11px] font-semibold text-slate-400">Workspace</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            className="h-10 w-[200px] rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs font-medium outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-900/[0.04] lg:w-[230px]"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-[17px] w-[17px]" />
            <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#fb7185] ring-2 ring-white" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-slate-900">
                  Notifications
                </p>
                <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-500">
                  2 new
                </span>
              </div>
              <div className="mt-3 space-y-3">
                <p className="text-[11px] leading-relaxed text-slate-500">
                  <span className="font-bold text-slate-700">
                    Revenue target reached.
                  </span>{" "}
                  You're 8% ahead of forecast.
                </p>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  <span className="font-bold text-slate-700">
                    New team member added.
                  </span>{" "}
                  Welcome Taylor.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="hidden h-7 w-px bg-slate-200 sm:block" />
        <button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7b267] text-[11px] font-extrabold text-[#4d2b12]">
            AM
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
