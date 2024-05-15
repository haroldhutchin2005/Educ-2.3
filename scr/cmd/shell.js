const { exec } = require("child_process");
module.exports.config = {
  name: "shell",
  description: "Run shell.",
  credits: "Deku",
  usage: "[shell]",
  accessableby: 1,
  prefix: true
}
module.exports.start = async function({ api, event, text, reply }) {
let tex = text.join(" ")
  if (!tex) return reply('Missing input')
exec(`${tex}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`Error Output: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`Error Output:\n${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`Output:\n${stdout}`, event.threadID, event.messageID);
});
}