const prisma = require("../lib/prisma");

exports.getAllEmployeeDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const employeeDocument = await prisma.employeeDocuments.findMany({
      skip: skip,
      take: limit,
      include: {
        employee: true,
      },
    });

    const totalData = await prisma.employeeDocuments.count();

    return res.status(200).json({
      statusCode: 200,
      data: employeeDocument,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
};

exports.getEmployeeDocumentById = async (req, res) => {
  try {
    const parsedEmployeeDocumentId = parseInt(req.params.id);

    const employeeDocument = await prisma.employeeDocuments.findUnique({
      where: { id: parsedEmployeeDocumentId },
      include: {
        employee: true,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      data: employeeDocument,
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
};

exports.createEmployeeDocument = async (req, res) => {
  try {
    const { employee_id, type } = req.body;

    const file_path = req.file ? req.file.filename : null;

    const employeeDocument = await prisma.employeeDocuments.create({
      data: {
        type,
        file_path,
        employee: {
          connect: { id: parseInt(employee_id) },
        },
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: employeeDocument,
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, failed to add new data!",
    });
  }
};

exports.updateEmployeeDocument = async (req, res) => {
  try {
    const parsedEmployeeDocumentId = parseInt(req.params.id);
    const { employee_id, type } = req.body;

    const checkId = await prisma.emploeeDocuments.findUnique({
      where: { id: parsedEmployeeDocumentId },
    });

    if (!checkId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkId} is not found!`,
      });
    }

    const updateData = {
      employee_id: employee_id ? parseInt(employee_id) : undefined,
      type,
    };

    if (req.file) {
      updateData.file_path = req.file.fileName;
    }

    const employeeDocument = await prisma.employeeDocument.update({
      where: { id: parsedEmployeeDocumentId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: employeeDocument,
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, could not update the data!",
    });
  }
};

exports.deleteEmployeeDocument = async (req, res) => {
  try {
    const parsedEmployeeDocumentId = parseInt(req.params.id);

    await prisma.employeeDocument.delete({
      where: { id: parsedEmployeeDocumentId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, could not delete the data!",
    });
  }
};
