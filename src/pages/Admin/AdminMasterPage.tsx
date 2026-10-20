import React, { useState, useEffect } from "react";
import { api } from "@/config/api";
import { API_URLS } from "@/constants";
import { toast } from "sonner";
import {
  BookOpen,
  Layers,
  FileText,
  Calendar,
  Plus,
  Trash2,
  GraduationCap,
  X,
  Loader2,
  ShieldCheck,
  Bookmark,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AcademicYear { yearId: number; yearName: string; }
interface Semester { semesterId: number; yearId: number; semesterNumber: number; semesterName: string; }
interface Subject { subjectId: number; semesterId: number; subjectName: string; subjectCode: string; }
interface Unit { unitId: number; subjectId: number; unitNumber: number; unitName: string; }
interface Topic { topicId: number; unitId: number; topicNumber: number; topicName: string; }

type TabKey = "years" | "semesters" | "subjects" | "units" | "topics";

const TABS: { key: TabKey; label: string; icon: React.ElementType; color: string }[] = [
  { key: "years",     label: "Academic Years", icon: Calendar,  color: "#6366f1" },
  { key: "semesters", label: "Semesters",       icon: Layers,    color: "#0ea5e9" },
  { key: "subjects",  label: "Subjects",        icon: BookOpen,  color: "#10b981" },
  { key: "units",     label: "Units",           icon: FileText,  color: "#f59e0b" },
  { key: "topics",    label: "Topics",          icon: Bookmark,  color: "#ec4899" },
];

// ─── Modal Component ──────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>{title}</span>
          <button style={styles.modalClose} onClick={onClose}><X size={18} /></button>
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminMasterPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("years");
  const [modal, setModal] = useState<TabKey | null>(null);
  const [loading, setLoading] = useState(false);

  // Data
  const [years, setYears]         = useState<AcademicYear[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects]   = useState<Subject[]>([]);
  const [units, setUnits]         = useState<Unit[]>([]);
  const [topics, setTopics]       = useState<Topic[]>([]);

  // Form states
  const [yearForm, setYearForm]   = useState({ yearName: "" });
  const [semForm, setSemForm]     = useState({ yearId: "", semesterNumber: "", semesterName: "" });
  const [subForm, setSubForm]     = useState({ semesterId: "", subjectName: "", subjectCode: "" });
  const [unitForm, setUnitForm]   = useState({ subjectId: "", unitNumber: "", unitName: "" });
  const [topicForm, setTopicForm] = useState({ unitId: "", topicNumber: "", topicName: "" });

  // Load all data
  const loadYears = async () => {
    try {
      const r = await api.get(API_URLS.ACADEMIC.YEARS);
      setYears(r.data);
    } catch {
      toast.error("Failed to load years");
    }
  };

  const loadSemesters = async () => {
    setSemesters(
      [1, 2, 3, 4, 5, 6, 7, 8].map((s) => ({
        semesterId: s,
        yearId: Math.ceil(s / 2),
        semesterNumber: s,
        semesterName: `Semester ${s}`,
      }))
    );
  };

  const loadSubjects = async () => {
    try {
      const r = await api.get(API_URLS.ACADEMIC.ALL_SUBJECTS);
      setSubjects(r.data);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  const loadUnits = async () => {
    try {
      const r = await api.get(API_URLS.ACADEMIC.ALL_UNITS);
      setUnits(r.data);
    } catch {
      toast.error("Failed to load units");
    }
  };

  const loadTopics = async () => {
    try {
      const r = await api.get(API_URLS.ACADEMIC.ALL_TOPICS);
      setTopics(r.data);
    } catch {
      toast.error("Failed to load topics");
    }
  };

  const loadAll = () => {
    loadYears();
    loadSemesters();
    loadSubjects();
    loadUnits();
    loadTopics();
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (activeTab === "years") loadYears();
    else if (activeTab === "semesters") { loadYears(); loadSemesters(); }
    else if (activeTab === "subjects") { loadSemesters(); loadSubjects(); }
    else if (activeTab === "units") { loadSubjects(); loadUnits(); }
    else if (activeTab === "topics") { loadUnits(); loadTopics(); }
  }, [activeTab]);

  // ─── Submit handlers ────────────────────────────────────────────────────────
  const handleAddYear = async () => {
    if (!yearForm.yearName.trim()) return toast.error("Year name is required");
    setLoading(true);
    try {
      await api.post(API_URLS.ADMIN.YEARS, { yearName: yearForm.yearName });
      toast.success("Academic Year added!");
      setYearForm({ yearName: "" });
      setModal(null);
      loadYears();
    } catch { toast.error("Failed to add year"); } finally { setLoading(false); }
  };

  const handleAddSemester = async () => {
    if (!semForm.yearId || !semForm.semesterNumber || !semForm.semesterName.trim()) return toast.error("All fields required");
    setLoading(true);
    try {
      await api.post(API_URLS.ADMIN.SEMESTERS, {
        yearId: Number(semForm.yearId),
        semesterNumber: Number(semForm.semesterNumber),
        semesterName: semForm.semesterName,
      });
      toast.success("Semester added!");
      setSemForm({ yearId: "", semesterNumber: "", semesterName: "" });
      setModal(null);
      loadSemesters();
    } catch { toast.error("Failed to add semester"); } finally { setLoading(false); }
  };

  const handleAddSubject = async () => {
    if (!subForm.semesterId || !subForm.subjectName.trim()) return toast.error("All fields required");
    setLoading(true);
    try {
      await api.post(API_URLS.ADMIN.SUBJECTS, {
        semesterId: Number(subForm.semesterId),
        subjectName: subForm.subjectName,
        subjectCode: subForm.subjectCode,
      });
      toast.success("Subject added!");
      setSubForm({ semesterId: "", subjectName: "", subjectCode: "" });
      setModal(null);
      loadSubjects();
    } catch { toast.error("Failed to add subject"); } finally { setLoading(false); }
  };

  const handleAddUnit = async () => {
    if (!unitForm.subjectId || !unitForm.unitNumber || !unitForm.unitName.trim()) return toast.error("All fields required");
    setLoading(true);
    try {
      await api.post(API_URLS.ADMIN.UNITS, {
        subjectId: Number(unitForm.subjectId),
        unitNumber: Number(unitForm.unitNumber),
        unitName: unitForm.unitName,
      });
      toast.success("Unit added!");
      setUnitForm({ subjectId: "", unitNumber: "", unitName: "" });
      setModal(null);
      loadUnits();
    } catch { toast.error("Failed to add unit"); } finally { setLoading(false); }
  };

  const handleAddTopic = async () => {
    if (!topicForm.unitId || !topicForm.topicNumber || !topicForm.topicName.trim()) return toast.error("All fields required");
    setLoading(true);
    try {
      await api.post(API_URLS.ADMIN.TOPICS, {
        unitId: Number(topicForm.unitId),
        topicNumber: Number(topicForm.topicNumber),
        topicName: topicForm.topicName,
      });
      toast.success("Topic added!");
      setTopicForm({ unitId: "", topicNumber: "", topicName: "" });
      setModal(null);
      loadTopics();
    } catch { toast.error("Failed to add topic"); } finally { setLoading(false); }
  };

  // ─── Delete handlers ────────────────────────────────────────────────────────
  const handleDelete = async (type: TabKey, id: number) => {
    const urlMap: Record<TabKey, string> = {
      years:     API_URLS.ADMIN.YEAR_DELETE(id),
      semesters: API_URLS.ADMIN.SEMESTER_DELETE(id),
      subjects:  API_URLS.ADMIN.SUBJECT_DELETE(id),
      units:     API_URLS.ADMIN.UNIT_DELETE(id),
      topics:    API_URLS.ADMIN.TOPIC_DELETE(id),
    };
    try {
      await api.delete(urlMap[type]);
      toast.success("Deleted successfully");
      if (type === "years")     loadYears();
      if (type === "semesters") loadSemesters();
      if (type === "subjects")  loadSubjects();
      if (type === "units")     loadUnits();
      if (type === "topics")    loadTopics();
    } catch { toast.error("Failed to delete"); }
  };

  const activeTabInfo = TABS.find(t => t.key === activeTab)!;

  // ─── Helper to get parent name labels ──────────────────────────────────────
  const getYearName = (id: number) => years.find(y => y.yearId === id)?.yearName ?? `Year #${id}`;
  const getSemName  = (id: number) => `Semester ${id}`;
  const getSubName  = (id: number) => subjects.find(s => s.subjectId === id)?.subjectName ?? `Subject #${id}`;
  const getUnitName = (id: number) => units.find(u => u.unitId === id)?.unitName ?? `Unit #${id}`;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}><ShieldCheck size={24} color="#fff" /></div>
            <div>
              <h1 style={styles.headerTitle}>Admin Master</h1>
              <p style={styles.headerSub}>Manage academic structure — Years, Semesters, Subjects, Units & Topics</p>
            </div>
          </div>
          {activeTab !== "semesters" && (
            <button style={{ ...styles.addBtn, background: activeTabInfo.color }} onClick={() => setModal(activeTab)}>
              <Plus size={16} /> Add {activeTabInfo.label}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              style={{ ...styles.tab, ...(active ? { ...styles.tabActive, borderColor: tab.color, color: tab.color } : {}) }}
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon size={16} style={{ color: active ? tab.color : "#64748b" }} />
              {tab.label}
              {active && <span style={{ ...styles.tabDot, background: tab.color }} />}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Stats row */}
        <div style={styles.statsRow}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const counts: Record<TabKey, number> = {
              years: years.length, semesters: semesters.length,
              subjects: subjects.length, units: units.length,
              topics: topics.length,
            };
            return (
              <div key={tab.key} style={styles.statCard} onClick={() => setActiveTab(tab.key)}>
                <div style={{ ...styles.statIcon, background: tab.color + "22" }}>
                  <Icon size={20} style={{ color: tab.color }} />
                </div>
                <div>
                  <div style={{ ...styles.statCount, color: tab.color }}>{counts[tab.key]}</div>
                  <div style={styles.statLabel}>{tab.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <activeTabInfo.icon size={20} style={{ color: activeTabInfo.color }} />
              <span style={styles.tableTitle}>{activeTabInfo.label}</span>
              <span style={{ ...styles.tableBadge, background: activeTabInfo.color + "22", color: activeTabInfo.color }}>
                {activeTab === "years" ? years.length : activeTab === "semesters" ? semesters.length : activeTab === "subjects" ? subjects.length : activeTab === "units" ? units.length : topics.length}
              </span>
            </div>
          </div>
          <div style={styles.tableBody}>
            {activeTab === "years" && (
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Year Name</th><th style={styles.th}>Action</th></tr></thead>
                <tbody>
                  {years.length === 0 ? <tr><td colSpan={3} style={styles.emptyCell}>No academic years added yet</td></tr> :
                    years.map(y => (
                      <tr key={y.yearId} style={styles.tr}>
                        <td style={styles.td}><span style={styles.idBadge}>#{y.yearId}</span></td>
                        <td style={styles.td}><span style={styles.nameCell}><GraduationCap size={14} color="#6366f1"/>{y.yearName}</span></td>
                        <td style={styles.td}><button style={styles.deleteBtn} onClick={() => handleDelete("years", y.yearId)}><Trash2 size={14}/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {activeTab === "semesters" && (
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Year</th><th style={styles.th}>Sem #</th><th style={styles.th}>Semester Name</th><th style={styles.th}>Action</th></tr></thead>
                <tbody>
                  {semesters.length === 0 ? <tr><td colSpan={5} style={styles.emptyCell}>No semesters added yet</td></tr> :
                    semesters.map(s => (
                      <tr key={s.semesterId} style={styles.tr}>
                        <td style={styles.td}><span style={styles.idBadge}>#{s.semesterId}</span></td>
                        <td style={styles.td}><span style={styles.parentChip}>{getYearName(s.yearId)}</span></td>
                        <td style={styles.td}><span style={styles.numBadge}>{s.semesterNumber}</span></td>
                        <td style={styles.td}>{s.semesterName}</td>
                        <td style={styles.td}><span style={styles.idBadge}>Standard</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {activeTab === "subjects" && (
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Semester</th><th style={styles.th}>Code</th><th style={styles.th}>Subject Name</th><th style={styles.th}>Action</th></tr></thead>
                <tbody>
                  {subjects.length === 0 ? <tr><td colSpan={5} style={styles.emptyCell}>No subjects added yet</td></tr> :
                    subjects.map(s => (
                      <tr key={s.subjectId} style={styles.tr}>
                        <td style={styles.td}><span style={styles.idBadge}>#{s.subjectId}</span></td>
                        <td style={styles.td}><span style={styles.parentChip}>{getSemName(s.semesterId)}</span></td>
                        <td style={styles.td}><span style={{ ...styles.numBadge, background: "#10b98122", color: "#10b981" }}>{s.subjectCode}</span></td>
                        <td style={styles.td}>{s.subjectName}</td>
                        <td style={styles.td}><button style={styles.deleteBtn} onClick={() => handleDelete("subjects", s.subjectId)}><Trash2 size={14}/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {activeTab === "units" && (
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Subject</th><th style={styles.th}>Unit #</th><th style={styles.th}>Unit Name</th><th style={styles.th}>Action</th></tr></thead>
                <tbody>
                  {units.length === 0 ? <tr><td colSpan={5} style={styles.emptyCell}>No units added yet</td></tr> :
                    units.map(u => (
                      <tr key={u.unitId} style={styles.tr}>
                        <td style={styles.td}><span style={styles.idBadge}>#{u.unitId}</span></td>
                        <td style={styles.td}><span style={styles.parentChip}>{getSubName(u.subjectId)}</span></td>
                        <td style={styles.td}><span style={{ ...styles.numBadge, background: "#f59e0b22", color: "#f59e0b" }}>{u.unitNumber}</span></td>
                        <td style={styles.td}>{u.unitName}</td>
                        <td style={styles.td}><button style={styles.deleteBtn} onClick={() => handleDelete("units", u.unitId)}><Trash2 size={14}/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {activeTab === "topics" && (
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Unit</th><th style={styles.th}>Topic #</th><th style={styles.th}>Topic Name</th><th style={styles.th}>Action</th></tr></thead>
                <tbody>
                  {topics.length === 0 ? <tr><td colSpan={5} style={styles.emptyCell}>No topics added yet</td></tr> :
                    topics.map(t => (
                      <tr key={t.topicId} style={styles.tr}>
                        <td style={styles.td}><span style={styles.idBadge}>#{t.topicId}</span></td>
                        <td style={styles.td}><span style={styles.parentChip}>{getUnitName(t.unitId)}</span></td>
                        <td style={styles.td}><span style={{ ...styles.numBadge, background: "#ec489922", color: "#ec4899" }}>{t.topicNumber}</span></td>
                        <td style={styles.td}>{t.topicName}</td>
                        <td style={styles.td}><button style={styles.deleteBtn} onClick={() => handleDelete("topics", t.topicId)}><Trash2 size={14}/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ─── Modals ───────────────────────────────────────────────────────────── */}
      {modal === "years" && (
        <Modal title="Add Academic Year" onClose={() => setModal(null)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Year Name <span style={styles.req}>*</span></label>
            <input style={styles.input} placeholder="e.g. First Year" value={yearForm.yearName}
              onChange={e => setYearForm({ yearName: e.target.value })} />
          </div>
          <button style={{ ...styles.submitBtn, background: "#6366f1" }} onClick={handleAddYear} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} /> Add Year</>}
          </button>
        </Modal>
      )}



      {modal === "subjects" && (
        <Modal title="Add Subject" onClose={() => setModal(null)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Semester <span style={styles.req}>*</span></label>
            <select style={styles.input} value={subForm.semesterId} onChange={e => setSubForm(p => ({ ...p, semesterId: e.target.value }))}>
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject Name <span style={styles.req}>*</span></label>
            <input style={styles.input} placeholder="e.g. Data Structures" value={subForm.subjectName}
              onChange={e => setSubForm(p => ({ ...p, subjectName: e.target.value }))} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject Code</label>
            <input style={styles.input} placeholder="e.g. CS201" value={subForm.subjectCode}
              onChange={e => setSubForm(p => ({ ...p, subjectCode: e.target.value }))} />
          </div>
          <button style={{ ...styles.submitBtn, background: "#10b981" }} onClick={handleAddSubject} disabled={loading}>
            {loading ? <Loader2 size={16} /> : <><Plus size={16} /> Add Subject</>}
          </button>
        </Modal>
      )}

      {modal === "units" && (
        <Modal title="Add Unit" onClose={() => setModal(null)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject <span style={styles.req}>*</span></label>
            <select style={styles.input} value={unitForm.subjectId} onChange={e => setUnitForm(p => ({ ...p, subjectId: e.target.value }))}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.subjectId} value={s.subjectId}>{s.subjectName} ({s.subjectCode})</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Unit Number <span style={styles.req}>*</span></label>
            <input style={styles.input} type="number" placeholder="e.g. 1" value={unitForm.unitNumber}
              onChange={e => setUnitForm(p => ({ ...p, unitNumber: e.target.value }))} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Unit Name <span style={styles.req}>*</span></label>
            <input style={styles.input} placeholder="e.g. Arrays and Strings" value={unitForm.unitName}
              onChange={e => setUnitForm(p => ({ ...p, unitName: e.target.value }))} />
          </div>
          <button style={{ ...styles.submitBtn, background: "#f59e0b" }} onClick={handleAddUnit} disabled={loading}>
            {loading ? <Loader2 size={16} /> : <><Plus size={16} /> Add Unit</>}
          </button>
        </Modal>
      )}

      {modal === "topics" && (
        <Modal title="Add Topic" onClose={() => setModal(null)}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Unit <span style={styles.req}>*</span></label>
            <select style={styles.input} value={topicForm.unitId} onChange={e => setTopicForm(p => ({ ...p, unitId: e.target.value }))}>
              <option value="">Select Unit</option>
              {units.map(u => <option key={u.unitId} value={u.unitId}>{getSubName(u.subjectId)} — {u.unitName}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Topic Number <span style={styles.req}>*</span></label>
            <input style={styles.input} type="number" placeholder="e.g. 1" value={topicForm.topicNumber}
              onChange={e => setTopicForm(p => ({ ...p, topicNumber: e.target.value }))} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Topic Name <span style={styles.req}>*</span></label>
            <input style={styles.input} placeholder="e.g. Binary Search Trees" value={topicForm.topicName}
              onChange={e => setTopicForm(p => ({ ...p, topicName: e.target.value }))} />
          </div>
          <button style={{ ...styles.submitBtn, background: "#ec4899" }} onClick={handleAddTopic} disabled={loading}>
            {loading ? <Loader2 size={16} /> : <><Plus size={16} /> Add Topic</>}
          </button>
        </Modal>
      )}

    </div>
  );
}

// ─── Inline Styles ────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f0f4ff", fontFamily: "'Inter', system-ui, sans-serif" },

  // Header
  header: { background: "linear-gradient(135deg, #12305b 0%, #1e4a8a 100%)", padding: "32px 0 0 0", boxShadow: "0 4px 24px rgba(18,48,91,0.18)" },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  headerIcon: { width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" },
  headerTitle: { margin: 0, fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5 },
  headerSub: { margin: "4px 0 0", fontSize: 14, color: "rgba(255,255,255,0.65)" },
  addBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.2)", transition: "all 0.2s" },

  // Tabs
  tabBar: { background: "#fff", borderBottom: "2px solid #e2e8f0", display: "flex", gap: 0, maxWidth: "100%", overflowX: "auto", padding: "0 32px" },
  tab: { display: "flex", alignItems: "center", gap: 8, padding: "16px 22px", border: "none", background: "none", fontSize: 14, fontWeight: 600, color: "#64748b", cursor: "pointer", borderBottom: "3px solid transparent", marginBottom: -2, transition: "all 0.2s", whiteSpace: "nowrap", position: "relative" },
  tabActive: { fontWeight: 700, borderBottomWidth: 3, borderBottomStyle: "solid" },
  tabDot: { position: "absolute", bottom: 6, right: 8, width: 6, height: 6, borderRadius: "50%" },

  // Content
  content: { maxWidth: 1200, margin: "0 auto", padding: "28px 32px" },

  // Stats
  statsRow: { display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" },
  statCard: { flex: "1 1 160px", background: "#fff", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1.5px solid #e2e8f0", transition: "all 0.2s" },
  statIcon: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  statCount: { fontSize: 26, fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 3 },

  // Table card
  tableCard: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1.5px solid #e2e8f0", overflow: "hidden" },
  tableHeader: { padding: "20px 24px", borderBottom: "1.5px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  tableTitle: { fontSize: 16, fontWeight: 700, color: "#12305b" },
  tableBadge: { padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 },
  tableBody: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" as const },
  th: { padding: "12px 20px", background: "#f8fafc", textAlign: "left" as const, fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: 0.5 },
  tr: { borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" },
  td: { padding: "14px 20px", fontSize: 14, color: "#1e293b", verticalAlign: "middle" as const },
  emptyCell: { padding: "48px 20px", textAlign: "center" as const, color: "#94a3b8", fontSize: 14 },

  // Badges
  idBadge: { background: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 },
  parentChip: { background: "#eff6ff", color: "#2563eb", padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600 },
  numBadge: { background: "#f0fdf4", color: "#16a34a", padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700 },
  nameCell: { display: "flex", alignItems: "center", gap: 8, fontWeight: 600 },
  deleteBtn: { background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s" },

  // Modal
  modalOverlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" },
  modalBox: { background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: "1.5px solid #e2e8f0" },
  modalTitle: { fontSize: 17, fontWeight: 800, color: "#12305b" },
  modalClose: { background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#64748b" },
  modalBody: { padding: 24, display: "flex", flexDirection: "column" as const, gap: 18 },

  // Form
  formGroup: { display: "flex", flexDirection: "column" as const, gap: 6 },
  label: { fontSize: 13, fontWeight: 700, color: "#334155" },
  req: { color: "#ef4444" },
  input: { padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#1e293b", background: "#f8fafc", outline: "none", fontFamily: "inherit" },
  submitBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" },
};
