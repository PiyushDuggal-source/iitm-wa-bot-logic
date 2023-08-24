import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";
import { processMessageSend } from "../controllers/wa-controllers";
import { createCmdResponse } from "../controllers/cmd-controller";

const router = e.Router();

router.post(
  "/sendMessage",
  async (req: Request<{}, {}, Req_type>, res: Response) => {
    const { cmd } = req.body;

    const commandRes = await createCmdResponse(cmd);
    if (commandRes === "No Notes Found" || commandRes === "No such command") {
      return {
        status: "No such command",
      };
    }

    if (commandRes === "No such command") {
      res.json({ status: "No such command" });
    } else {
      res.json({ status: "success" });
    }
    await processMessageSend(req.body, commandRes as string);
  },
);

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
