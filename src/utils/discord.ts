export const buildGuildIconUrl = (guildId: string, icon: string) => {
  const format = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${format}`;
};
