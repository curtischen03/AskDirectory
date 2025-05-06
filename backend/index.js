import Express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

env.config();
const app = Express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function textGeneration(prompt) {
  console.log("prompt", prompt);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return response.text;
}

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.post("/submit", async (req, res) => {
  const prompt = req.body.prompt;
  const answer = await textGeneration(prompt);
  console.log("Prompt: ", prompt);
  console.log("Answer: ", answer);
  res.json({ answer: answer });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
