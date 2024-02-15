const userServices = require("../service/userService");

exports.getUserData = (req, res) => {
  const users = userServices.getUserData();
  res.status(200).json({
    status: "success",
    const: users.length,
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  const user = userServices.createUser(req.body);
  {
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};

exports.getUserById = (req, res) => {
  const user = userServices.getUserById(req.params.id);
  if (!user.success) {
    return res.status(user.statusCode).json({
      status: "fail",
      message: `Resource with id ${req.params.id} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user: user.user,
    },
  });
};

exports.updateUser = (req, res) => {
  const user = userServices.updateUser(req.body, req.params.id);
  if (!user.success) {
    return res.status(user.statusCode).json({
      status: "fail",
      message: `Resource with id ${req.params.id} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user: user.user,
    },
  });
};

exports.deleteUser = (req, res) => {
  const user = userServices.deleteUser(req.params.id);
  if (!user.success) {
    return res.status(user.statusCode).json({
      status: "fail",
      message: `Resource with id ${req.params.id} not found`,
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
