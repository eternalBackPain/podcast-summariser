const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const audio = req.body.file;
  const resp = await openai.createTranscription(audio, "whisper-1");
  res.status(200).json({ result: resp.data.choices[0].text });
}
