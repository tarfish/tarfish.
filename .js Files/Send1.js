module.exports = function registerSend1(app, sarveshId) {
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
};