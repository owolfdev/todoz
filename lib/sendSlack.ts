import { WebClient } from "@slack/web-api";

const slackClient = new WebClient(
  "xoxb-518851412742-5202745215281-ySQlvH6u4n8pQHXDUxUT8lNL"
);

export async function sendSlackMessage(channel: string, text: string) {
  try {
    await slackClient.chat.postMessage({
      channel,
      text,
    });
    console.log("Slack message sent successfully");
  } catch (error) {
    console.error("Error sending Slack message: ", error);
  }
}
