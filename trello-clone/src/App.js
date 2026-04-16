import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");

  // 🔥 UPDATED STRUCTURE
  const [boards, setBoards] = useState([
    {
      id: "board-1",
      title: "My Trello Board",
      lists: [
        {
          id: "list-1",
          title: "Todo",
          cards: [
            {
              id: "card-1",
              title: "Build Project",
              members: [],
              description: "",
              label: null,
              dueDate: null,
              checklist: [],
            },
          ],
        },
      ],
    },
  ]);

  const [activeBoardId, setActiveBoardId] = useState("board-1");

  const addBoard = (title) => {
    if (!title.trim()) return;

    const newBoard = {
      id: "board-" + Date.now(),
      title,
      lists: [], // 🔥 IMPORTANT
    };

    setBoards([...boards, newBoard]);
  };
  const [filters, setFilters] = useState({
  label: null,
  member: null,
  due: null, // "overdue" | "upcoming"
});

  return (
    <div className="h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-gray-900 p-4">
      <Header
        onSearch={setSearch}
        boards={boards}
        setBoards={setBoards}
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
        addBoard={addBoard} 
        filters={filters}
        setFilters={setFilters}
      />

      <Board
        search={search}
        boards={boards}
        setBoards={setBoards}
        activeBoardId={activeBoardId}
        filters={filters}
      />
    </div>
  );
}

export default App;
