const Groq = require("groq-sdk");
const Word = require('../model/word');

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const jsonSchema = {
    "name": "string",
    "icon": "string",
}

class Infinity {

    static async getWordOfTheDay() {
        const word = await Word.getWordOfTheDay();
        return word;
    }

    static async getFusions(item_name1, item_name2) {

        const wordOfTheDay = await this.getWordOfTheDay();

        // Validation des entrées utilisateur
        const sanitizeInput = (input) =>
            /^[a-zA-ZÀ-ÿ]+$/.test(input) && input.length <= 20 ? input : null;

        const sanitizedItem1 = sanitizeInput(item_name1);
        const sanitizedItem2 = sanitizeInput(item_name2);


        // Appel au modèle avec des consignes claires
        const chat_completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
                    You are a game intelligence for a fusion game.
                    Your task is to fuse two items into a reasonable output with a corresponding emoji for display.
                    Think of minecraft crafting recipes.
                    The goal is to find the "word of the day" by combining base items Today's word is "${wordOfTheDay}".
                    Rules:
                    - Be creative but reasonable; avoid nonsensical combinations.
                    - Always put a majuscule at the beginning of the name.
                    - Always use a one-character emoji.
                    Example outputs:
                    - Input: water + earth -> Output: {"name": "Mud", "icon": "🌱"}
                    - Input: fire + stone -> Output: {"name": "Lava", "icon": "🌋"}
                    JSON schema: ${jsonSchema}.
                `,
                },
                {
                    role: "user",
                    content: `Fusion ${sanitizedItem1} and ${sanitizedItem2}.`,
                },
            ],
            model: "llama-3.3-70b-specdec",
            temperature: 0.7,
            stream: false,
            response_format: {type: "json_object"},
        }).catch((error) => {
            return 'Error';
        });

        if (chat_completion === 'Error') {
            return {"name": "Error", "icon": "❌"};
        }

        return JSON.parse(chat_completion.choices[0].message.content);
    }
}

module.exports = Infinity;