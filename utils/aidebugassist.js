const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config(); 

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function askGemini(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }) 
        }); 

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            // console.log("Resposta do Gemini:", data.candidates[0].content.parts[0].text);
            return data.candidates[0].content.parts[0].text;
        } else {
            console.log("Nenhuma resposta gerada.");
            return "Nenhuma resposta gerada.";
        }

    } catch (error) {
        console.error("Erro ao chamar a API:", error);
        return "Erro ao chamar a API.";
    }
}

async function ask(prompt) {
 
    return askGemini(`em ate 1000 calracteres ${prompt}`);
}
async function ask2(prompt) {
 
    return askGemini(` ${prompt}. por favor não exceda 1000 caracteres`);
}

module.exports = { askGemini, ask, ask2 };
