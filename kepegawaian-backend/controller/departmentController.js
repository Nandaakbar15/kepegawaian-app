const prisma = require("../lib/prisma");

exports.getAllDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Jalankan query secara sequential tanpa transaction
    const departments = await prisma.departments.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.departments.count();

    return res.status(200).json({
      statusCode: 200,
      data: departments,
      meta: {
        total: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statsuCode: 500,
      message: "Error, failed to fetch the data!",
    });
  }
};

exports.getDepartmentsById = async (req, res) => {
  try {
    const parsedDepartmentId = parseInt(req.params.id);

    if (!parsedDepartmentId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${parsedDepartmentId} is not found!`,
      });
    }

    const departments = await prisma.departments.findUnique({
      where: { id: parsedDepartmentId },
    });

    return res.status(200).json({
      statusCode: 200,
      data: departments,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, faild to get the data!",
    });
  }
};

exports.createDepartments = async (req, res) => {
  try {
    const { code, name } = req.body;

    const addNewData = {
      code,
      name,
    };

    const departments = await prisma.departments.create({
      data: addNewData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: departments,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot add the data!",
    });
  }
};

exports.updateDepartments = async (req, res) => {
  try {
    const parsedDepartmentId = parseInt(req.params.id);
    const { code, name } = req.body;

    const updateData = {
      code,
      name,
    };

    const checkDepartments = await prisma.departments.findUnique({
      where: { id: parsedDepartmentId },
    });

    if (!checkDepartments) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkDepartments} is not found!`,
      });
    }

    const departments = await prisma.departments.update({
      where: { id: parsedDepartmentId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: departments,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteDepartments = async (req, res) => {
  try {
    const parsedDepartmentId = parseInt(req.params.id);

    await prisma.departments.delete({
      where: { id: parsedDepartmentId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to delete the data!",
    });
  }
};
