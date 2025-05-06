import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("prompt");
    const formData = new FormData(form);
    const prompt = formData.get("prompt");
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setAnswer(data.answer);
  }

  return (
    <div>
      <form
        id="prompt"
        action="http://localhost:3000/submit"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label for="name">Prompt</label>
        <input type="text" id="prompt" name="prompt" required />
        <button type="submit">Submit</button>
      </form>
      <h2>Summary:</h2>
      <div dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  );
}

export default App;
