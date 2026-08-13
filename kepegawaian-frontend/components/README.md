# Components

Folder ini berisi komponen-komponen yang dapat digunakan kembali (reusable components) di seluruh aplikasi.

## Komponen yang Tersedia

### Sidebar.tsx

Komponen sidebar navigasi untuk dashboard.

**Props:**

- `activeNav: string` - Menu navigasi yang sedang aktif
- `setActiveNav: (nav: string) => void` - Function untuk mengubah menu aktif
- `mobileNavOpen: boolean` - Status sidebar mobile (terbuka/tertutup)
- `setMobileNavOpen: (open: boolean) => void` - Function untuk mengubah status sidebar mobile

**Fitur:**

- Responsive design (desktop dan mobile)
- Dark theme dengan accent color
- Navigasi workspace dan manage
- User profile section
- Help center card

**Penggunaan:**

```tsx
import Sidebar from "../../../components/Sidebar";

<Sidebar
  activeNav={activeNav}
  setActiveNav={setActiveNav}
  mobileNavOpen={mobileNavOpen}
  setMobileNavOpen={setMobileNavOpen}
/>;
```

### Header.tsx

Komponen header/navbar untuk dashboard.

**Props:**

- `search: string` - Nilai search input
- `setSearch: (search: string) => void` - Function untuk mengubah nilai search
- `setMobileNavOpen: (open: boolean) => void` - Function untuk membuka sidebar mobile
- `notificationsOpen: boolean` - Status dropdown notifikasi
- `setNotificationsOpen: (open: boolean) => void` - Function untuk mengubah status dropdown

**Fitur:**

- Search bar responsif
- Notifikasi dengan badge indicator
- User profile dropdown
- Mobile menu toggle button
- Sticky positioning

**Penggunaan:**

```tsx
import Header from "../../../components/Header";

<Header
  search={search}
  setSearch={setSearch}
  setMobileNavOpen={setMobileNavOpen}
  notificationsOpen={notificationsOpen}
  setNotificationsOpen={setNotificationsOpen}
/>;
```

## Struktur File

```
components/
├── Header.tsx       # Komponen header/navbar
├── Sidebar.tsx      # Komponen sidebar navigasi
├── ui/              # Folder untuk UI components (shadcn/ui)
└── README.md        # Dokumentasi ini
```

## Catatan

- Semua komponen menggunakan TypeScript untuk type safety
- Styling menggunakan Tailwind CSS
- Icons menggunakan lucide-react
- Komponen sudah responsive untuk mobile dan desktop
