const axios = require('axios');

module.exports = {
    config: {
        name: "ai",
        accessableby: 0,
        credits: "Jonell Magallanes",
        description: "EDUCATIONAL",
        prefix: false,
        usages: "[question]",
    },   

    start: async function ({ api, event, text, react }) {
        const content = encodeURIComponent(text.join(" "));
        const id = event.senderID;

        const apiUrl = `https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/gptconvo?ask=${content}&id=${id}`;

        if (!content) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", event.threadID, event.messageID);

        try {
            if (event.type === "message_reply") {
                if (event.messageReply.attachments[0]) {
                    const attachment = event.messageReply.attachments[0];
        react("⏱️")

                    if (attachment.type === "photo") {
                        const imageURL = attachment.url;
                        const response = await axios.get(`https://haze-gemini-v-8ba147453283.herokuapp.com/gemini-vision?text=${encodeURIComponent(content)}&image_url=${encodeURIComponent(imageURL)}`);
                        const caption = response.data.response;
       react("✅")
                        if (caption) {
                            api.shareContact(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗩𝗶𝘀𝗶𝗼𝗻 𝗣𝗿𝗼 𝗜𝗺𝗮𝗴𝗲 𝗥𝗲𝗰𝗼𝗴𝗻𝗶𝘁𝗶𝗼𝗻 \n━━━━━━━━━━━━━━━━━━\n\n${caption}`, id, event.threadID, event.messageID);
                        } else {
                            api.sendMessage("🤖 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚌𝚘𝚐𝚗𝚒𝚣𝚎𝚍 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎𝚜.", event.threadID, event.messageID);
                        }
                        return;
                    }
                }
            }
            react("⏱️");     

            const response = await axios.get(apiUrl);
            const { response: result } = response.data;
            react("✅");
            const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\n\n${result}`;

            api.shareContact(responseMessage, id, event.threadID, event.messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while processing your request.", event.threadID);
        }
    }
};
