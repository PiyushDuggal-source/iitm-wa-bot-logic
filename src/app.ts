import e from "express";
import router from "./routes";
import { checkAPI } from "./middleware";

const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(checkAPI);
app.use("/wa-logic-service/api", router);

export default app;
