const axios = require('axios');

module.exports = {
    config: {
        name: "gemini",
        accessableby: 0,
        credits: "Jonell Magallanes",
        description: "EDUCATIONAL",
        prefix: false,
        usages: "[question]",
    },   

    start: async function ({ api, event, text, react }) {
        const inputText = text.join(" ");

        const id = event.senderID;

        if (!inputText) return api.sendMessage("Please provide your question.\n\nExample: gemini what is the solar system?", event.threadID, event.messageID);

        try {
            react("⏱️");     

            const response = await axios.get(`https://haze-gemini-v-8ba147453283.herokuapp.com/gemini-vision?text=${encodeURIComponent(inputText)}`);
            if (response.status === 200 && response.data.response) {
                const formattedResponse = response.data.response;
                api.shareContact(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗣𝗿𝗼\n━━━━━━━━━━━━━━━━━━\n\n${formattedResponse}`, id, event.threadID, event.messageID);
            } else {
                console.error("🤖 Error generating response from Gemini API.");
            }
            react("✅");
        } catch (error) {
            console.error("🤖 Error:", error);
            api.sendMessage("🤖 An error occurred while processing Gemini API.", event.threadID, event.messageID);
        }
    }
};
