module.exports = function registerMorning(app, targetChannelIds) {
  const cron = require("node-cron");

cron.schedule("0 9 * * *", async () => {
    try {
        await Promise.all(
            targetChannelIds.map((channelId) => {
                return app.client.chat.postMessage({
                    token: process.env.SLACK_BOT_TOKEN,
                    channel: channelId,
                    text: `good morning slack! how are we doing today?`
                });
            })
        );
    } catch (error) {
        console.error(error);
    }
});
}