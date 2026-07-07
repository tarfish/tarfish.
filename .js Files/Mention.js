module.exports = function registerMention(app, sarveshId) {
  app.event("app_mention", async ({ event, client }) => {
    try {
      if (event.user !== sarveshId) {
        await client.chat.postMessage({
          channel: event.channel,
          thread_ts: event.ts,
          text: `hey, i'm tarfish! use \`/tarfish-help\` to see what i can do!`
        });
      }

      if (event.user === sarveshId) {
        await client.chat.postMessage({
          channel: event.channel,
          thread_ts: event.ts,
          text: `my ping code works dw`
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};