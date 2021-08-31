export const buildGuildIconUrl = (guildId: string, icon: string) => {
  const format = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${format}`;
};

export const buildAvatarUrl = (userId: string, avatar: string) => {
  const format = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${format}`;
};

export const buildMessageLink = (
  guildId: string,
  channelId: string,
  messageId: string
) => `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;

export const messageContentToStandardMarkdown = (content: string) => {
  return content.replaceAll("\n", "  \n");
};
