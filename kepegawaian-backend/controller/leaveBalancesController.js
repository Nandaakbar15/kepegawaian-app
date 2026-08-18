const prisma = require("../lib/prisma");

exports.getAllLeaveBalances = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const leaveBalances = await prisma.leave_balances.findMany({
      skip: skip,
      take: limit,
      include: {
        employee: true,
      },
    });

    const totalData = await prisma.leave_balances.count();

    return res.status(200).json({
      statusCode: 200,
      data: leaveBalances,
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
      message: "Error, could not fetch the data!",
    });
  }
};

exports.getLeavesBalancesById = async (req, res) => {
  try {
    const parsedLeaveBalancesId = parseInt(req.params.id);

    const leaveBalances = await prisma.leave_balances.findUnique({
      where: { id: parsedLeaveBalancesId },
    });

    return res.status(201).json({
      statusCode: 201,
      data: leaveBalances,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
};

exports.createLeaveBalances = async (req, res) => {
  try {
    const { employee_id, year, remaining_quota } = req.body;

    const parsedYear = parseInt(year);
    const parsedRemainingQuota = parseInt(remaining_quota);

    const leaveBalances = await prisma.leave_balances.create({
      data: {
        employee: {
          connect: { id: parseInt(employee_id) },
        },
        year: parsedYear,
        remaining_quota: parsedRemainingQuota,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: leaveBalances,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not add new data!",
    });
  }
};

exports.updateLeaveBalances = async (req, res) => {
  try {
    const parsedLeaveBalancesId = parseInt(req.params.id);

    const { employee_id, year, remaining_quota } = req.body;

    const parsedYear = parseInt(year);
    const parsedRemainingQuota = parseInt(remaining_quota);

    const checkLeaveBalances = await prisma.leave_balances.findUnique({
      where: { id: parsedLeaveBalancesId },
    });

    if (!checkLeaveBalances) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with the ID ${checkLeaveBalances} is not found!`,
      });
    }

    const updateData = {
      employee_id: employee_id ? parseInt(employee_id) : undefined,
      year: parsedYear,
      remaining_quota: parsedRemainingQuota,
    };

    const leaveBalances = await prisma.leave_balances.update({
      where: { id: parsedLeaveBalancesId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: leaveBalances,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not update the data!",
    });
  }
};

exports.deleteLeaveBalances = async (req, res) => {
  try {
    const parsedLeaveBalancesId = parseInt(req.params.id);

    await prisma.leave_balances.delete({
      where: { id: parsedLeaveBalancesId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not delete the data!",
    });
  }
};
