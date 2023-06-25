import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`IITM-WA-BOT-Logic app is listening on port ${port}`);
});
