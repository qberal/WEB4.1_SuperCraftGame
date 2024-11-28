const Groq = require("groq-sdk");
//require('dotenv').config();

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const responseSchema = {
    "fusion_name": "string",
}

class Infinity {


    static async getIcon(query) {
        console.log(`query in getIcon: ${query}`);
        try {
            const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_KEY}&cx=${process.env.GOOGLE_SEARCH_CX}&searchType=image&q=${query} icon filetype:png`);
            const data = await response.json();

            if (data.items && data.items[0] && data.items[0].link) {
                console.log(query);
                console.log(data.items[0].link);
                return data.items[0].link; // Retourne le lien ici
            } else {
                console.error('No items found in the response.');
                return null; // Gérer le cas où aucun résultat n'est trouvé
            }
        } catch (err) {
            console.error('Error:', err);
            return null; // Retourne null en cas d'erreur
        }
    }

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

        let res = JSON.parse(chat_completion.choices[0].message.content);
        let link = await this.getIcon(res.fusion_name);

        console.log({fusion_name: res.fusion_name, icon: link});

        return {fusion_name: res.fusion_name, icon: `${link}`};
    }
}

module.exports = Infinity;