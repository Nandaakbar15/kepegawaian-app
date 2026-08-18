import type { LeaveTypes } from "./LeaveTypes";

import type { Employee } from "./Employee";

export type StatusLeaveRequest = "PENDING" | "APPROVE" | "REJECTED";

export type LeaveRequest = {
  id: number;
  employee?: Employee;
  leave_type?: LeaveTypes;
  start_date: Date;
  end_date: Date;
  reason: string;
  status: StatusLeaveRequest;
};
