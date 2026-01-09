import { useState } from "react";

export function MoveInput({ //props
  index,
  allMoves,
  activeIndex,
  setActiveIndex,
  onSelect,
  locked   
}) {
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
    setActiveIndex(index);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={handleChange}
        onFocus={() => !locked && setActiveIndex(index)}
        placeholder="Enter move"
        disabled={locked}
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
                setActiveIndex(null);
                onSelect?.(move); //call back
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
