require("dotenv").config();

const { App } = require("@slack/bolt");
const sarveshId = "U081D39L4MD";
const targetChannelIds = ["C0BCHFZBYMT", "C08LLBLUVPH"];

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
  await respond({ text: `pong!\nlatency: ${latency}ms` });
});

app.command("/tarfish-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `
    𓆝 𓆟 𓆞
*✦ general commands:*
\`/tarfish-ping\` - check bot latency
\`/tarfish-help\` - open this help menu

✦ *fun commands:*
\`/tarfish-greet\` - greet the user
𓆝 𓆟 𓆞
`
  });
});

app.command("/tarfish-greet" , async ({ command, ack, respond }) => {
  await ack();
  await respond({text: `yo, <@${command.user_id}>!`});
});

app.event("member_joined_channel", async ({ event, client }) => {
  try {
    if (!targetChannelIds.includes(event.channel)) {
      return;
    }

    const welcomeMessage = await client.chat.postMessage({
      channel: event.channel,
      text: `welcome to <#${event.channel}>, <@${event.user}>!`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `welcome to <#${event.channel}>, <@${event.user}>!`
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

    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: welcomeMessage.ts,
      text: `here we have a very long talk about this channel, which you probably didn't even sign up for :hs:\n\n*✦ channel lore:*\nthis channel was made in april 2025 when hackclub's <#C088UF12N1Z> event was happening. it was mainly used back then to communicate with his close friends about the chinese culture and tourism! it has kinda evolved a lot since then!\n\n*✦ channel use:*\nit's mostly used by sarvesh to talk about his life and have fun with huddles (maybe one day when he decides to actually reveal his voice :wink:)\n\n*✦ THANK YOUS :YAY::*\n(from yours truly)\nthank you so much to the people who keep me on track and prevent me from procrastinating from the things that actually matter, a HUGE thank you to the friends i made along the way, and lastly, thank you to *YOU* for taking the effort to join the channel and support me!\n\nalso while ur here, join the *sarvesh's residence:* https://slack.com`
    });

  } catch (error) {
    console.error(error);
  }

});

app.action("ping_sarvesh", async ({ ack, body, client }) => {
  await ack();
  try {
    await client.chat.postMessage({
      channel: body.channel.id,
      thread_ts: body.container.message_ts,
      text: `SARVESH GET HERE NOW! <@${sarveshId}>! (pinged by <@${body.user.id}>)`
    });
  } catch (error) {
    console.error(error);
  }
});

app.event("app_mention", async ({ event, client }) => {
  try {
    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: `hey, i'm tarfish! use \`/tarfish-help\` to see what i can do!`
    });
  } catch (error) {
    console.error(error);
  }
});

app.message(/^(\?s\s+)(.*)/i, async ({ message, context, client }) => {
  try {
    if (message.user !== sarveshId) {
      await client.chat.postEphemeral({
        channel: message.channel,
        user: message.user,
        text: "you can't use this command lol"
      });
      return;
    }

    if (!context.matches || !context.matches[2]) {
      return;
    }

    const cleanedMessage = context.matches[2].trim();
    if (!cleanedMessage) {
      await client.chat.postEphemeral({
        channel: message.channel,
        user: message.user,
        text: "please provide a message to send"
      });
      return;
    }

    const payload = {
      channel: message.channel,
      text: cleanedMessage
    };

    if (message.thread_ts) {
      payload.thread_ts = message.thread_ts;
    }

    await client.chat.postMessage(payload);

    await client.chat.delete({
      token: process.env.SLACK_USER_TOKEN,
      channel: message.channel,
      ts: message.ts
    });

  } catch (error) {
    console.error(error);
  }
});

app.command("/tarfish-send", async ({ command, ack, respond, client }) => {
  await ack();
  if (command.user_id !== sarveshId) {
    await respond({
      text: "you can't use this command lol",
      response_type: "ephemeral"
    });
    return;
  }

  if (!command.text || command.text.trim() === "") {
    await respond({
      text: "you need to provide a message to send!",
      response_type: "ephemeral"
    });
    return;
  }

  try {
    await client.chat.postMessage({
      channel: command.channel_id,
      text: command.text
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();