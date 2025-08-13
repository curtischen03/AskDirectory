import { GoogleGenAI } from "@google/genai";
import env from "dotenv";
import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

env.config();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function analyze_pdf(pdf_path, context, task, output_constraint) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = __dirname + pdf_path;

  try {
    // Read the local PDF file as a Buffer (using promises)
    const pdfResp = await fs.readFile(filePath);

    const contents = [
      {
        text: context + task + output_constraint,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfResp.toString("base64"),
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    return response.text;
  } catch (error) {
    console.error("Error during PDF analysis:", error);
  }
}

async function retrieveDirectoryContents(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    const all_files = files.join(" ");
    return all_files;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

async function analyze_text(context, task, output_constraint) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Context:${context}, Task:${task}, Output Constraint:${output_constraint}`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
}

async function complete_pdf_analysis(question, root) {
  //root is something like ./pdfs
  const directory_contents = await retrieveDirectoryContents(root);
  const directory_locating = await analyze_text(
    "Given the question below along with all the files in this directory, choose which of the files will most likely have the answer,",
    `Directory Contents: ${directory_contents}, Question: ${question}`,
    "Answer with the file name only (one word response)"
  );
  const clean_file_name = directory_locating.trim().split("\n")[0];
  const pdf_analysis = await analyze_pdf(
    `/pdfs/${clean_file_name}`,
    "You are answering a question based on the pdf that is provided to you. If the information is not present in the pdf, say there is no answer in the pdf.",
    `Question:${question}`,
    "Answer in only text, no other formatting"
  );
  return pdf_analysis;
}

// const question = "Where has curtis worked at?";
// const questionOne = "What is curtis' undergrad UCLA GPA?";
// const questionTwo = "What is curtis' GRE score?";
// const response = await complete_pdf_analysis(questionTwo, "./pdfs");
// console.log(response);

export default complete_pdf_analysis;
