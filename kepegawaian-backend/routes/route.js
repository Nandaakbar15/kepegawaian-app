const express = require("express");
const router = express();

const {
  getAllDepartments,
  getDepartmentsById,
  createDepartments,
  updateDepartments,
  deleteDepartments,
} = require("../controller/departmentController");

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const {
  getAllPositions,
  getPositionsById,
  createPositions,
  deletePositions,
  updatePositions,
} = require("../controller/positionController");

const {
  getAllLeavesTypes,
  createLeavesTypes,
  getLeavesTypesById,
  updateLeavesTypes,
  deleteLeavesTypes,
} = require("../controller/leavesTypesController");
const {
  getAllLeaveRequest,
  getLeaveRequestById,
  createLeaveRequest,
  deleteLeaveRequest,
  updateLeaveRequest,
} = require("../controller/leaveRequestController");
const {
  getAllLeaveBalances,
  getLeavesBalancesById,
  createLeaveBalances,
  updateLeaveBalances,
  deleteLeaveBalances,
} = require("../controller/leaveBalancesController");

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Kepegawaian App backend",
  });
});

// routes departments
router.get("/api/v1/departments", getAllDepartments);
router.get("/api/v1/departments/:id", getDepartmentsById);
router.post("/api/v1/createDepartments", createDepartments);
router.put("/api/v1/updateDepartments/:id", updateDepartments);
router.delete("/api/v1/departments/:id", deleteDepartments);

// routes employess
router.get("/api/v1/employees", getAllEmployees);
router.get("/api/v1/employees/:id", getEmployeeById);
router.post("/api/v1/createEmployee", createEmployee);
router.put("/api/v1/updateEmployee/:id", updateEmployee);
router.delete("/api/v1/deleteEmployee/:id", deleteEmployee);

// routes position
router.get("/api/v1/positions", getAllPositions);
router.get("/api/v1/positions/:id", getPositionsById);
router.post("/api/v1/createPositions", createPositions);
router.put("/api/v1/updatePositions/:id", updatePositions);
router.delete("/api/v1/positions/:id", deletePositions);

// routes leaves types
router.get("/api/v1/leaveTypes", getAllLeavesTypes);
router.get("/api/v1/leaveTypes/:id", getLeavesTypesById);
router.post("/api/v1/createLeaveTypes", createLeavesTypes);
router.put("/api/v1/updateLeaveTypes/:id", updateLeavesTypes);
router.delete("/api/v1/deleteLeaveTypes/:id", deleteLeavesTypes);

// routes leave request
router.get("/api/v1/leaveRequest", getAllLeaveRequest);
router.get("/api/v1/leaveRequest/:id", getLeaveRequestById);
router.post("/api/v1/createLeaveRequest", createLeaveRequest);
router.put("/api/v1/updateLeaveRequest/:id", updateLeaveRequest);
router.delete("/api/v1/deleteLeaveRequest/:id", deleteLeaveRequest);

// routes leave balances
router.get("/api/v1/leaveBalances", getAllLeaveBalances);
router.get("/api/v1/leaveBalances/:id", getLeavesBalancesById);
router.post("/api/v1/createLeaveBalances", createLeaveBalances);
router.put("/api/v1/updateLeaveBalances/:id", updateLeaveBalances);
router.delete("/api/v1/deleteLeaveBalances/:id", deleteLeaveBalances);

module.exports = router;
