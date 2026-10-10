import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipboardList, CheckCircle2 } from "lucide-react";
import { useAssignments, useSubmitAssignment, useCloudinaryUpload } from "@/hooks";
import { toast } from "sonner";

export default function AssignmentsPage() {
  const { user } = useAuthStore();
  const { data: assignments = [], isLoading } = useAssignments();
  const { mutate: submitWork, isPending } = useSubmitAssignment();

  const [activeAssignmentId, setActiveAssignmentId] = useState<number | string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, isUploading } = useCloudinaryUpload();

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

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans">
      <main className="max-w-[1200px] mx-auto mt-[35px] px-5 pb-10">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="m-0 text-secondary text-[25px] sm:text-[30px] font-bold flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            My Assignments
          </h1>
          <p className="mt-2.5 text-[#64748b] text-[16px]">
            View and submit your pending coursework.
          </p>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500 font-bold bg-white rounded-2xl border">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
            No active assignments found.
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {assignments.map((item: any) => (
              <div
                key={item.assignmentId}
                className="bg-white p-[25px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] border border-[#e1eaf8] flex flex-col justify-between items-start gap-5 transition-all duration-250 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]"
              >
                <div className="w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] text-[13px] font-bold rounded-md border border-[#ffeeba]">
                      Due: {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "No Due Date"}
                    </span>
                  </div>
                  <h3 className="m-0 text-[#12305b] text-[19px] font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[#64748b] text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {activeAssignmentId === item.assignmentId ? (
                  <div className="w-full space-y-3 mt-2 pt-3 border-t">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-2.5 border rounded-xl text-secondary text-[14px] focus:outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[14px] file:font-bold file:bg-primary-light file:text-primary hover:file:bg-[#dbeafe] cursor-pointer"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmitWork(item.assignmentId)}
                        disabled={isPending || isUploading}
                        className="px-5 py-2 bg-primary hover:bg-blue-700 text-white font-bold text-[14px] rounded-xl cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50"
                      >
                        {(isPending || isUploading) ? "Submitting..." : "Confirm & Submit"}
                      </button>
                      <button
                        onClick={() => setActiveAssignmentId(null)}
                        className="px-5 py-2 bg-slate-100 text-slate-600 font-bold text-[14px] rounded-xl cursor-pointer border-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => setActiveAssignmentId(item.assignmentId)}
                      className="w-full md:w-auto px-6 py-2.5 bg-[#2563eb] text-white text-[15px] font-bold rounded-[8px] border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                    >
                      Submit Work
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
