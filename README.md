# AskDirectory

**AskDirectory** is an intelligent file-querying web application that allows users to ask natural language questions about the contents of files within a directory — and get precise answers instantly. Powered by Google’s Gemini 2.5 Flash API, AskDirectory is an incredibly useful tool for students, researchers, professionals, and anyone who needs to extract information from documents without manually reading through them. It can easily be integrated into a portfolio website to answer questions about the user and their experience. It can also give high level answers after being trained on company handbooks, policies, and training docs.

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/gY3hlbRXSh8/0.jpg)](https://www.youtube.com/watch?v=gY3hlbRXSh8)

### 🚀 What It Does

AskDirectory enables users to:

- Query an entire directory of files using plain English.
- Automatically identify the most relevant document in the directory.
- Analyze that document with AI and return a direct, contextual answer.
- Save time by avoiding the need to manually search or scan through files.

Whether you're trying to quickly retrieve:

- **A student’s GPA from a resume PDF**,
- **Work history details from multiple job applications**, or
- **Key figures and statistics buried in long reports**,

AskDirectory provides fast and accurate answers in seconds.

---

### 🛠 Tech Stack

- **Frontend**: React.js with Bootstrap Styling
- **Backend**: Node.js with Express
- **AI Integration**: Google Gemini 2.0 Flash API

---

### 📂 File Type Support

Currently, AskDirectory supports **PDF files only**, but future updates will expand compatibility to include DOCX, TXT, and more.

---

### ⚙️ Getting Started

#### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

#### 🧠 Backend

```bash
cd backend
npm install
node index.js
```

The server runs on `http://localhost:3000` by default, and the frontend connects seamlessly to the backend to handle your queries. Place any files you want analyzed into /backend/pdfs and make their names descriptive so Gemini will get a good idea of what the document is about.

File name examples:

- Curtis_Chen_resume.pdf
- Curtis_Chen_UCLA_transcript.pdf
  <br>

Query examples:

- What is Curtis' GPA at UCLA?
- List all the CS classes that Curtis took at UCLA along with their names.
- Describe Curtis' work experience at UCLA.

---

### 🌟 Future Plans

- Support for additional file types (DOCX, TXT, HTML, etc.)
- User authentication and query history

---

### 🤖 Powered by Google AI

AskDirectory leverages the powerful **Gemini 2.0 Flash** model to deliver high-speed, context-aware answers — making it a fast and intelligent directory query tool.

---
