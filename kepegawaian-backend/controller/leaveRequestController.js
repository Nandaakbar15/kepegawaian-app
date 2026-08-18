const prisma = require("../lib/prisma");

exports.getAllLeaveRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const leaveRequest = await prisma.leave_requests.findMany({
      skip: skip,
      take: limit,
      include: {
        employee: true,
        leave_type: true,
      },
    });

    const totalData = await prisma.leave_requests.count();

    return res.status(200).json({
      statusCode: 200,
      data: leaveRequest,
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

exports.getLeaveRequestById = async (req, res) => {
  try {
    const parseLeaveRequestId = parseInt(req.params.id);

    const leaveRequest = await prisma.leave_requests.findUnique({
      where: { id: parseLeaveRequestId },
      include: {
        employee: true,
        leave_type: true,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      data: leaveRequest,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
};

exports.createLeaveRequest = async (req, res) => {
  try {
    const { start_date, end_date, reason, status, employee_id, leave_type_id } =
      req.body;

    const leave_request = await prisma.leave_requests.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        reason,
        status,
        employee: {
          connect: { id: parseInt(employee_id) },
        },
        leave_type: {
          connect: { id: parseInt(leave_type_id) },
        },
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully add new data!",
      data: leave_request,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to add new data!",
      error: error,
    });
  }
};

exports.updateLeaveRequest = async (req, res) => {
  try {
    const { start_date, end_date, reason, status, employee_id, leave_type_id } =
      req.body;

    const parseLeaveRequestId = parseInt(req.params.id);

    const checkLeaveRequest = await prisma.leave_requests.findUnique({
      where: { id: parseLeaveRequestId },
    });

    if (!checkLeaveRequest) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with the ID ${checkLeaveRequest} is not found!`,
      });
    }

    const updateData = {
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      reason,
      status,
      employee_id: employee_id ? parseInt(employee_id) : undefined,
      leave_type_id: leave_type_id ? parseInt(leave_type_id) : undefined,
    };

    const leaveRequest = await prisma.leave_requests.update({
      where: { id: parseLeaveRequestId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: leaveRequest,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const parsedLeavesRequestId = parseInt(req.params.id);

    await prisma.leave_request.delete({
      where: { id: parsedLeavesRequestId },
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
