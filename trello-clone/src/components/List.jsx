import { useState } from "react";
import Card from "./Card";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDroppable } from "@dnd-kit/core";

const List = ({ list, addCard, updateCard, updateList, deleteList, setSelectedCard}) => {
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleAdd = () => {
    if (!title.trim()) return;
    addCard(list.id, title);
    setTitle("");
    setShowInput(false);
  };

  const handleUpdateList = () => {
    if (!newTitle.trim()) return;
    updateList(list.id, newTitle);
    setEditingTitle(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-[#1e293b] shadow-lg border border-white/10 text-white w-64 min-w-[256px] flex-shrink-0 p-3 rounded-xl h-[320px] flex flex-col relative"
    >
      {/* 🔹 HEADER */}
      <div className="flex justify-between items-center mb-3">
        {editingTitle ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleUpdateList}
            className="bg-[#334155] p-1 rounded text-sm w-full"
            autoFocus
          />
        ) : (
          <h2 className="font-semibold text-sm text-gray-200">{list.title}</h2>
        )}

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-2 text-gray-400 hover:text-white"
          >
            ⋯
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-[#334155] rounded shadow-lg text-sm w-28 z-10">
              <button
                onClick={() => {
                  setEditingTitle(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteList(list.id)}
                className="block w-full text-left px-3 py-2 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 CARDS */}
      <SortableContext
        items={list.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
          {list.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              updateCard={updateCard}
              onClick={(card) => setSelectedCard(card)}  // 🔥 ADD THIS
            />
          ))}
        </div>
      </SortableContext>

      {/* 🔹 ADD CARD */}
      {showInput ? (
        <div className="mt-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title"
            className="w-full p-2 rounded bg-[#334155] text-white outline-none"
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAdd}
              className="bg-blue-500 px-3 py-1 rounded text-sm"
            >
              Add
            </button>

            <button
              onClick={() => setShowInput(false)}
              className="text-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="mt-2 text-sm text-gray-300 hover:text-white"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;
