import type { Department } from "./Department";

import type { Positions } from "./Position";

export type JenisKelamin = "Laki_laki" | "Perempuan";

export type StatusPernikahan = "Sudah_menikah" | "Belum_menikah";

export type Employee = {
  id: number;
  nip: string;
  departments?: Department;
  positions?: Positions;
  full_name: string;
  nik: string;
  jenis_kelamin: JenisKelamin;
  birth_place: string;
  birth_Date: Date;
  phone: string;
  address: string;
  statusPernikahan: StatusPernikahan;
  agama: string;
  join_date: Date;
};
