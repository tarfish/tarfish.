module.exports = function registerSchedule(app, sarveshId) {
  const cron = require("node-cron");

cron.schedule("0 9 * * *", async () => {
    try {
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: "C08LLBLUVPH",
            text: `good morning slack!`
        });
    } catch (error) {
        console.error(error);
    }
});
}