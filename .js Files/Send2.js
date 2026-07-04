module.exports = function registerSend2(app, sarveshId) {
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
};