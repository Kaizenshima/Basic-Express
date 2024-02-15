const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./data/MOCK_DATA.json"));

function getUserData() {
  return users;
}

function createUser(userData) {
  const newUserID = users[users.length - 1].id + 1;
  const user = Object.assign({ id: newUserID }, userData);
  users.push(user);
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    console.log(err);
  });
  return users;
}

function updateUser(dataToUpdate, id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      error: `User with an id of ${id} not found`,
    };
  }

  const index = users.indexOf(user);
  const newRecord = Object.assign(user, dataToUpdate);
  users[index] = newRecord;

  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    console.log(err);
  });
  return {
    success: true,
    statusCode: 200,
    user,
  };
}

function getUserById(id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      error: `User with an id of ${id} not found`,
    };
  }
  return {
    success: true,
    statusCode: 200,
    user,
  };
}

function deleteUser(id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: `Resource with id ${id} not found`,
    };
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    console.log(err);
  });
  return {
    success: true,
    statusCode: 200,
    message: `User with id ${id} deleted successfully`,
    user: null,
  };
}

module.exports = {
  getUserData,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
};
