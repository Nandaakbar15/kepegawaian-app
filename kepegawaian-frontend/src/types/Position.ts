import type { Department } from "./Department";

export type Positions = {
  id: number;
  title: string;
  level: string;
  departments?: Department;
};
