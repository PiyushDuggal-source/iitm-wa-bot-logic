import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";
import { processMessageSend } from "../controllers/wa-controllers";

const router = e.Router();

router.post("/sendMessage", (req: Request<{}, {}, Req_type>, res: Response) => {
  console.log(req.body);
  processMessageSend(req.body);
  res.sendStatus(200);
});

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
