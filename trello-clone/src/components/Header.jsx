import { useState, useRef, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const Header = ({
  onSearch,
  boards,
  activeBoardId,
  setActiveBoardId,
  addBoard,
  setBoards,
  filters,
  setFilters,
}) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [newBoard, setNewBoard] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };
  const deleteBoard = () => {
    const updatedBoards = boards.filter((b) => b.id !== activeBoardId);

    setBoards(updatedBoards);

    if (updatedBoards.length > 0) {
      setActiveBoardId(updatedBoards[0].id);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg px-4 py-2 flex items-center justify-between text-white rounded-lg mb-4">
      {/* LEFT */}
      <div className="relative">
        <h1
          onClick={() => setShowDropdown(!showDropdown)}
          className="font-bold text-lg cursor-pointer"
        >
          {boards.find((b) => b.id === activeBoardId)?.title} ▼
        </h1>

        {showDropdown && (
          <div className="absolute mt-2 bg-[#334155] p-2 rounded w-48 z-50">
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => {
                  setActiveBoardId(board.id);
                  setShowDropdown(false);
                }}
                className="p-2 hover:bg-[#475569] cursor-pointer"
              >
                {board.title}
              </div>
            ))}

            {/* CREATE BOARD */}
            <div className="mt-2">
              <input
                placeholder="New board..."
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
                className="w-full p-1 bg-[#1e293b]"
              />

              <button
                onClick={() => {
                  addBoard(newBoard);
                  setNewBoard("");
                }}
                className="bg-blue-500 mt-1 px-2 py-1 text-sm w-full"
              >
                Create Board
              </button>
              <button
                onClick={deleteBoard}
                className="block w-full text-left px-3 py-2 hover:bg-red-500 text-sm"
              >
                Delete Board
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CENTER */}
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search cards..."
        className="px-3 py-1 rounded-md bg-white/10 border border-white/20 outline-none w-80"
      />

      {/* RIGHT */}
      <div className="relative flex items-center gap-3">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Filter
        </button>
        {showFilter && (
          <FilterDropdown
            filters={filters}
            setFilters={setFilters}
            filterRef={filterRef} // 🔥 IMPORTANT
          />
        )}

        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          H
        </div>
      </div>
    </div>
  );
};

export default Header;
