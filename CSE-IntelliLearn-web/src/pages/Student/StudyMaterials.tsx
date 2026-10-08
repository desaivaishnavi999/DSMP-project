import React, { useState } from "react";
import { BookOpen, FileText, Download, Eye, Search, Layers } from "lucide-react";
import type { StudyMaterial } from "@/types";

const mockResources: StudyMaterial[] = [
  { id: "1", title: "Data Structures & Algorithms - Unit 1 (Trees & Graphs)", type: "Notes", semester: "Semester 3", subject: "DSA", unit: "Unit 1", author: "Prof. Sharma", date: "2026-09-20" },
  { id: "2", title: "Database Management Systems 2025 Mid-Sem Exam", type: "PYQ", semester: "Semester 4", subject: "DBMS", unit: "All Units", author: "CSE Dept", date: "2026-08-15" },
  { id: "3", title: "Operating Systems - Process Synchronization Notes", type: "Notes", semester: "Semester 4", subject: "OS", unit: "Unit 2", author: "Dr. Verma", date: "2026-10-01" },
  { id: "4", title: "Computer Networks - TCP/IP Protocol Suite", type: "Notes", semester: "Semester 5", subject: "CN", unit: "Unit 3", author: "Prof. Gupta", date: "2026-10-04" },
  { id: "5", title: "Compiler Design End-Sem Question Paper 2024", type: "PYQ", semester: "Semester 6", subject: "CD", unit: "All Units", author: "Exam Cell", date: "2026-01-10" },
];

export default function StudyMaterials() {
  const [selectedSem, setSelectedSem] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const semesters = ["All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

  const filteredResources = mockResources.filter((res) => {
    const matchesSem = selectedSem === "All" || res.semester === selectedSem;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <Layers className="w-8 h-8 text-primary" />
            Study Materials Hub
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Access course materials, lecture notes, and previous year question papers
          </p>
        </div>

        <div className="bg-white p-6 rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-8 flex flex-col sm:flex-row gap-4 border border-[#e1eaf8]">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search materials by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="sm:w-64">
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Semesters</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] hover:border-primary-light flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[12px] font-bold px-3 py-1 rounded-md ${
                  res.type === "Notes" ? "bg-primary-light text-primary" :
                  res.type === "PYQ" ? "bg-[#fef3c7] text-[#92400e]" :
                  "bg-[#e0e7ff] text-[#4f46e5]"
                }`}>
                  {res.type}
                </span>
                <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-[#f1f5f9] text-[#64748b]">
                  {res.semester}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4 flex-1">
                <div className="mt-1">
                  {res.type === "PYQ" ? (
                    <FileText className="w-5 h-5 text-[#f59e0b]" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-secondary mb-1 m-0 line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-[13px] font-semibold text-primary m-0">{res.subject} • {res.unit}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9] mt-auto">
                <div className="text-[12px] text-[#64748b]">
                  <p className="m-0">By: <span className="font-semibold text-secondary">{res.author}</span></p>
                  <p className="m-0">{res.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Opening preview')} className="p-2.5 rounded-[10px] bg-primary-light hover:bg-[#dbeafe] text-primary transition-colors cursor-pointer border-none" title="View Document">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => alert('Downloading')} className="p-2.5 rounded-[10px] bg-primary hover:bg-blue-700 text-white transition-colors cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">No materials found</h3>
            <p className="text-[#64748b] m-0">Try adjusting your search criteria or semester filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
