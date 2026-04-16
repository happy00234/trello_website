const DateDropdown = ({
  card,
  tempDate,
  setTempDate,
  updateCard,
  setLocalCard,
  closeDropdown,
}) => {
  return (
    <div
      className="absolute top-14 left-72 bg-[#334155] p-3 rounded w-56 z-50"
      onClick={(e) => e.stopPropagation()} 
    >
      
      <div className="flex justify-between mb-2">
        <span className="text-xs">Dates</span>
        <button onClick={closeDropdown}>✕</button>
      </div>

      
      <input
        type="date"
        value={tempDate}
        onChange={(e) => setTempDate(e.target.value)}
        className="w-full p-2 rounded bg-[#1e293b] outline-none"
      />

      
      <button
        onClick={() => {
          updateCard(card.id, { dueDate: tempDate });

          
          setLocalCard({ ...card, dueDate: tempDate });

          closeDropdown();
        }}
        className="mt-2 bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default DateDropdown;