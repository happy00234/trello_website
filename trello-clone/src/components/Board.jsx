import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import AddList from "./AddList";
import CardModal from "./CardModal";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

const Board = ({ search, boards, setBoards, activeBoardId, filters }) => {
  const BASE_URL = "https://trello-backend-rx4s.onrender.com";

  const activeBoard = boards.find((b) => b.id === activeBoardId);
  const lists = activeBoard?.lists || [];

  const [activeCard, setActiveCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // 🔥 UPDATED
  const updateLists = async (newLists) => {
    try {
      await axios.put(`${BASE_URL}/boards/${activeBoardId}`, {
        lists: newLists,
      });

      const updatedBoards = boards.map((board) =>
        board.id === activeBoardId ? { ...board, lists: newLists } : board,
      );

      setBoards(updatedBoards);
    } catch (err) {
      console.error("Error updating lists", err);
    }
  };
  useEffect(() => {
    if (!activeBoardId) return; // 🔥 IMPORTANT FIX
    fetchLists();
  }, [activeBoardId]);

  const fetchLists = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/lists/${activeBoardId}`);

      const listsFromDB = res.data;

      const listsWithCards = await Promise.all(
        listsFromDB.map(async (list) => {
          try {
            const cardRes = await axios.get(`${BASE_URL}/cards/${list.id}`);

            return {
              ...list,
              cards: (cardRes.data || []).map((card) => ({
                ...card,
                dueDate: card.due_date, // ✅ already correct
                label: card.label, // 🔥 THIS WAS MISSING
              })),
            };
          } catch (err) {
            console.error("Error fetching cards for list", list.id, err);
            return {
              ...list,
              cards: [],
            };
          }
        }),
      );

      // 👇 state update (same as before)
      const updatedBoards = boards.map((board) =>
        board.id === activeBoardId
          ? { ...board, lists: listsWithCards }
          : board,
      );

      setBoards(updatedBoards);
    } catch (err) {
      console.error("Error fetching lists", err);
    }
  };

  const findCard = (id) => {
    for (let i = 0; i < lists.length; i++) {
      const index = lists[i].cards.findIndex((c) => c.id === id);
      if (index !== -1) {
        return { listIndex: i, cardIndex: index };
      }
    }
    return null;
  };

  const addCard = (listId, newCard) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [
            ...list.cards,
            {
              id: newCard.id,
              title: newCard.title,
              members: [],
              description: "",
              label: null,
              dueDate: null,
              checklist: [],
            },
          ],
        };
      }
      return list;
    });

    updateLists(newLists);
  };

  const updateCard = async (cardId, updatedFields) => {
    try {
      // 🔥 1. BACKEND FIRST (safe)
      const res = await axios.put(`${BASE_URL}/cards/${cardId}`, updatedFields);

      const updatedCardFromDB = res.data;

      // 🔥 2. UI UPDATE using DB response
      const newLists = lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                ...updatedCardFromDB,
                dueDate: updatedCardFromDB.due_date, // 🔥 mapping fix
              }
            : card,
        ),
      }));

      const updatedBoards = boards.map((board) =>
        board.id === activeBoardId ? { ...board, lists: newLists } : board,
      );

      setBoards(updatedBoards);
    } catch (err) {
      console.error("Error updating card", err);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await axios.delete(`${BASE_URL}/cards/${cardId}`);

      const newLists = lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card.id !== cardId),
      }));

      updateLists(newLists);
      setSelectedCard(null);
    } catch (err) {
      console.error("Error deleting card", err);
    }
  };

  const toggleMember = (cardId, member) => {
    const newLists = lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) => {
        if (card.id === cardId) {
          const exists = card.members?.find((m) => m.id === member.id);

          return {
            ...card,
            members: exists
              ? card.members.filter((m) => m.id !== member.id)
              : [...(card.members || []), member],
          };
        }
        return card;
      }),
    }));

    updateLists(newLists);

    const updatedCard = newLists
      .flatMap((l) => l.cards)
      .find((c) => c.id === cardId);

    setSelectedCard(updatedCard);
  };

  const addList = async (title) => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(`${BASE_URL}/lists`, {
        title,
        board_id: activeBoardId,
      });

      const newList = {
        ...res.data,
        cards: [],
      };

      updateLists([...lists, newList]); // ✅ same flow
    } catch (err) {
      console.error("Error creating list", err);
    }
  };
  const updateList = async (listId, newTitle) => {
    try {
      await axios.put(`${BASE_URL}/lists/${listId}`, {
        title: newTitle,
      });

      const newLists = lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list,
      );

      updateLists(newLists);
    } catch (err) {
      console.error("Error updating list", err);
    }
  };

  const deleteList = async (listId) => {
    try {
      await axios.delete(`${BASE_URL}/lists/${listId}`);

      const newLists = lists.filter((list) => list.id !== listId);
      updateLists(newLists);
    } catch (err) {
      console.error("Error deleting list", err);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    lists.forEach((list) => {
      list.cards.forEach((card) => {
        if (card.id === active.id) setActiveCard(card);
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const source = findCard(active.id);
    if (!source) return;

    let destination = null;

    const listIndex = lists.findIndex((l) => l.id === over.id);
    if (listIndex !== -1) {
      destination = {
        listIndex,
        cardIndex: lists[listIndex].cards.length,
      };
    } else {
      destination = findCard(over.id);
    }

    if (!destination) return;

    const newLists = [...lists];

    if (source.listIndex === destination.listIndex) {
      newLists[source.listIndex].cards = arrayMove(
        newLists[source.listIndex].cards,
        source.cardIndex,
        destination.cardIndex,
      );
    } else {
      const movedCard = newLists[source.listIndex].cards[source.cardIndex];

      newLists[source.listIndex].cards.splice(source.cardIndex, 1);
      newLists[destination.listIndex].cards.splice(
        destination.cardIndex,
        0,
        movedCard,
      );
    }

    updateLists(newLists);
  };

  const addChecklistItem = (cardId, text) => {
    const newLists = lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              checklist: [
                ...(card.checklist || []),
                { id: Date.now(), text, done: false },
              ],
            }
          : card,
      ),
    }));

    updateLists(newLists);

    const updatedCard = newLists
      .flatMap((l) => l.cards)
      .find((c) => c.id === cardId);

    setSelectedCard(updatedCard);
  };

  const toggleChecklist = (cardId, itemId) => {
    const newLists = lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              checklist: card.checklist.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item,
              ),
            }
          : card,
      ),
    }));

    updateLists(newLists);

    const updatedCard = newLists
      .flatMap((l) => l.cards)
      .find((c) => c.id === cardId);

    setSelectedCard(updatedCard);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[calc(100vh-100px)] overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 px-4 py-4 min-w-max">
          {lists.map((list) => {
            const filteredCards = list.cards.filter((card) => {
              const matchesSearch = card.title
                .toLowerCase()
                .includes(search.toLowerCase());

              const matchesLabel =
                !filters.label || card.label === filters.label;

              const matchesMember =
                !filters.member ||
                card.members?.some((m) => m.avatar === filters.member);

              const matchesDate =
                !filters.due ||
                (filters.due === "overdue"
                  ? card.dueDate && new Date(card.dueDate) < new Date()
                  : card.dueDate && new Date(card.dueDate) >= new Date());

              return (
                matchesSearch && matchesLabel && matchesMember && matchesDate
              );
            });

            return (
              <List
                key={list.id}
                list={{ ...list, cards: filteredCards }}
                addCard={addCard}
                updateCard={updateCard}
                updateList={updateList}
                deleteList={deleteList}
                setSelectedCard={setSelectedCard}
              />
            );
          })}

          <AddList addList={addList} />
        </div>
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          closeModal={() => setSelectedCard(null)}
          updateCard={updateCard}
          deleteCard={deleteCard}
          addChecklistItem={addChecklistItem}
          toggleChecklist={toggleChecklist}
          toggleMember={toggleMember}
        />
      )}

      <DragOverlay>
        {activeCard && (
          <div className="bg-[#334155] p-2 rounded-md shadow-2xl rotate-3 scale-110 border border-white/20">
            {activeCard.title}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
