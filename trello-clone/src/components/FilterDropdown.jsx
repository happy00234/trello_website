const FilterDropdown = ({
  filters,
  setFilters,
  filterRef,       
}) => {
  return (
    <div
      ref={filterRef}
      className="absolute right-0 top-full mt-3 bg-[#1e293b] p-4 rounded-xl w-64 z-50 shadow-xl border border-white/10 space-y-4"
      onClick={(e) => e.stopPropagation()} 
    >
      
      <div>
        <p className="text-xs text-gray-400 mb-2">Labels</p>
        <div className="flex gap-2">
          {[
            "bg-red-500",
            "bg-green-500",
            "bg-blue-500",
            "bg-yellow-500",
          ].map((c) => (
            <div
              key={c}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  label: prev.label === c ? null : c,
                }))
              }
              className={`w-6 h-6 rounded cursor-pointer border-2 ${
                filters.label === c
                  ? "border-white scale-110"
                  : "border-transparent"
              } ${c}`}
            ></div>
          ))}
        </div>
      </div>

      
      <div>
        <p className="text-xs text-gray-400 mb-2">Members</p>
        <div className="flex gap-2">
          {["H", "M", "P"].map((m) => (
            <div
              key={m}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  member: prev.member === m ? null : m,
                }))
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm ${
                filters.member === m
                  ? "bg-blue-500"
                  : "bg-[#334155] hover:bg-[#475569]"
              }`}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      
      <div>
        <p className="text-xs text-gray-400 mb-2">Due Date</p>
        <div className="flex gap-2">
          {[
            { key: "overdue", label: "Overdue" },
            { key: "upcoming", label: "Upcoming" },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  due: prev.due === d.key ? null : d.key,
                }))
              }
              className={`px-3 py-1 rounded text-xs ${
                filters.due === d.key
                  ? "bg-red-500 text-white"
                  : "bg-[#334155] hover:bg-[#475569]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      
      <button
        onClick={() =>
          setFilters({ label: null, member: null, due: null })
        }
        className="w-full text-center text-sm text-red-400 hover:text-red-300 border-t border-white/10 pt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterDropdown;