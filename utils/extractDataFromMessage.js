function extractDataFromMessage(baileysMessage) {
  const textMessage = baileysMessage.message?.conversation;
  const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text;
  const imageTextMessage = baileysMessage.message?.imageMessage?.caption;
  const videoTextMessage = baileysMessage.message?.videoMessage?.caption;

  const fullMessage =
    textMessage || extendedTextMessage || imageTextMessage || videoTextMessage;

  if (!fullMessage) {
    return {
      remoteJid: "",
      fullMessage: "",
      command: "",
      isImage: false,
      isVideo: false,
    };
  }

  const isImage = is(baileysMessage, "image");
  const isVideo = is(baileysMessage, "video");
  const isSticker = is(baileysMessage, "sticker");

  const [command, ...args] = fullMessage.trim().split(" ");

  const arg = args.reduce((acc, cur) => acc + " " + cur, "").trim();

  return {
    fullMessage,
    isImage,
    isVideo,
    isSticker,
    remoteJid: baileysMessage.key.remoteJid,
    args: arg,
  };
}

function is(baileaysMessage, context) {
  return (
    baileaysMessage.message?.[`${context}Message`] ||
    baileaysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
      `${context}Message`
    ]
  );
}

module.exports = {extractDataFromMessage};
