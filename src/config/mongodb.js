import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null(vì chưa connect)
let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Kết nối tới database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới mongoDB Atlas với URI đc khai báo trong mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nối thành công thì lấy ra Database theo tên và gọi ngược lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Databse first!");
  return trelloDatabaseInstance;
};
