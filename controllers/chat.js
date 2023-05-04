require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const key = process.env.CHAT_KEY;

const config = new Configuration({
  apiKey:key,
});

const openai = new OpenAIApi(config);

async function chat(req, res) {
    const { prompt } = req.body;
    if ((prompt === "hello")||(prompt === "hi")) {
      res.send("Hello there! How can I assist you today?");}
     else{ 
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });
    res.send(completion.data.choices[0].text);}
  };

module.exports = {
    chat
}