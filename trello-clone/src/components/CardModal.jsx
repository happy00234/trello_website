import { useState, useEffect } from "react";
import ChecklistDropdown from "./ChecklistDropdown";
import LabelDropdown from "./LabelDropdown";
import DateDropdown from "./DateDropdown";
import MembersDropdown from "./MembersDropdown";

const membersList = [
  { id: 1, name: "Happy", avatar: "H" },
  { id: 2, name: "Mehak", avatar: "M" },
  { id: 3, name: "Priyanshi", avatar: "P" },
];

const CardModal = ({
  card,
  closeModal,
  updateCard,
  deleteCard,
  addChecklistItem,
  toggleChecklist,
  toggleMember,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [tempDate, setTempDate] = useState(card.dueDate || "");
  const [localCard, setLocalCard] = useState(card);
  useEffect(() => {
    setLocalCard(card);
    setTempDate(card.dueDate || "");
  }, [card]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#1e293b] p-6 rounded-xl w-[500px] text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button onClick={closeModal} className="absolute top-3 right-3">
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-4">{localCard.title}</h2>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-2 mb-4 relative">
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "labels" ? null : "labels")
            }
            className="bg-[#334155] px-3 py-1 rounded text-sm"
          >
            Labels
          </button>

          <button
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "checklist" ? null : "checklist",
              )
            }
            className="bg-[#334155] px-3 py-1 rounded text-sm"
          >
            Checklist
          </button>

          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "dates" ? null : "dates")
            }
            className="bg-[#334155] px-3 py-1 rounded text-sm"
          >
            Dates
          </button>

          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "members" ? null : "members")
            }
            className="bg-[#334155] px-3 py-1 rounded text-sm"
          >
            Members
          </button>
        </div>

        {/* 🔥 LABEL */}
        {activeDropdown === "labels" && (
          <LabelDropdown
            card={localCard}
            updateCard={updateCard}
            setLocalCard={setLocalCard}
            closeDropdown={() => setActiveDropdown(null)}
          />
        )}

        {/* 🔥 CHECKLIST */}
        {activeDropdown === "checklist" && (
          <ChecklistDropdown
            card={localCard}
            addChecklistItem={addChecklistItem}
            toggleChecklist={toggleChecklist}
            closeDropdown={() => setActiveDropdown(null)}
          />
        )}

        {/* 🔥 DATES */}
        {activeDropdown === "dates" && (
          <DateDropdown
            card={localCard}
            tempDate={tempDate}
            setTempDate={setTempDate}
            updateCard={updateCard}
            setLocalCard={setLocalCard}
            closeDropdown={() => setActiveDropdown(null)}
          />
        )}

        {/* 🔥 MEMBERS */}
        {activeDropdown === "members" && (
          <MembersDropdown
            card={localCard}
            membersList={membersList}
            toggleMember={toggleMember}
            setLocalCard={setLocalCard}
            closeDropdown={() => setActiveDropdown(null)}
          />
        )}

        {/* 🔥 DESCRIPTION */}
        <textarea
          value={localCard.description || ""}
          onChange={(e) =>
            setLocalCard({
              ...localCard,
              description: e.target.value,
            })
          }
          className="w-full p-2 bg-[#334155] rounded mt-4"
        />

        {/* SAVE + DELETE */}
        <div className="flex justify-between mt-2">
          <button
            onClick={() =>
              updateCard(localCard.id, {
                description: localCard.description,
                due_date: localCard.dueDate,
                label: localCard.label,
              })
            }
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Save
          </button>

          <button
            onClick={() => deleteCard(localCard.id)}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
