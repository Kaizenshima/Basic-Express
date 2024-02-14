const express = require("express");
const fs = require("fs");

//Read
const users = JSON.parse(fs.readFileSync("./data/MOCK_DATA.json"));

//Write
//fs.writeFile()

const app = express();
//middleware
app.use(express.json());

//Routes
//Get User
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    const: users.length,
    data: {
      users,
    },
  });
});

//Post User
app.post("/users", (req, res) => {
  //get the last id of the users
  const newUserID = users[users.length - 1].id + 1;
  //merge the new user with the last id
  const user = Object.assign({ id: newUserID }, req.body);
  users.push(user);
  //add the new user to the users array
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    //send response
    res.status(201).json({
      status: "success",
      data: {
        users,
      },
    });
  });
});

//Get User by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

//Update User by ID
app.patch("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `Resource with id ${req.params.id} not found`,
    });
  }

  const index = users.indexOf(user);
  const newRecord = Object.assign(user, req.body);
  users[index] = newRecord;

  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        user: newRecord,
      },
    });
  });
});

app.delete("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
});
const post = 8000;
app.listen(post, () => {
  console.log("Server is running on port 8000");
});
