import type { Employee } from "./Employee";

export type LeaveBalances = {
  id: number;
  employee?: Employee;
  year: number;
  remaining_quota: number;
};
