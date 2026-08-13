const prisma = require("../lib/prisma");

exports.getAllPositions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const positions = await prisma.positions.findMany({
      skip: skip,
      take: limit,
      include: {
        departments: true,
      },
    });

    const totalData = await prisma.positions.count();

    return res.status(200).json({
      statusCode: 200,
      data: positions,
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
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getPositionsById = async (req, res) => {
  try {
    const parsedPositions = parseInt(req.params.id);

    const positions = await prisma.positions.findUnique({
      where: { id: parsedPositions },
      include: {
        departments: true,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      data: positions,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createPositions = async (req, res) => {
  try {
    const { title, level, departmentId } = req.body;

    const newPositions = await prisma.positions.create({
      data: {
        title,
        level,
        departments: {
          connect: { id: parseInt(departmentId) },
        },
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: newPositions,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot add new data!",
    });
  }
};

exports.updatePositions = async (req, res) => {
  try {
    const parsedPositionsId = parseInt(req.params.id);

    const { title, level, departmentsId } = req.body;

    const checkPositionId = await prisma.positions.findUnique({
      where: { id: parsedPositionsId },
    });

    if (!checkPositionId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkPositionId} is not found!`,
      });
    }

    const updateData = {
      title,
      level,
      departmentsId: departmentsId ? parseInt(departmentsId) : undefined,
    };

    const position = await prisma.positions.update({
      where: { id: parsedPositionsId },
      data: updateData,
      include: {
        departments: true,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: position,
    });
  } catch (error) {
    console.error("Error : ", error);
  }
};

exports.deletePositions = async (req, res) => {
  try {
    const parsedPositionsId = parseInt(req.params.id);

    await prisma.positions.delete({
      where: { id: parsedPositionsId },
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
