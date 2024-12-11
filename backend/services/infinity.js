const Groq = require("groq-sdk");
const Word = require('../model/word');

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const jsonSchema = {
    "name": "string",
    "icon": "string",
}

/**
 * Service to interact with the Infinity game
 */
class Infinity {

    /**
     * Get the word of the day
     * @returns {Promise<*>}
     */
    static async getWordOfTheDay() {
        const word = await Word.getWordOfTheDay();
        return word;
    }

    /**
     * Get the fusions of two items
     * @param item_name1
     * @param item_name2
     * @returns {Promise<{name: string, icon: string}|any>}
     */
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
                    Design a fusion game where players combine two logical and intuitive words to create a third word. The goal is for players to deduce a creative but logical word of the day: ${wordOfTheDay}.
                    
                    ### Guidelines:
                    1. **Fusion Logic:**
                       - The combinations must be meaningful and intuitive.
                       - Avoid redundant chains (e.g., "Timber" + "Timber" = "Table").
                       - Ensure diverse and creative word associations, making the final word moderately challenging but logical to derive.
                    
                    2. **Examples:**
                       - "Fire" + "Water" = "Steam" 💨
                       - "Earth" + "Fire" = "Lava" 🌋
                       - "Wheat" + "Mill" = "Flour" 🌾
                       - "Library" + "Computer" = "Internet" 🌐
                    
                    3. **Rules:**
                       - Include one emoji that best represents the resulting word.
                       - Always capitalize the first letter of the resulting word.
                       - Avoid nonsensical combinations (e.g., "Oyster" + "Plant" = "Pasta").
                       - The final word should require at least **two unique fusion steps** and should not directly match the input words.
                    
                    4. **Output Format:**
                       Return the result as a JSON object (${jsonSchema}):
                       for example : {"name": "Mud", "icon": "🌱"}

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

/**
 *                     You are a game intelligence for a fusion game.
 *                     Your task is to fuse two items into a reasonable output with a corresponding emoji for display.
 *                     Think of minecraft crafting recipes.
 *                     The goal is to find the "word of the day" by combining base items Today's word is "${wordOfTheDay}".
 *                     Rules:
 *                     - Be creative but reasonable; avoid nonsensical combinations.
 *                     - Always put a majuscule at the beginning of the name.
 *                     - Always use a one-character emoji.
 *                     Example outputs:
 *                     - Input: water + earth -> Output: {"name": "Mud", "icon": "🌱"}
 *                     - Input: fire + stone -> Output: {"name": "Lava", "icon": "🌋"}
 *                     JSON schema: ${jsonSchema}.
 */

/*
Design a fusion game where players combine two logical and intuitive words to create a third word. The goal is for players to deduce a creative but logical word of the day: `${wordOfTheDay}`.

### Guidelines:
1. **Fusion Logic:**
   - The combinations must be meaningful and intuitive.
   - Avoid redundant chains (e.g., "Timber" + "Timber" = "Table").
   - Ensure diverse and creative word associations, making the final word moderately challenging but logical to derive.

2. **Examples:**
   - "Fire" + "Water" = "Steam" 💨
   - "Earth" + "Fire" = "Lava" 🌋
   - "Wheat" + "Mill" = "Flour" 🌾
   - "Library" + "Computer" = "Internet" 🌐

3. **Rules:**
   - Combine two distinct base words for every fusion.
   - Include one emoji that best represents the resulting word.
   - Always capitalize the first letter of the resulting word.
   - Avoid nonsensical combinations (e.g., "Oyster" + "Plant" = "Pasta").
   - The final word should require at least **two unique fusion steps** and should not directly match the input words.

4. **Output Format:**
   Return the result as a JSON object (${jsonSchema}):
   for example : {"name": "Mud", "icon": "🌱"}

 */