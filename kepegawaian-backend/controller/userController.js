const prisma = require("../lib/prisma");

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const user = await prisma.user.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.user.count();

    return res.status(200).json({
      statusCode: 200,
      data: user,
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

exports.getUserById = async (req, res) => {
  try {
    const parsedUserId = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    return res.status(200).json({
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const parsedUserId = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id: parsedUserId },
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
