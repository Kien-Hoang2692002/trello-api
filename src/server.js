/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";

const START_SERVER = () => {
  const app = express();

  // Enable req.body json data
  app.use(express.json());

  app.use("/v1", APIs_V1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}`
    );
  });

  // Thực hiện các tác vụ clean-up trước khi dừng server
  exitHook(() => {
    CLOSE_DB();
  });
};

// IIFE
(async () => {
  try {
    console.log("1.Connecting to MongoDB Atlas!");
    await CONNECT_DB();
    console.log("2.Connected to MongoDB Atlas!");

    // Khi kết nối tới DB thành công thì mới Start Server
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();

// Khi kết nối tới DB thành công thì mới Start Server
// CONNECT_DB()
//   .then(() => console.log("Connected to MongoDB Atlas!"))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error);
//     process.exit(0);
//   });
