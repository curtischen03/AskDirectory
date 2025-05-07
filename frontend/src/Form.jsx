import { useState } from "react";

function Form() {
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
    <div class="container-fluid content">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <form
            id="prompt"
            action="http://localhost:3000/submit"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div class="form-group">
              <label for="name" class="h2 mb-4">
                Document Query
              </label>
              <input
                type="text"
                id="prompt"
                name="prompt"
                required
                class="form-control"
              />
            </div>
            <br></br>
            <button class="btn btn-dark" type="submit">
              Submit
            </button>
          </form>
          <br></br>
          <h2>Query Answer</h2>
          <div
            class="mb-2 post-content lead"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
