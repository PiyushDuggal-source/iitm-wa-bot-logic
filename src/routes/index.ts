import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";
import { processingRequest } from "../controllers/cmd-controller";

const router = e.Router();

router.post(
  "/sendMessage",
  async (req: Request<{}, {}, Req_type>, res: Response) => {
    const { cmd } = req.body;
    await processingRequest(cmd, req, res);
  },
);

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
