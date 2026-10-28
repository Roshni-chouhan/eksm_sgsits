
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  Trophy,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/tournament-approvals")({
  component: TournamentApprovalsPage,
});

type DemoTournament = {
  id: string;
  name: string;
  sport: string;
  registrationType: string;
  format: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  description: string;
  registrationOpens: string;
  registrationCloses: string;
  maxTeams: string;
  squadSize: string;
  playingSize: string;
  approvalStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
};

const STORAGE_KEY = "eksm_demo_tournaments";

function readDemoTournaments(): DemoTournament[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed as DemoTournament[];
  } catch {
    return [];
  }
}

function saveDemoTournaments(items: DemoTournament[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function formatDate(value?: string) {
  if (!value) return "Date not specified";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TournamentApprovalsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<DemoTournament[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("eksm_demo_role");

    if (role !== "superadmin") {
      void navigate({ to: "/demo" });
      return;
    }

    const stored = readDemoTournaments();
    const newest = stored
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      )
      .slice(0, 1);

    saveDemoTournaments(newest);
    setItems(newest);
  }, [navigate]);

  function updateItems(next: DemoTournament[]) {
    setItems(next);
    saveDemoTournaments(next);
  }

  function approveTournament(id: string) {
    updateItems(
      items.map((item) =>
        item.id === id
          ? { ...item, approvalStatus: "approved", rejectionReason: undefined }
          : item,
      ),
    );
    setRejectingId(null);
    setRejectionReason("");
  }

  function rejectTournament(id: string) {
    const reason = rejectionReason.trim();

    if (!reason) {
      window.alert("Please enter a reason for rejection.");
      return;
    }

    updateItems(
      items.map((item) =>
        item.id === id
          ? { ...item, approvalStatus: "rejected", rejectionReason: reason }
          : item,
      ),
    );
    setRejectingId(null);
    setRejectionReason("");
  }

  const pendingCount = items.filter((item) => item.approvalStatus === "pending").length;
  const approvedCount = items.filter((item) => item.approvalStatus === "approved").length;
  const rejectedCount = items.filter((item) => item.approvalStatus === "rejected").length;
  const visibleItems = items.filter((item) =>
    filter === "all" ? true : item.approvalStatus === filter,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-950">
              <ClipboardCheck size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Tournament Approvals
            </h1>
            <p className="mt-2 text-slate-600">
              Review tournament submissions from the Core Team.
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demo mode only. Actions update browser session storage, not Supabase.
          Only one demo submission is retained.
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Pending review" value={pendingCount} icon={<ClipboardCheck size={22} />} />
          <StatCard label="Approved" value={approvedCount} icon={<CheckCircle2 size={22} />} />
          <StatCard label="Rejected" value={rejectedCount} icon={<XCircle size={22} />} />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Submitted tournaments</h2>
            <p className="mt-1 text-sm text-slate-500">{items.length} submission(s)</p>
          </div>
          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value as "all" | "pending" | "approved" | "rejected")
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-rose-900"
          >
            <option value="pending">Pending review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All submissions</option>
          </select>
        </div>

        {visibleItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Trophy className="mx-auto mb-4 text-slate-300" size={42} />
            <h3 className="text-lg font-bold text-slate-900">No tournaments here</h3>
            <p className="mt-2 text-sm text-slate-500">
              Submit a tournament through the Sports Core Team demo workspace.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {visibleItems.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-950">
                      <Trophy size={23} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.sport} · {item.format} · {item.registrationType} tournament
                      </p>
                    </div>
                  </div>
                  <StatusPill status={item.approvalStatus} />
                </div>

                <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                  <p className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 shrink-0" size={18} />
                    <span>
                      {formatDate(item.startDate)} – {formatDate(item.endDate)}
                      <br />
                      {item.startTime || "Time not specified"} – {item.endTime || "Time not specified"}
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 shrink-0" size={18} />
                    <span>{item.venue || "Venue not specified"}</span>
                  </p>
                </div>

                {item.description && (
                  <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                )}

                <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
                  {item.registrationType === "team" ? (
                    <>Maximum teams: {item.maxTeams || "—"} · Squad size: {item.squadSize || "—"} · Playing size: {item.playingSize || "—"}</>
                  ) : (
                    <>Maximum participants: {item.maxTeams || "—"}</>
                  )}
                </div>

                {item.approvalStatus === "rejected" && item.rejectionReason && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <strong>Rejection reason:</strong> {item.rejectionReason}
                  </div>
                )}

                {item.approvalStatus === "pending" && (
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    {rejectingId === item.id ? (
                      <div className="space-y-3">
                        <label htmlFor={`reason-${item.id}`} className="block text-sm font-semibold text-slate-700">
                          Reason for rejection
                        </label>
                        <textarea
                          id={`reason-${item.id}`}
                          value={rejectionReason}
                          onChange={(event) => setRejectionReason(event.target.value)}
                          rows={3}
                          placeholder="Explain why this tournament is rejected..."
                          className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-rose-900"
                        />
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => rejectTournament(item.id)}
                            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
                          >
                            Confirm rejection
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRejectingId(null);
                              setRejectionReason("");
                            }}
                            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => approveTournament(item.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                        >
                          <CheckCircle2 size={19} /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRejectingId(item.id);
                            setRejectionReason("");
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-red-300 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={19} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="text-rose-950">{icon}</span>
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: DemoTournament["approvalStatus"] }) {
  const styles = {
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rejected: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <span className={`rounded-full border px-4 py-1.5 text-xs font-bold capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
