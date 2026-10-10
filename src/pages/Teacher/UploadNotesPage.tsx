import React, { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useYears, useSemesters, useSubjects, useUnits, useTopics, useAddMaterial, useCloudinaryUpload } from "@/hooks";

export default function UploadNotesPage() {
  const user = useAuthStore((s) => s.user);

  const [title, setTitle] = useState("");
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: years = [] } = useYears();
  const { data: semesters = [] } = useSemesters(yearId);
  const { data: subjects = [] } = useSubjects(semesterId);
  const { data: units = [] } = useUnits(subjectId);
  const { data: topics = [] } = useTopics(unitId);

  const { uploadFile, isUploading } = useCloudinaryUpload();

  const { mutate: addMaterial, isPending } = useAddMaterial();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file || !topicId) {
      toast.error("Please fill in all details, select a topic, and select a file.");
      return;
    }

    const uploadResult = await uploadFile(file);
    if (!uploadResult) {
      return; // Error already handled in hook
    }

    addMaterial(
      {
        topicId: Number(topicId),
        title,
        description: `Material for Topic ${topicId}`,
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Year</label>
                <select
                  value={yearId}
                  onChange={(e) => { setYearId(e.target.value); setSemesterId(""); setSubjectId(""); setUnitId(""); setTopicId(""); }}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="">Select Year</option>
                  {years.map((y: any) => <option key={y.yearId} value={y.yearId}>{y.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Semester</label>
                <select
                  value={semesterId}
                  onChange={(e) => { setSemesterId(e.target.value); setSubjectId(""); setUnitId(""); setTopicId(""); }}
                  disabled={!yearId}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((s: any) => <option key={s.semesterId} value={s.semesterId}>Semester {s.semesterNumber}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Subject</label>
                <select
                  value={subjectId}
                  onChange={(e) => { setSubjectId(e.target.value); setUnitId(""); setTopicId(""); }}
                  disabled={!semesterId}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub: any) => <option key={sub.subjectId} value={sub.subjectId}>{sub.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Unit</label>
                <select
                  value={unitId}
                  onChange={(e) => { setUnitId(e.target.value); setTopicId(""); }}
                  disabled={!subjectId}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="">Select Unit</option>
                  {units.map((u: any) => <option key={u.unitId} value={u.unitId}>{u.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">Topic</label>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  disabled={!unitId}
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="">Select Topic</option>
                  {topics.map((t: any) => <option key={t.topicId} value={t.topicId}>{t.title}</option>)}
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
              disabled={isPending || isUploading}
              className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_10px_rgba(37,99,235,0.2)] text-[15px] transition-all cursor-pointer border-none disabled:opacity-50"
            >
              {(isPending || isUploading) ? "Uploading Material..." : "Upload Material"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
