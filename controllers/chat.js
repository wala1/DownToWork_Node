
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

async function chat(req, res) {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
  };

module.exports = {
    chat
}