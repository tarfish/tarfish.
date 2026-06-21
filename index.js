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
\`/tarfish-ping\` - check bot latency
\`/tarfish-help\` - open this help menu
`
  });
});

app.command("/tarfish-greet" , async ({ command, ack, respond }) => {
  await ack();
  await respond({text: `yo, <@${command.user_id}>!`});
});

app.event("member_joined_channel", async ({ event, client }) => {
  try {
    await client.chat.postMessage({
      channel: "C08LLBLUVPH",
      text: `welcome to <#C08LLBLUVPH>, <@${event.user}>!`
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();