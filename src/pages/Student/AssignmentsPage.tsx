import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipboardList, CheckCircle2, FileText, Upload, Calendar, Download, BookOpen, Award } from "lucide-react";
import { useAssignments, useStudentSubmissions, useSubmitAssignment, useCloudinaryUpload, useAllSubjects } from "@/hooks";
import { resolveFileUrl } from "@/config/api";
import { toast } from "sonner";

export default function AssignmentsPage() {
  const { user } = useAuthStore();
  const { data: assignments = [], isLoading: loadingAssignments } = useAssignments();
  const { data: allSubjects = [] } = useAllSubjects();
  const { data: studentSubmissions = [], isLoading: loadingSubmissions } = useStudentSubmissions(
    user?.id
  );
  const { mutate: submitWork, isPending } = useSubmitAssignment();

  const getSubjectName = (subjectId?: number | string) => {
    if (!subjectId) return null;
    const match = allSubjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return match ? `${match.subjectCode ? match.subjectCode + " - " : ""}${match.subjectName}` : `Subject #${subjectId}`;
  };

  const [activeAssignmentId, setActiveAssignmentId] = useState<number | string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, isUploading } = useCloudinaryUpload();

  const handleOpenFile = (fileUrl?: string) => {
    if (!fileUrl) {
      toast.error("No file available to preview.");
      return;
    }
    const resolved = resolveFileUrl(fileUrl);
    window.open(resolved, "_blank", "noopener,noreferrer");
  };

  const handleSubmitWork = async (assignmentId: number | string) => {
    if (!file) {
      toast.error("Please select a file to submit.");
      return;
    }

    const uploadResult = await uploadFile(file);
    if (!uploadResult) return;

    submitWork(
      {
        assignmentId,
        studentId: user?.id ?? 1,
        fileName: uploadResult.fileName,
        fileUrl: uploadResult.fileUrl,
      },
      {
        onSuccess: () => {
          setActiveAssignmentId(null);
          setFile(null);
        },
      }
    );
  };

  const isLoading = loadingAssignments || loadingSubmissions;

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-[1200px] w-full mx-auto mt-[35px] px-5 pb-10">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="m-0 text-secondary text-[25px] sm:text-[30px] font-bold flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            My Course Assignments
          </h1>
          <p className="mt-2.5 text-[#64748b] text-[16px]">
            View assignments assigned by faculty, upload your submissions, and track grades.
          </p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 font-bold bg-white rounded-2xl border">
            Loading assignments and submission history...
          </div>
        ) : assignments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
            No active assignments found for your enrolled subjects.
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {assignments.map((item: any) => {
              const mySub = studentSubmissions.find(
                (s: any) => String(s.assignmentId) === String(item.assignmentId)
              );
              const isChecked = mySub?.status === "Checked";
              const isSubmitted = !!mySub;

              return (
                <div
                  key={item.assignmentId}
                  className="bg-white p-[25px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] border border-[#e1eaf8] flex flex-col justify-between items-start gap-5 transition-all duration-250 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]"
                >
                  <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {getSubjectName(item.subjectId) && (
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[13px] font-bold rounded-md border border-indigo-100 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {getSubjectName(item.subjectId)}
                        </span>
                      )}

                      <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] text-[13px] font-bold rounded-md border border-[#ffeeba] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Due: {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "No Due Date"}
                      </span>

                      {isSubmitted && (
                        <span
                          className={`px-3 py-1 text-[13px] font-bold rounded-md flex items-center gap-1 ${
                            isChecked
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isChecked ? "Graded & Checked" : "Submitted"}
                        </span>
                      )}
                    </div>

                    <h3 className="m-0 text-[#12305b] text-[19px] font-bold mb-2">{item.title}</h3>
                    <p className="m-0 text-[#64748b] text-[15px] leading-relaxed">
                      {item.description}
                    </p>

                    {/* If student has already submitted */}
                    {isSubmitted && (
                      <div className="mt-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <p className="text-[14px] font-bold text-secondary m-0 flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-primary" />
                              Submitted File: <span className="font-semibold text-primary">{mySub.fileName || "Assignment_Solution"}</span>
                            </p>
                            {mySub.submittedAt && (
                              <p className="text-[12px] text-[#64748b] mt-1 mb-0">
                                Uploaded on {new Date(mySub.submittedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleOpenFile(mySub.fileUrl)}
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#1e40af] border border-[#cbd5e1] rounded-xl text-[13px] font-bold flex items-center gap-1.5 cursor-pointer shadow-sm w-fit"
                          >
                            <Download className="w-4 h-4" />
                            View My Work
                          </button>
                        </div>

                        {/* Marks & Feedback */}
                        {(mySub.feedback?.marks != null || mySub.grade != null || mySub.feedback?.feedbackText) && (
                          <div className="mt-3 pt-3 border-t border-[#e2e8f0] flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-emerald-600" />
                              <span className="text-[13px] font-bold text-emerald-800">
                                Score / Marks: {mySub.feedback?.marks ?? mySub.grade}
                              </span>
                            </div>
                            {mySub.feedback?.feedbackText && (
                              <p className="text-[13px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 m-0">
                                <span className="font-bold text-secondary">Faculty Feedback: </span>
                                {mySub.feedback.feedbackText}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submission Form / Button */}
                  {activeAssignmentId === item.assignmentId ? (
                    <div className="w-full space-y-3 mt-2 pt-3 border-t">
                      <label className="block text-[13px] font-bold text-secondary">
                        Upload your completed assignment (PDF, Word, or ZIP):
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full px-4 py-2.5 border rounded-xl text-secondary text-[14px] focus:outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[14px] file:font-bold file:bg-primary-light file:text-primary hover:file:bg-[#dbeafe] cursor-pointer"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSubmitWork(item.assignmentId)}
                          disabled={isPending || isUploading}
                          className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-[14px] rounded-xl cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          {isPending || isUploading ? "Uploading..." : "Confirm & Submit"}
                        </button>
                        <button
                          onClick={() => {
                            setActiveAssignmentId(null);
                            setFile(null);
                          }}
                          className="px-5 py-2.5 bg-slate-100 text-slate-600 font-bold text-[14px] rounded-xl cursor-pointer border-none hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : !isSubmitted ? (
                    <div className="shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => setActiveAssignmentId(item.assignmentId)}
                        className="w-full md:w-auto px-6 py-2.5 bg-[#2563eb] text-white text-[15px] font-bold rounded-[10px] border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-[0_4px_10px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Submit Work
                      </button>
                    </div>
                  ) : (
                    <div className="shrink-0">
                      <button
                        onClick={() => setActiveAssignmentId(item.assignmentId)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#475569] text-[13px] font-bold rounded-lg border-none cursor-pointer"
                      >
                        Resubmit / Update
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
