import e from "express";
import { Request, Response } from "express";
import { Req_type } from "../types";
import { processMessageSend } from "../controllers/wa-controllers";
import { createCmdResponse } from "../controllers/cmd-controller";
import { sendMessageToBot } from "../services/whatsApp";
import { NO_CMD_FOUND, NO_NOTES_FOUND, REACT_EMOGIES } from "../replies";
import { random } from "../common";

const router = e.Router();

router.post(
  "/sendMessage",
  async (req: Request<{}, {}, Req_type>, res: Response) => {
    const { cmd } = req.body;

    const commandRes = await createCmdResponse(cmd);

    if (commandRes === "No Notes Found") {
      sendMessageToBot({
        message: NO_NOTES_FOUND[random(NO_NOTES_FOUND.length)],
      });
      res.json({ status: "No notes found" });
    } else if (commandRes === "No such command") {
      sendMessageToBot({
        message: NO_CMD_FOUND[random(NO_NOTES_FOUND.length)],
      });
      res.json({ status: "No cmd found" });
    } else {
      res.json({
        status: "success",
        emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
      });
      await processMessageSend(req.body, commandRes as string);
    }
  },
);

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
