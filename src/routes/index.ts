import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";

const router = e.Router();

router.post("/sendMessage", (req: Request<{}, {}, Req_type>, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
