module.exports = function registerHelp(app) {
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
};