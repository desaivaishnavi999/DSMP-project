import React, { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

export default function UploadNotesPage() {
  const user = useAuthStore((s) => s.user);
  const userName = user?.name ?? "Teacher";

  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("Semester 3");
  const [subject, setSubject] = useState("Data Structures");
  const [unit, setUnit] = useState("Unit 1");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      toast.error("Please fill in the title and select a file to upload.");
      return;
    }

    toast.success(`Successfully uploaded "${title}" for ${subject} (${unit})!`);
    setTitle("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <Upload className="w-8 h-8 text-primary" />
            Upload Course Materials
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Publish unit lecture notes, slide decks, and past question papers for students
          </p>
        </div>

        <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-[30px]">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-[14px] font-bold text-secondary mb-2">
                Document / Material Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Graph Algorithms & Shortest Path Notes"
                required
                className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject name"
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="Unit 1">Unit 1</option>
                  <option value="Unit 2">Unit 2</option>
                  <option value="Unit 3">Unit 3</option>
                  <option value="Unit 4">Unit 4</option>
                  <option value="Unit 5">Unit 5</option>
                  <option value="All Units">All Units (PYQ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-bold text-secondary mb-2">
                Select PDF / Document File
              </label>
              <div className="border-2 border-dashed border-[#cbd5e1] rounded-2xl p-8 text-center bg-[#f8fafc] hover:border-primary transition-all">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="text-[14px] text-[#64748b] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[14px] file:font-bold file:bg-primary-light file:text-primary hover:file:bg-[#dbeafe] cursor-pointer"
                />
                {file && (
                  <p className="text-[14px] text-[#10b981] font-bold mt-3 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Ready: {file.name}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_10px_rgba(37,99,235,0.2)] text-[15px] transition-all cursor-pointer border-none"
            >
              Upload Material
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
