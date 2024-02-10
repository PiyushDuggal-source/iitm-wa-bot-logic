import cron from "node-cron";
import { getQuotes } from "../actions/cronjobs";
import { sendMessageToBot } from "../services/whatsApp";

// run every day at 12 PM

cron.schedule("0 6 * * *", async () => {
  const data = await getQuotes();

  const message = `*Quote of the day!* 💭\n\nCategory: *${data.category}*\n\n_*"${data.text}"*_\n                                                                                                     - ${data.author}`;

  sendMessageToBot({ message, groupId: process.env.ANNOUNCEMENT_GROUP as string });
});
