import { connect, set } from "mongoose";

export const connectToDb = async (dbUrl: string) => {
  console.log("\nEntering connectToDb");
  try {
    set("strictQuery", false);
    await connect(dbUrl);
    console.log("connected to db");
    console.log("Leaving connectToDb\n");
  } catch (error) {
    console.log("Leaving connectToDb with error\n");
    console.log(error);
    process.exit(0);
  }
};
