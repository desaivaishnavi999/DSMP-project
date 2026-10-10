import React from "react";
import type { LucideIcon } from "lucide-react";

interface StudentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      className="bg-white min-h-[175px] p-[25px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] border border-[#e1eaf8] cursor-pointer transition-all duration-250 hover:-translate-y-[5px] hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] hover:border-[#93c5fd] group flex flex-col items-start"
      onClick={onClick}
    >
      <div className="w-[58px] h-[58px] rounded-[14px] bg-primary-light group-hover:bg-[#dbeafe] text-primary flex items-center justify-center mb-[15px] transition-colors shrink-0">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-[19px] font-bold text-secondary m-0 mb-[8px]">{title}</h3>
      <p className="text-[#64748b] text-[14px] leading-[1.5] m-0">{description}</p>
    </div>
  );
};
