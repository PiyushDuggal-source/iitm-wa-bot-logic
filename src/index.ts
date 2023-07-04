import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`IITM-WA-BOT-Logic app is listening on port ${port}`);
});
