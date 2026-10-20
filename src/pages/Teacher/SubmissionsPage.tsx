import React, { useState } from "react";
import { CheckSquare, Download, ExternalLink, Calendar, FileText, CheckCircle2, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAssignments, useSubmissionsByAssignment, useAddFeedback, useAllSubjects } from "@/hooks";
import { resolveFileUrl } from "@/config/api";
import { toast } from "sonner";

export default function SubmissionsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: assignments = [], isLoading: loadingAssignments } = useAssignments();
  const { data: allSubjects = [] } = useAllSubjects();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("");

  const getSubjectName = (subjectId?: number | string) => {
    if (!subjectId) return null;
    const match = allSubjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return match ? `${match.subjectCode ? match.subjectCode + " - " : ""}${match.subjectName}` : `Subject #${subjectId}`;
  };

  // Auto-select first assignment when list loads
  React.useEffect(() => {
    if (assignments.length > 0 && !selectedAssignmentId) {
      setSelectedAssignmentId(String(assignments[0].assignmentId));
    }
  }, [assignments, selectedAssignmentId]);

  const activeAssignmentId = selectedAssignmentId ? Number(selectedAssignmentId) : undefined;
  const { data: submissions = [], isLoading: loadingSubmissions } =
    useSubmissionsByAssignment(activeAssignmentId);

  const { mutate: addFeedback, isPending } = useAddFeedback();

  const [gradingId, setGradingId] = useState<number | string | null>(null);
  const [marksInput, setMarksInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleOpenFile = (fileUrl?: string) => {
    if (!fileUrl) {
      toast.error("No file URL available for this submission.");
      return;
    }
    const resolved = resolveFileUrl(fileUrl);
    window.open(resolved, "_blank", "noopener,noreferrer");
  };

  const handleSaveGrade = (submissionId: number | string) => {
    const marksNum = Number(marksInput);
    if (isNaN(marksNum) || marksInput.trim() === "") {
      toast.error("Please enter a valid numeric grade/marks.");
      return;
    }

    addFeedback(
      {
        submissionId,
        teacherId: user?.id ?? 1,
        marks: marksNum,
        feedbackText: feedbackInput.trim() || "Good submission. Work reviewed.",
      },
      {
        onSuccess: () => {
          setGradingId(null);
          setMarksInput("");
          setFeedbackInput("");
        },
      }
    );
  };

  const selectedAssignment = assignments.find(
    (a: any) => String(a.assignmentId) === String(selectedAssignmentId)
  );

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-primary" />
            Student Assignment Submissions
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Review uploaded student work, download submission files, and assign grades with feedback
          </p>
        </div>

        {/* Assignment Selector Card */}
        <div className="bg-white p-6 rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-8 border border-[#e1eaf8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-[14px] font-bold text-secondary mb-2">
                Select Assignment to Review
              </label>
              <select
                value={selectedAssignmentId}
                onChange={(e) => {
                  setSelectedAssignmentId(e.target.value);
                  setGradingId(null);
                }}
                disabled={loadingAssignments || assignments.length === 0}
                className="w-full max-w-xl px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary disabled:opacity-50"
              >
                {loadingAssignments ? (
                  <option>Loading assignments...</option>
                ) : assignments.length === 0 ? (
                  <option>No assignments created yet</option>
                ) : (
                  assignments.map((a: any) => (
                    <option key={a.assignmentId} value={a.assignmentId}>
                      {a.title} {a.dueDate ? `(Due: ${new Date(a.dueDate).toLocaleDateString()})` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            {selectedAssignment && (
              <div className="flex flex-wrap items-center gap-3">
                {getSubjectName(selectedAssignment.subjectId) && (
                  <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3.5 py-2.5 rounded-xl border border-indigo-100 text-[13px] font-bold">
                    <BookOpen className="w-4 h-4" />
                    {getSubjectName(selectedAssignment.subjectId)}
                  </div>
                )}
                <div className="flex items-center gap-3 bg-[#f8fafc] px-4 py-3 rounded-xl border border-[#e2e8f0]">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="text-[13px]">
                    <span className="text-[#64748b] font-medium block">Due Date</span>
                    <span className="font-bold text-secondary">
                      {selectedAssignment.dueDate
                        ? new Date(selectedAssignment.dueDate).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedAssignment?.description && (
            <p className="mt-4 mb-0 text-[14px] text-[#64748b] bg-[#f8fafc] p-3 rounded-xl border border-[#f1f5f9]">
              <span className="font-bold text-secondary">Prompt: </span>
              {selectedAssignment.description}
            </p>
          )}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {loadingSubmissions ? (
            <div className="p-12 text-center text-slate-500 font-bold bg-white rounded-2xl border">
              Loading submissions...
            </div>
          ) : !selectedAssignmentId ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
              Please select an assignment above to view student submissions.
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
              No submissions uploaded yet for this assignment.
            </div>
          ) : (
            submissions.map((sub: any) => (
              <div
                key={sub.submissionId}
                className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                      Student ID: #{sub.studentId}
                    </span>
                    <span
                      className={`text-[12px] font-bold px-3 py-1 rounded-md ${
                        sub.status === "Checked"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {sub.status || "Submitted"}
                    </span>
                    {sub.submittedAt && (
                      <span className="text-[12px] text-[#64748b]">
                        Submitted: {new Date(sub.submittedAt).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-[15px] font-bold text-primary m-0 mt-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    {sub.fileName || "Assignment_Report.pdf"}
                  </p>

                  {(sub.feedback?.marks != null || sub.feedback?.feedbackText) && (
                    <div className="mt-2 text-[13px] bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-[#e2e8f0] inline-block">
                      <span className="font-bold text-emerald-800">Awarded Marks: {sub.feedback.marks}</span>
                      {sub.feedback.feedbackText && (
                        <span className="text-slate-600 ml-2">({sub.feedback.feedbackText})</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleOpenFile(sub.fileUrl)}
                    className="px-4 py-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#1e40af] text-[14px] font-bold flex items-center gap-2 border border-[#cbd5e1] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Open Submission
                  </button>

                  {sub.status === "Checked" ? (
                    <div className="flex items-center gap-1 text-[13px] font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Graded & Checked
                    </div>
                  ) : gradingId === sub.submissionId ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        placeholder="Marks (e.g. 95)"
                        value={marksInput}
                        onChange={(e) => setMarksInput(e.target.value)}
                        className="w-28 px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[14px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Feedback / remarks"
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        className="px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[14px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleSaveGrade(sub.submissionId)}
                        disabled={isPending}
                        className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl border-none cursor-pointer shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50"
                      >
                        {isPending ? "Saving..." : "Save Grade"}
                      </button>
                      <button
                        onClick={() => setGradingId(null)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[13px] font-bold rounded-xl border-none cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setGradingId(sub.submissionId);
                        setMarksInput("");
                        setFeedbackInput("");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white text-[14px] font-bold transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                    >
                      Assign Grade & Feedback
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
