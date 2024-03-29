import axios from "axios";

export const send = async ({
  color,
  description,
  timestamp,
  title,
  url,
}: {
  color?: number;
  description?: string;
  timestamp?: string;
  title?: string;
  url?: string;
}) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
    embeds: [
      {
        color: color || 65280,
        description,
        timestamp: timestamp ? new Date(timestamp).toISOString() : undefined,
        title,
        url,
      },
    ],
  });
};
