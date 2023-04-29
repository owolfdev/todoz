// lib/slack.ts
import { WebClient } from "@slack/web-api";

const sendSlackMessage = async (channel: string, text: string) => {
  const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

  try {
    await slackClient.chat.postMessage({
      channel,
      text,
    });
    console.log("Slack message sent to:", channel);
  } catch (error) {
    console.error("Error sending Slack message:", error);
  }
};

export { sendSlackMessage };
