import { useState } from "react";

export default function NamePopup({ time }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitScore = async () => {
    await fetch("http://localhost:3000/api/highscores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, time }),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="popup">
        <h2>Score submitted!</h2>
      </div>
    );
  }

  return (
    <div className="popup">
      <h2>You found all characters!</h2>
      <p>Your time: {time}s</p>

      <label>
        Enter your name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button onClick={submitScore}>Submit</button>
    </div>
  );
}
