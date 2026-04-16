import { useState } from "react";

const ChecklistDropdown = ({
  card,
  addChecklistItem,
  toggleChecklist,
  closeDropdown,
}) => {
  const [newItem, setNewItem] = useState("");

  return (
    <div
      className="absolute top-14 left-36 bg-[#334155] p-3 rounded w-64 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="flex justify-between mb-2">
        <span className="text-xs">Checklist</span>
        <button onClick={closeDropdown}>✕</button>
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mb-2">
        <input
          placeholder="Add item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 p-2 bg-[#1e293b] rounded text-sm outline-none"
        />
        <button
          onClick={() => {
            if (!newItem.trim()) return;

            addChecklistItem(card.id, newItem); // ✅ ONLY THIS
            setNewItem("");
          }}
          className="bg-blue-500 px-2 rounded text-sm hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
        {(card.checklist || []).map((item) => (
          <div
            key={item.id}
            className="flex gap-2 items-center text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={item.is_done}
              onChange={() => toggleChecklist(card.id, item.id)}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            />
            <span
              className={
                item.is_done ? "line-through text-gray-400" : ""
              }
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      {card.checklist?.length > 0 && (
        <div className="mt-2 text-xs text-gray-300">
          {Math.round(
            (card.checklist.filter((i) => i.is_done).length /
              card.checklist.length) *
              100
          )}
          % completed
        </div>
      )}
    </div>
  );
};

export default ChecklistDropdown;