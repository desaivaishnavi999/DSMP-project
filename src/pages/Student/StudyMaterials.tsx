import React, { useState } from "react";
import { BookOpen, FileText, Download, Eye, Layers, Search } from "lucide-react";
import { useYears, useSemesters, useSubjects, useUnits, useTopics, useMaterialsByTopic } from "@/hooks";
import { api } from "@/config/api";

export default function StudyMaterials() {
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [topicId, setTopicId] = useState("");

  const { data: years = [] } = useYears();
  const { data: semesters = [] } = useSemesters(yearId);
  const { data: subjects = [] } = useSubjects(semesterId);
  const { data: units = [] } = useUnits(subjectId);
  const { data: topics = [] } = useTopics(unitId);

  const { data: materials = [], isLoading } = useMaterialsByTopic(topicId);

  const handleDownload = (fileUrl: string) => {
    if (fileUrl) {
      if (fileUrl.startsWith("http")) {
        window.open(fileUrl, "_blank");
      } else {
        window.open(`http://localhost:8080${fileUrl}`, "_blank");
      }
    } else {
      alert("No file URL available.");
    }
  };

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

        <div className="bg-white p-6 rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-8 flex flex-wrap gap-4 border border-[#e1eaf8]">
          <select
            value={yearId}
            onChange={(e) => { setYearId(e.target.value); setSemesterId(""); setSubjectId(""); setUnitId(""); setTopicId(""); }}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary"
          >
            <option value="">Select Year</option>
            {years.map((y: any) => <option key={y.yearId} value={y.yearId}>{y.name}</option>)}
          </select>
          <select
            value={semesterId}
            onChange={(e) => { setSemesterId(e.target.value); setSubjectId(""); setUnitId(""); setTopicId(""); }}
            disabled={!yearId}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">Select Semester</option>
            {semesters.map((s: any) => <option key={s.semesterId} value={s.semesterId}>Semester {s.semesterNumber}</option>)}
          </select>
          <select
            value={subjectId}
            onChange={(e) => { setSubjectId(e.target.value); setUnitId(""); setTopicId(""); }}
            disabled={!semesterId}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub: any) => <option key={sub.subjectId} value={sub.subjectId}>{sub.name}</option>)}
          </select>
          <select
            value={unitId}
            onChange={(e) => { setUnitId(e.target.value); setTopicId(""); }}
            disabled={!subjectId}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">Select Unit</option>
            {units.map((u: any) => <option key={u.unitId} value={u.unitId}>{u.title}</option>)}
          </select>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            disabled={!unitId}
            className="flex-1 min-w-[150px] px-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">Select Topic</option>
            {topics.map((t: any) => <option key={t.topicId} value={t.topicId}>{t.title}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((res: any) => (
            <div key={res.materialId} className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] hover:border-primary-light flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                  Material
                </span>
                <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-[#f1f5f9] text-[#64748b]">
                  {new Date(res.uploadedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4 flex-1">
                <div className="mt-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-secondary mb-1 m-0 line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-[13px] font-semibold text-primary m-0">{res.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9] mt-auto">
                <div className="text-[12px] text-[#64748b]">
                  <p className="m-0">File: <span className="font-semibold text-secondary">{res.fileName}</span></p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(res.fileUrl)} className="p-2.5 rounded-[10px] bg-primary hover:bg-blue-700 text-white transition-colors cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {topicId && materials.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">No materials found</h3>
            <p className="text-[#64748b] m-0">No resources available for this topic yet.</p>
          </div>
        )}
        {!topicId && (
          <div className="text-center py-20 bg-white border border-[#e1eaf8] rounded-[18px]">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-secondary mb-2 m-0">Select a Topic</h3>
            <p className="text-[#64748b] m-0">Please select a year, semester, subject, unit, and topic to view materials.</p>
          </div>
        )}
      </main>
    </div>
  );
}
