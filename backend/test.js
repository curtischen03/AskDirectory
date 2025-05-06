import { GoogleGenAI } from "@google/genai";
import env from "dotenv";
import fs from "fs/promises";
import path from "path";
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
      model: "gemini-2.0-flash",
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

const question = "Where has curtis worked at?";

const directory_contents = await retrieveDirectoryContents("./pdfs");
const directory_locating = await analyze_text(
  "Given the question below along with all the files in this directory, choose which of the files will most likely have the answer,",
  `Directory Contents: ${directory_contents}, Question: ${question}`,
  "Answer with the file name only (one word response)"
);

const pdf_analysis = await analyze_pdf(
  "/pdfs/Curtis_Chen_2025_Resume_1.pdf",
  "You are answering a question based on the pdf that is provided to you. If the information is not present in the pdf, say there is no answer in the pdf.",
  `Question:${question}`,
  "Answer in only text, no other formatting"
);
console.log("Question:", question);
console.log("Directory Contents:", directory_contents);
console.log("Direcotry Location for Question:", directory_locating);
console.log("PDF Analysis:", pdf_analysis);
