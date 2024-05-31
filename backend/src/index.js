const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.SERVER_PORT;
const url = process.env.MONGODB_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((error) => {
    console.log(`error : ${error}`);
  });

app.listen(port, () => {
  console.log(`Port is runnin on : ${port}`);
});
