import React, { useState } from "react";
import { BookOpen, FileText, Download, Layers, Search, Calendar, GraduationCap } from "lucide-react";
import {
  useYears,
  useSemesters,
  useSubjects,
  useUnits,
  useTopics,
  useMaterialsByTopic,
  usePyqsBySubject,
} from "@/hooks";
import { resolveFileUrl } from "@/config/api";
import { toast } from "sonner";

export default function StudyMaterials() {
  const [activeTab, setActiveTab] = useState<"materials" | "pyqs">("materials");

  // Filter selections
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [topicId, setTopicId] = useState("");

  const { data: years = [] } = useYears();
  const selectedYear = years.find((y: any) => String(y.yearId) === String(yearId));
  const { data: semesters = [] } = useSemesters(yearId, selectedYear?.yearName);
  const { data: subjects = [] } = useSubjects(semesterId);
  const { data: units = [] } = useUnits(subjectId);
  const { data: topics = [] } = useTopics(unitId);

  // Materials & PYQs queries
  const { data: materials = [], isLoading: loadingMaterials } = useMaterialsByTopic(topicId);
  const { data: pyqs = [], isLoading: loadingPyqs } = usePyqsBySubject(subjectId);

  const handleDownload = (fileUrl?: string) => {
    if (!fileUrl) {
      toast.error("No file URL available for this resource.");
      return;
    }
    const resolved = resolveFileUrl(fileUrl);
    window.open(resolved, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Banner */}
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
                <Layers className="w-8 h-8 text-primary" />
                Study Materials & PYQs
              </h1>
              <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
                Access unit-wise lecture notes, slides, and previous year university examination papers.
              </p>
            </div>

            {/* Tab switch buttons */}
            <div className="flex items-center gap-2 bg-[#f1f5f9] p-1.5 rounded-xl shrink-0">
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${
                  activeTab === "materials"
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#64748b] hover:text-secondary"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Course Materials
              </button>
              <button
                onClick={() => setActiveTab("pyqs")}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${
                  activeTab === "pyqs"
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#64748b] hover:text-secondary"
                }`}
              >
                <FileText className="w-4 h-4" />
                Past Year Papers (PYQs)
              </button>
            </div>
          </div>
        </div>

        {/* Academic Filters */}
        <div className="bg-white p-6 rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-8 flex flex-wrap gap-4 border border-[#e1eaf8]">
          <select
            value={yearId}
            onChange={(e) => {
              setYearId(e.target.value);
              setSemesterId("");
              setSubjectId("");
              setUnitId("");
              setTopicId("");
            }}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary"
          >
            <option value="">Select Year</option>
            {years.map((y: any) => (
              <option key={y.yearId} value={y.yearId}>
                {y.yearName || y.name}
              </option>
            ))}
          </select>

          <select
            value={semesterId}
            onChange={(e) => {
              setSemesterId(e.target.value);
              setSubjectId("");
              setUnitId("");
              setTopicId("");
            }}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary"
          >
            <option value="">Select Semester</option>
            {semesters.map((s: any) => (
              <option key={s.semesterId} value={s.semesterId}>
                {s.semesterName}
              </option>
            ))}
          </select>

          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setUnitId("");
              setTopicId("");
            }}
            disabled={!semesterId}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub: any) => (
              <option key={sub.subjectId} value={sub.subjectId}>
                {sub.subjectName || sub.name} {sub.subjectCode ? `(${sub.subjectCode})` : ""}
              </option>
            ))}
          </select>

          {activeTab === "materials" && (
            <>
              <select
                value={unitId}
                onChange={(e) => {
                  setUnitId(e.target.value);
                  setTopicId("");
                }}
                disabled={!subjectId}
                className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
              >
                <option value="">Select Unit</option>
                {units.map((u: any) => (
                  <option key={u.unitId} value={u.unitId}>
                    {u.unitName || u.title || `Unit ${u.unitNumber}`}
                  </option>
                ))}
              </select>

              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                disabled={!unitId}
                className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
              >
                <option value="">Select Topic</option>
                {topics.map((t: any) => (
                  <option key={t.topicId} value={t.topicId}>
                    {t.topicName || t.title}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* TAB 1: STUDY MATERIALS */}
        {activeTab === "materials" && (
          <div>
            {loadingMaterials ? (
              <div className="p-12 text-center text-slate-500 font-bold bg-white rounded-2xl border">
                Loading study materials...
              </div>
            ) : materials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((res: any) => (
                  <div
                    key={res.materialId}
                    className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] hover:border-primary-light flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                        Lecture Material
                      </span>
                      {res.uploadedAt && (
                        <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-[#f1f5f9] text-[#64748b]">
                          {new Date(res.uploadedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-4 flex-1">
                      <div className="mt-1">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-secondary mb-1 m-0 line-clamp-2">
                          {res.title}
                        </h3>
                        {res.description && (
                          <p className="text-[13px] text-[#64748b] m-0">{res.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9] mt-auto">
                      <div className="text-[12px] text-[#64748b] truncate max-w-[200px]">
                        <p className="m-0 truncate">
                          File: <span className="font-semibold text-secondary">{res.fileName || "Document"}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(res.fileUrl)}
                        className="p-2.5 rounded-[10px] bg-primary hover:bg-blue-700 text-white transition-colors cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] flex items-center gap-1.5 text-[13px] font-bold"
                        title="Download / View"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : topicId ? (
              <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">No materials found</h3>
                <p className="text-[#64748b] m-0">No documents uploaded for this topic yet.</p>
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">Select a Topic</h3>
                <p className="text-[#64748b] m-0">
                  Please select year, semester, subject, unit, and topic to view study materials.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PREVIOUS YEAR QUESTIONS (PYQS) */}
        {activeTab === "pyqs" && (
          <div>
            {loadingPyqs ? (
              <div className="p-12 text-center text-slate-500 font-bold bg-white rounded-2xl border">
                Loading previous year question papers...
              </div>
            ) : pyqs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pyqs.map((paper: any) => (
                  <div
                    key={paper.pyqId || paper.id}
                    className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Exam Year {paper.examYear}
                      </span>
                      <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-[#f1f5f9] text-[#64748b]">
                        University Paper
                      </span>
                    </div>

                    <div className="flex items-start gap-3 mb-4 flex-1">
                      <div className="mt-1">
                        <FileText className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-secondary mb-1 m-0">
                          {paper.title || `PYQ Paper - ${paper.examYear}`}
                        </h3>
                        <p className="text-[13px] text-[#64748b] m-0">
                          {paper.fileName || "Exam_Paper.pdf"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9] mt-auto">
                      <span className="text-[12px] text-[#64748b]">Format: PDF Document</span>
                      <button
                        onClick={() => handleDownload(paper.fileUrl)}
                        className="px-4 py-2 rounded-[10px] bg-primary hover:bg-blue-700 text-white font-bold text-[13px] transition-colors cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        Download Paper
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : subjectId ? (
              <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">No Question Papers Found</h3>
                <p className="text-[#64748b] m-0">No previous year exam papers uploaded for this subject yet.</p>
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">Select a Subject</h3>
                <p className="text-[#64748b] m-0">
                  Select year, semester, and subject to browse previous year examination papers.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
