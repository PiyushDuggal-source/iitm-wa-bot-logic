import app from "./app";
import * as dotenv from "dotenv";
import { connectToDb } from "./utils/db";
import './utils/cron'
dotenv.config();

const port = process.env.PORT || 3001;
connectToDb(process.env.DB_URL as string);

app.listen(port, () => {
  console.log(`IITM-WA-BOT-Logic app is listening on port ${port}`);
});

