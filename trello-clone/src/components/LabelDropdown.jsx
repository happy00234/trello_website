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

  return (
    <div
      className="absolute top-14 left-0 bg-[#334155] p-3 rounded w-48 z-50"
      onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
    >
      {/* HEADER */}
      <div className="flex justify-between mb-2">
        <span className="text-xs">Labels</span>
        <button onClick={closeDropdown}>✕</button>
      </div>

      {/* LABEL LIST */}
      {labels.map((item) => {
        const isSelected = card.label === item.color;

        return (
          <div
            key={item.name}
            onClick={() => {
              updateCard(card.id, { label: item.color });

              // 🔥 LOCAL UI UPDATE (IMPORTANT)
              setLocalCard({ ...card, label: item.color });
            }}
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