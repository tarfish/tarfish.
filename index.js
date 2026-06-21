require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/tarfish-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/tarfish-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `
*🤖 general commands:*
/tarfish-ping - check bot latency
/tarfish-help - open this help menu`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();