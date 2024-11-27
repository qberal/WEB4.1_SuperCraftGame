const Groq = require("groq-sdk");
//require('dotenv').config();

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const responseSchema = {
    "fusion_name": "string",
    "emoji": "char",
}

class Infinity {

    static async getFusions(item_name1, item_name2) {
        // Pretty printing improves completion results.
        const jsonSchema = JSON.stringify(responseSchema, null, 4);
        const chat_completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a game intelligence that outputs in JSON.\n
                    You will be given to words and you will have to fusion them in an intelligent way.\n
                     For example, water+earth=mud.\n
                     NEVER give a something that is just a mix of the two words, except if it's totally legit (water+melon = watermelon)\n
                     \n You will also give an emoji according to your result.\n
                     'The JSON object must use the schema: ${jsonSchema}`,
                },
                {
                    role: "user",
                    content: `Fusion ${item_name1} and ${item_name2}`,
                },
            ],
            model: "llama-3.1-70b-versatile",
            temperature: 0,
            stream: false,
            response_format: {type: "json_object"},
        });

        return JSON.parse(chat_completion.choices[0].message.content);
    }
}

module.exports = Infinity;