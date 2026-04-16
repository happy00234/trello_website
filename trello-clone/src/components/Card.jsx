import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  // checklist progress
  const total = card.checklist?.length || 0;
  const completed =
    card.checklist?.filter((item) => item.done).length || 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(card)}
      className="bg-[#334155] hover:bg-[#475569] p-2 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
    >
      {card.label && (
        <div className={`w-10 h-1 mb-2 rounded ${card.label}`}></div>
      )}

      
      <div className="text-sm text-white font-medium">
        {card.title}
      </div>

      
      <div className="flex items-center justify-between mt-2 text-xs text-gray-300">

        
        <div className="flex items-center gap-2">

          
          {card.description && <span>≡</span>}

          
          {total > 0 && (
            <span>
              ☑ {completed}/{total}
            </span>
          )}
        </div>

        
        <div className="flex items-center gap-2">

          
          {card.members?.length > 0 && (
            <div className="flex">
              {card.members.map((m, index) => (
                <div
                  key={m.id}
                  className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] border border-[#1e293b]"
                  style={{ marginLeft: index === 0 ? 0 : -6 }}
                >
                  {m.avatar}
                </div>
              ))}
            </div>
          )}

          
          {card.dueDate && (
            <span
              className={
                new Date(card.dueDate) < new Date()
                  ? "text-red-400"
                  : ""
              }
            >
              📅 {card.dueDate.split("T")[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card; 