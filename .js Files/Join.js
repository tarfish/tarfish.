module.exports = function registerJoin(app, sarveshId, targetChannelIds) {
  app.event("member_joined_channel", async ({ event, client }) => {
    try {
      if (!targetChannelIds.includes(event.channel)) {
        return;
      }

      const welcomeMessage = await client.chat.postMessage({
        channel: event.channel,
        text: `welcome to <#${event.channel}>, <@${event.user}>!`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `welcome to <#${event.channel}>, <@${event.user}>!`
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "click here to ping sarvesh!!"
                },
                action_id: "ping_sarvesh"
              }
            ]
          }
        ]
      });

      const loreText = [
        "here we have a very long talk about this channel, which you probably didn't even sign up for :hs:",
        "",
        "*✦ channel lore:*",
        "this channel was made in april 2025 when hackclub's <#C088UF12N1Z> event was happening.",
        "it was mainly used back then to communicate with his close friends about the chinese culture and tourism! it has kinda evolved a lot since then!",
        "",
        "*✦ channel use:*",
        "it's mostly used by sarvesh to talk about his life and have fun with huddles (maybe one day when he decides to actually reveal his voice :wink:)",
        "",
        "*✦ thank yous :YAY::*",
        "(from yours truly)",
        "thank you so much to the people who keep me on track and prevent me from procrastinating from the things that actually matter, a HUGE thank you to the friends i made along the way, and lastly, thank you to *YOU* for taking the effort to join the channel and support me!",
        "",
        "also while ur here, join the *sarvesh's residence:* https://hackclub.enterprise.slack.com/docs/T0266FRGM/F08NN4BJ1EH"
      ].join("\n");

      await client.chat.postMessage({
        channel: event.channel,
        thread_ts: welcomeMessage.ts,
        text: loreText
      });

    } catch (error) {
      console.error(error);
    }
  });

  app.action("ping_sarvesh", async ({ ack, body, client }) => {
    await ack();
    try {
      await client.chat.postMessage({
        channel: body.channel.id,
        thread_ts: body.container.message_ts,
        text: `SARVESH GET HERE NOW! <@${sarveshId}>! (pinged by <@${body.user.id}>)`
      });
    } catch (error) {
      console.error(error);
    }
  });
};