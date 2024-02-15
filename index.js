const express = require("express");
const userRouter = require("./src/routes/userRouter");
const cors = require("cors");
const morgan = require("morgan");
//Write
//fs.writeFile()

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/", userRouter);

const post = 8000;
app.listen(post, () => {
  console.log("Server is running on port 8000");
});
