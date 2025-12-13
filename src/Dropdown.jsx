import { useState } from "react";

export function MoveInput({ index, allMoves, activeIndex, setActiveIndex }) {
  const [query, setQuery] = useState("");

  const filtered = 
    activeIndex === index && query.length > 0
      ? allMoves
          .filter(m => m.startsWith(query.toLowerCase()))
          .slice(0, 3)
      : [];

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    setQuery(val);
    setActiveIndex(index); // open THIS dropdown and close others
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={handleChange}
        onFocus={() => setActiveIndex(index)}
        placeholder="Enter move"
        className="input-move"
      />

      {filtered.length > 0 && (
        <div className="dropdown">
          {filtered.map(move => (
            <div
              key={move}
              className="dropdown-item"
              onClick={() => {
                setQuery(move);
                setActiveIndex(null); // close all dropdowns
              }}
            >
              {move}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
