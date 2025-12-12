import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const loadScores = async () => {
      const res = await fetch("http://localhost:3000/api/highscores");
      const data = await res.json();
      setScores(data);
    };

    loadScores();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>
            {s.name} — {s.time}s
          </li>
        ))}
      </ul>
      <Link to="/">Back to Waldo Map</Link>
    </div>
  );
}
