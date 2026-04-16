import { useState } from "react";

const AddList = ({ addList }) => {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addList(title);
    setTitle("");
    setShowInput(false);
  };

  return (
    <div className="min-w-[256px] flex-shrink-0 mt-1">
      {showInput ? (
        <div className="bg-[#1e293b] p-3 rounded-xl border border-white/10 shadow-lg">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title"
            className="w-full p-2 rounded bg-[#334155] text-white outline-none placeholder-gray-400"
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
            >
              Add List
            </button>

            <button
              onClick={() => setShowInput(false)}
              className="text-gray-300 hover:text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-left bg-white/10 text-white px-3 py-2 rounded-xl hover:bg-white/20 transition-all"
        >
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddList;