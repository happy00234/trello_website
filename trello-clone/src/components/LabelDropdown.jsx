import { useState, useEffect, useRef } from "react"; // 👈 ADD

const LabelDropdown = ({
  card,
  updateCard,
  setLocalCard,
  closeDropdown,
}) => {
  const labels = [
    { name: "High", color: "bg-red-500" },
    { name: "Medium", color: "bg-yellow-500" },
    { name: "Low", color: "bg-green-500" },
    { name: "Info", color: "bg-blue-500" },
    { name: "None", color: null },
  ];

  const [tempLabel, setTempLabel] = useState(card.label);

  // 🔥 ADD THIS
  const dropdownRef = useRef(null);

  const handleSelect = (color) => {
    setTempLabel(color);
    setLocalCard({ ...card, label: color });
  };

  const handleClose = () => {
    if (tempLabel !== card.label) {
      updateCard(card.id, { label: tempLabel });
    }
    closeDropdown();
  };

  // 🔥 ADD THIS
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tempLabel, card.label]);

  return (
    <div
      ref={dropdownRef} // 👈 ADD THIS
      className="absolute top-14 left-0 bg-[#334155] p-3 rounded w-48 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between mb-2">
        <span className="text-xs">Labels</span>
        <button onClick={handleClose}>✕</button>
      </div>

      {labels.map((item) => {
        const isSelected = tempLabel === item.color;

        return (
          <div
            key={item.name}
            onClick={() => handleSelect(item.color)}
            className={`flex justify-between p-2 rounded cursor-pointer ${
              isSelected ? "bg-[#475569]" : "hover:bg-[#475569]"
            }`}
          >
            <div className="flex gap-2 items-center">
              <div
                className={`w-4 h-4 rounded ${
                  item.color || "bg-gray-500"
                }`}
              ></div>
              {item.name}
            </div>

            {isSelected && "✔"}
          </div>
        );
      })}
    </div>
  );
};

export default LabelDropdown;