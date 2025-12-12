import WaldoGame from "./components/WaldoGame";
import { Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WaldoGame />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
