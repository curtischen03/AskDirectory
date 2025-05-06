import Express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
import complete_pdf_analysis from "./test.js";

env.config();
const app = Express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.post("/submit", async (req, res) => {
  const prompt = req.body.prompt;
  const root = "./pdfs";
  const answer = await complete_pdf_analysis(prompt, root);
  console.log("Prompt: ", prompt);
  console.log("Answer: ", answer);
  res.json({ answer: answer });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
