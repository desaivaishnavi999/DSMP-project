import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import {
  useYears,
  useSemesters,
  useSubjects,
  useUnits,
  useTopics,
  useAddMaterial,
  useAddPyq,
  useCloudinaryUpload,
} from "@/hooks";

export default function UploadNotesPage() {
  const user = useAuthStore((s) => s.user);

  const [uploadType, setUploadType] = useState<"material" | "pyq">("material");
  const [title, setTitle] = useState("");
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [examYear, setExamYear] = useState<number>(new Date().getFullYear());
  const [file, setFile] = useState<File | null>(null);

  const { data: years = [] } = useYears();
  const selectedYear = years.find((y: any) => String(y.yearId) === String(yearId));
  const { data: semesters = [] } = useSemesters(yearId, selectedYear?.yearName);
  const { data: subjects = [] } = useSubjects(semesterId);
  const { data: units = [] } = useUnits(subjectId);
  const { data: topics = [] } = useTopics(unitId);

  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { mutate: addMaterial, isPending: addingMaterial } = useAddMaterial();
  const { mutate: addPyq, isPending: addingPyq } = useAddPyq();

  const isSubmitting = isUploading || addingMaterial || addingPyq;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (uploadType === "material") {
      if (!title.trim() || !topicId) {
        toast.error("Please provide a title and select a specific topic.");
        return;
      }

      const uploadResult = await uploadFile(file);
      if (!uploadResult) return;

      addMaterial(
        {
          topicId: Number(topicId),
          title: title.trim(),
          description: `Material uploaded by ${user?.name || "Faculty"}`,
          fileName: uploadResult.fileName,
          fileUrl: uploadResult.fileUrl,
          uploadedBy: user?.id ?? 1,
        },
        {
          onSuccess: () => {
            setTitle("");
            setFile(null);
          },
        }
      );
    } else {
      // PYQ Upload
      if (!subjectId || !examYear) {
        toast.error("Please select a subject and exam year.");
        return;
      }

      const uploadResult = await uploadFile(file);
      if (!uploadResult) return;

      addPyq(
        {
          subjectId: Number(subjectId),
          examYear: Number(examYear),
          title: title.trim() || `PYQ Paper ${examYear}`,
          fileName: uploadResult.fileName,
          fileUrl: uploadResult.fileUrl,
          uploadedBy: user?.id ?? 1,
        },
        {
          onSuccess: () => {
            setTitle("");
            setFile(null);
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
                <Upload className="w-8 h-8 text-primary" />
                Upload Academic Content
              </h1>
              <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
                Publish unit lecture notes, slide decks, and past question papers for students
              </p>
            </div>

            {/* Content Type Selector */}
            <div className="flex items-center gap-2 bg-[#f1f5f9] p-1.5 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setUploadType("material")}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${
                  uploadType === "material"
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#64748b] hover:text-secondary"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Lecture Notes
              </button>
              <button
                type="button"
                onClick={() => setUploadType("pyq")}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${
                  uploadType === "pyq"
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#64748b] hover:text-secondary"
                }`}
              >
                <FileText className="w-4 h-4" />
                Past Paper (PYQ)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-[30px]">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-[14px] font-bold text-secondary mb-2">
                {uploadType === "material" ? "Document / Material Title" : "Paper Title / Description"}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  uploadType === "material"
                    ? "e.g. Graph Algorithms & Shortest Path Notes"
                    : "e.g. End Semester Exam Paper (May 2024)"
                }
                required={uploadType === "material"}
                className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Year</label>
                <select
                  value={yearId}
                  onChange={(e) => {
                    setYearId(e.target.value);
                    setSemesterId("");
                    setSubjectId("");
                    setUnitId("");
                    setTopicId("");
                  }}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="">Select Year</option>
                  {years.map((y: any) => (
                    <option key={y.yearId} value={y.yearId}>
                      {y.yearName || y.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Semester</label>
                <select
                  value={semesterId}
                  onChange={(e) => {
                    setSemesterId(e.target.value);
                    setSubjectId("");
                    setUnitId("");
                    setTopicId("");
                  }}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((s: any) => (
                    <option key={s.semesterId} value={s.semesterId}>
                      {s.semesterName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Subject</label>
                <select
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                    setUnitId("");
                    setTopicId("");
                  }}
                  disabled={!semesterId}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub: any) => (
                    <option key={sub.subjectId} value={sub.subjectId}>
                      {sub.subjectName || sub.name} {sub.subjectCode ? `(${sub.subjectCode})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {uploadType === "material" ? (
                <>
                  <div>
                    <label className="block text-[14px] font-bold text-secondary mb-2">Unit</label>
                    <select
                      value={unitId}
                      onChange={(e) => {
                        setUnitId(e.target.value);
                        setTopicId("");
                      }}
                      disabled={!subjectId}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                    >
                      <option value="">Select Unit</option>
                      {units.map((u: any) => (
                        <option key={u.unitId} value={u.unitId}>
                          {u.unitName || u.title || `Unit ${u.unitNumber}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-secondary mb-2">Topic</label>
                    <select
                      value={topicId}
                      onChange={(e) => setTopicId(e.target.value)}
                      disabled={!unitId}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                    >
                      <option value="">Select Topic</option>
                      {topics.map((t: any) => (
                        <option key={t.topicId} value={t.topicId}>
                          {t.topicName || t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-[14px] font-bold text-secondary mb-2">
                    Examination Year
                  </label>
                  <input
                    type="number"
                    min={2000}
                    max={2030}
                    value={examYear}
                    onChange={(e) => setExamYear(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                  />
                </div>
              )}
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
                  required
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
              disabled={isSubmitting}
              className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_10px_rgba(37,99,235,0.2)] text-[15px] transition-all cursor-pointer border-none disabled:opacity-50"
            >
              {isSubmitting
                ? "Uploading Document..."
                : uploadType === "material"
                ? "Publish Study Material"
                : "Publish PYQ Exam Paper"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
