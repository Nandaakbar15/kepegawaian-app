const prisma = require("../lib/prisma");

exports.getAllLeavesTypes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const LeaveTypes = await prisma.leave_types.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.leave_types.count();

    return res.status(200).json({
      statusCode: 200,
      data: LeaveTypes,
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

exports.getLeavesTypesById = async (req, res) => {
  try {
    const parsedLeavesTypeId = parseInt(req.params.id);

    const leaveTypes = await prisma.leave_types.findUnique({
      where: { id: parsedLeavesTypeId },
    });

    return res.status(200).json({
      statusCode: 200,
      data: leaveTypes,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createLeavesTypes = async (req, res) => {
  try {
    const { name, quota_days } = req.body;
    const parseQuotaDays = parseInt(quota_days);

    const leaveTypes = await prisma.leave_types.create({
      data: {
        name,
        quota_days: parseQuotaDays,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Success add new data!",
      data: leaveTypes,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to add new data!",
    });
  }
};

exports.updateLeavesTypes = async (req, res) => {
  try {
    const parsedLeavesTypeId = parseInt(req.params.id);
    const { name, quota_days } = req.body;
    const parseQuotaDays = parseInt(quota_days);

    const updateData = {
      name,
      quota_days: parseQuotaDays,
    };

    const checkLeavesTypes = await prisma.leave_types.findUnique({
      where: { id: parsedLeavesTypeId },
    });

    if (!checkLeavesTypes) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkLeavesTypes} is not found!`,
      });
    }

    const leaveTypes = await prisma.leave_types.update({
      where: { id: parsedLeavesTypeId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: leaveTypes,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteLeavesTypes = async (req, res) => {
  try {
    const parsedLeavesTypeId = parseInt(req.params.id);

    await prisma.leave_types.delete({
      where: { id: parsedLeavesTypeId },
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
