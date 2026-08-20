import type { Employee } from "./Employee";

export type TypeFileDocument = "KTP" | "Ijazah" | "Kontrak_kerja" | "NPWP";

export type EmployeeDocument = {
  id: number;
  employee?: Employee;
  type: TypeFileDocument;
  file_path: string;
};
