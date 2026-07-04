module.exports = function registerPing(app) {
  app.command("/tarfish-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `pong!\nlatency: ${latency}ms` });
  });
};
