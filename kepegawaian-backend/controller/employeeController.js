const prisma = require("../lib/prisma");
const { connect } = require("../routes/route");

exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const employees = await prisma.employees.findMany({
      skip: skip,
      take: limit,
      include: {
        departments: true,
        positions: true,
      },
    });

    const totalData = await prisma.employees.count();

    return res.status(200).json({
      statusCode: 200,
      data: employees,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const parsedEmployeeId = parseInt(req.params.id);

    const employee = await prisma.employees.findUnique({
      where: { id: parsedEmployeeId },
      include: {
        positions: true,
        departments: true,
      },
    });

    if (!employee) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${employee} is not found!`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: employee,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const {
      nip,
      full_name,
      nik,
      jenis_kelamin,
      birth_place,
      birth_Date,
      phone,
      address,
      statusPernikahan,
      agama,
      join_date,
      departmentId,
      position_id,
    } = req.body;

    const newEmployee = await prisma.employees.create({
      data: {
        nip,
        full_name,
        nik,
        jenis_kelamin,
        birth_place,
        birth_Date: new Date(birth_Date),
        phone,
        address,
        statusPernikahan,
        agama,
        join_date: new Date(join_date),
        departments: {
          connect: { id: parseInt(departmentId) },
        },
        positions: {
          connect: { id: parseInt(position_id) },
        },
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot add new data!",
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const parsedEmployeeId = parseInt(req.params.id);

    const {
      nip,
      full_name,
      nik,
      jenis_kelamin,
      birth_place,
      birth_Date,
      phone,
      address,
      statusPernikahan,
      agama,
      join_date,
      departmentId,
      position_id,
    } = req.body;

    const checkEmployee = await prisma.employees.findUnique({
      where: { id: parsedEmployeeId },
    });

    if (!checkEmployee) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkEmployee} is not found!`,
      });
    }

    const updateData = {
      nip,
      full_name,
      jenis_kelamin,
      birth_place,
      birth_Date: birth_Date ? new Date(birth_Date) : undefined,
      phone,
      address,
      statusPernikahan,
      agama,
      join_date: join_date ? new Date(join_date) : undefined,
      departmentId: departmentId ? parseInt(departmentId) : undefined,
      position_id: position_id ? parseInt(position_id) : undefined,
    };

    const employee = await prisma.employees.update({
      where: { id: parsedEmployeeId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: employee,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const parsedEmployeeId = parseInt(req.params.id);

    await prisma.employees.delete({
      where: { id: parsedEmployeeId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot delete the data!",
    });
  }
};
