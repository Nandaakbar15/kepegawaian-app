export type Role = "Superadmin" | "Admin" | "Manager" | "Karyawan";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
};
