export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 py-7 text-[10px] font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2024 Orbit Analytics. Built for clarity.</p>
      <div className="flex gap-4">
        <button className="hover:text-slate-600">Privacy</button>
        <button className="hover:text-slate-600">Terms</button>
        <button className="hover:text-slate-600">Status</button>
      </div>
    </footer>
  );
}
