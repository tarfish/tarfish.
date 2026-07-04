require("dotenv").config();

const { App } = require("@slack/bolt");
const sarveshId = "U081D39L4MD";
const targetChannelIds = ["C0BCHFZBYMT", "C08LLBLUVPH"];

const Mention = require("./.js Files/Mention");
const Help = require("./.js Files/Help");
const Join = require("./.js Files/Join");
const Ping = require("./.js Files/Ping");
const Send1 = require("./.js Files/Send1");
const Send2 = require("./.js Files/Send2");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true
});

Mention(app, sarveshId);
Help(app);
Join(app, sarveshId, targetChannelIds);
Ping(app);
Send1(app, sarveshId);
Send2(app, sarveshId);

(async () => {
  await app.start();
  console.log("bot is running!");
})();