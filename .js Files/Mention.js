module.exports = function registerMention(app, sarveshId) {
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
};