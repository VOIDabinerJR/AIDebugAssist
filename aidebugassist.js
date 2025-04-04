

var a = `// 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

curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-4o-mini",
    "store": true,
    "messages": [
      {"role": "user", "content": "write a haiku about ai"}
    ]
  }'
  
  import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));`


import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

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

        // Verifica se há resposta gerada
        if (data.candidates && data.candidates.length > 0) {
            console.log("Resposta do Gemini:", data.candidates[0].content.parts[0].text);
        } else {
            console.log("Nenhuma resposta gerada.");
        }

    } catch (error) {
        console.error("Erro ao chamar a API:", error);
    }
}

let prompt = `file:///C:/Users/DELL/Documents/GitHub/AIDebugAssist/aidebugassist.js:1
var d a= CALJDDLSDFSD;FSAF AV VAR=
      ^

SyntaxError: Unexpected identifier 'a'
    at compileSourceTextModule (node:internal/modules/esm/utils:337:16)       
    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:164:18)
    at callTranslator (node:internal/modules/esm/loader:429:14)
    at ModuleLoader.moduleProvider (node:internal/modules/esm/loader:435:30)  
    at async ModuleJob._link (node:internal/modules/esm/module_job:106:19)    

Node.js v22.3.0`
// Exemplo de uso
askGemini(`Por favor, agindo com um programador experiente analise e explique esse erro em linguagem comum :${prompt}`); 