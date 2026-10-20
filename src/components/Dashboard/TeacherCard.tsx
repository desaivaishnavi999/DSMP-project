import React from "react";
import type { LucideIcon } from "lucide-react";

interface TeacherCardProps {
  title: string;
  description?: string;
  buttonText?: string;
  icon?: LucideIcon;
  onClick: () => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  title,
  description,
  buttonText = "Open",
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="bg-white p-[25px] rounded-[15px] text-center shadow-[0_4px_15px_rgba(30,64,175,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] border border-[#e1eaf8]">
      <h3 className="text-secondary text-[18.72px] font-bold mb-[10px] mt-0 flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        {title}
      </h3>
      <p className="text-[#64748b] text-[14px] mb-[18px]">{description}</p>
      <button
        className="bg-primary text-white px-[20px] py-[10px] border-none rounded-[8px] font-bold hover:bg-blue-700 transition-colors cursor-pointer"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};
