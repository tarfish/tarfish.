module.exports = function registerSummary(app, sarveshId, targetChannelIds) {
  const cron = require("node-cron");
    
cron.schedule("0 21 * * *", async () => {
    try {
        await Promise.all(
            targetChannelIds.map((channelId) => {
                return app.client.chat.postMessage({
                    token: process.env.SLACK_BOT_TOKEN,
                    channel: channelId,
                    text: `here's <@${sarveshId}>'s summary for today!`
                });
            })
        );
    } catch (error) {
        console.error(error);
    }
});
}