import express from "express";

const app = express();

const hostname = "localhost";
const port = 8017;

app.get("/", (req, res) => {
  res.send("<h1>Heello word</h1>");
});

app.listen(port, hostname, () => {
  console.log(`Hello on port ${port} - server : ${hostname}`);
});
