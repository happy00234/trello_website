const MembersDropdown = ({
  card,
  membersList,
  toggleMember,
  setLocalCard,
  closeDropdown,
}) => {
  return (
    <div
      className="absolute top-14 left-60 bg-[#334155] p-3 rounded w-52 z-50"
      onClick={(e) => e.stopPropagation()} 
    >
      
      <div className="flex justify-between mb-2">
        <span className="text-xs">Members</span>
        <button onClick={closeDropdown}>✕</button>
      </div>

      
      {membersList.map((member) => {
        const isSelected = card.members?.some(
          (m) => m.id === member.id
        );

        return (
          <div
            key={member.id}
            onClick={() => {
              toggleMember(card.id, member);

              
              const exists = card.members?.find(
                (m) => m.id === member.id
              );

              const updatedMembers = exists
                ? card.members.filter((m) => m.id !== member.id)
                : [...(card.members || []), member];

              setLocalCard({ ...card, members: updatedMembers });
            }}
            className="flex justify-between p-2 rounded hover:bg-[#475569] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                {member.avatar}
              </div>
              {member.name}
            </div>

            {isSelected && "✔"}
          </div>
        );
      })}
    </div>
  );
};

export default MembersDropdown;