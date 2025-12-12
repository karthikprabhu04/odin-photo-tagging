import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/WaldoGame.css"
import useTimer from "../hooks/userTimer";
import NamePopup from "./NamePopup"

export default function WaldoGame() {
  const imgRef = useRef(null);

  const [targetBox, setTargetBox] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const characters = ["Waldo", "Wenda", "Wizard", "Odlaw"];
  const [foundMarkers, setFoundMarkers] = useState([]);

  // Integrate Timer
  const { formattedTime, stop } = useTimer();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (foundMarkers.length === 4) {
      stop();
      setShowPopup(true);
    }
  }, [foundMarkers]);


  // Hide target box when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        targetBox.visible &&
        !e.target.closest(".target-box") &&
        !e.target.closest(".game-img")
      ) {
        setTargetBox({ visible: false, x: 0, y: 0 });
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [targetBox.visible]);

  function handleImageClick(e) {
    const rect = imgRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const percentX  = (clickX / rect.width) * 100;
    const percentY = (clickY / rect.height) * 100;

    setTargetBox({
      visible: true,
      x: percentX,
      y: percentY,
    });
  }

  console.log("Target box state:", targetBox);

  // Connect to Backend
  async function handleCharacterSelect(selectedChar) {
    const response = await fetch("http://localhost:3000/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character: selectedChar,
        x: targetBox.x,   // percent value
        y: targetBox.y,
      }),
    });

    const result = await response.json();

    if (result.correct) {
      alert(`${selectedChar} found!`);
       setFoundMarkers([
        ...foundMarkers,
        { x: targetBox.x, y: targetBox.y, character: selectedChar },
      ]);
    } else {
      alert("Not correct. Try again!");
    }

    setTargetBox({ visible: false, x: 0, y: 0 });
  }


  return (
    <div className="game-container">
      <div className="timer">Time: {formattedTime}s</div>
      <div className="image-wrapper" onClick={handleImageClick}>
        <img
          ref={imgRef}
          src="/waldo.jpg" // replace with your own image
          alt="Where's Waldo"
          className="game-img"
        />

        {targetBox.visible && (
          <div
            className="target-box"
            style={{
              top: targetBox.y + "%",
              left: targetBox.x + "%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <select
              className="dropdown"
              onChange={(e) => handleCharacterSelect(e.target.value)
              }
            >
              <option>Select Character</option>
              {characters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {foundMarkers.map((m, i) => (
          <div
            key={i}
            className="marker"
            style={{ top: m.y + "%", left: m.x + "%" }}
          >
            🔵
          </div>
        ))}
      </div>
      {showPopup && <NamePopup time={formattedTime} />}
      <Link to="/leaderboard">View Leaderboard</Link>
    </div>
  );
}
