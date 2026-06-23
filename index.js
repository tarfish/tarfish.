require("dotenv").config();

const { App } = require("@slack/bolt");
const sarveshId = "U081D39L4MD";
const targetChannelId = "C0BCHFZBYMT";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
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
    𓆝 𓆟 𓆞
*✦ general commands:*
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
    if (event.channel !== targetChannelId) {
      return;
    }

    await client.chat.postMessage({
      channel: targetChannelId,
      text: `welcome to <#${targetChannelId}>, <@${event.user}>!`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `welcome to <#${targetChannelId}>, <@${event.user}>!`
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "click here to ping sarvesh!!"
              },
              action_id: "ping_sarvesh"
            }
          ]
        }
      ]
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("ping_sarvesh", async ({ ack, body, client }) => {
  await ack();
  try {
    await client.chat.postMessage({
      channel: targetChannelId,
      text: `SARVESH GET HERE NOWW <@${sarveshId}>!`
    });
  await respond({
  replace_original: true,
});
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();