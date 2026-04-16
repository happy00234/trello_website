import { useState, useEffect } from "react";
import axios from "axios";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");

  
  const [boards, setBoards] = useState([]);

  const [activeBoardId, setActiveBoardId] = useState(null);

  const [filters, setFilters] = useState({
    label: null,
    member: null,
    due: null,
  });

  
  const BASE_URL = "https://trello-backend-rx4s.onrender.com";

  
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/boards`);
      setBoards(res.data);

      
      if (res.data.length > 0) {
        setActiveBoardId(res.data[0].id);
      }
    } catch (err) {
      console.error("Error fetching boards", err);
    }
  };

  
  const addBoard = async (title) => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(`${BASE_URL}/boards`, {
        title,
      });

      setBoards([res.data, ...boards]);
      setActiveBoardId(res.data.id);
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

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