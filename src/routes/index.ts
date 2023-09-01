import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";
import { processingRequest } from "../controllers/cmd-controller";
import { newUserJoin } from "../controllers/user-controllers";

const router = e.Router();

router.post(
  "/sendMessage",
  async (req: Request<{}, {}, Req_type>, res: Response) => {
    const { cmd } = req.body;
    await processingRequest(cmd, req, res);
  },
);

router.post(
  "/sendGroupJoinInfo",
  async (
    req: Request<{}, {}, { chatId: string; name: string }>,
    res: Response,
  ) => {
    const { chatId, name } = req.body;
    res.json({
      status: "success",
    });
    await newUserJoin(chatId, name);
  },
);

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
