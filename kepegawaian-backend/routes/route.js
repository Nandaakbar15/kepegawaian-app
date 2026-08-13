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

module.exports = router;
