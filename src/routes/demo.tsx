
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  Trophy,
  Users,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Explore Demo — EKSM SGSITS" },
      {
        name: "description",
        content:
          "Explore sample EKSM SGSITS dashboards by role without creating an account.",
      },
    ],
  }),
  component: ExploreDemoPage,
});

type DemoRole = "Player" | "core_team" | "sports_head" | "superadmin";

const roleOptions: {
  id: DemoRole;
  title: string;
  description: string;
  icon: typeof Trophy;
  tag: string;
  accent: string;
}[] = [
  {
    id: "Player",
    title: "Player",
    description: "Explore tournaments, registrations and your sports profile.",
    icon: Trophy,
    tag: "Athlete view",
    accent: "from-amber-500/20 to-orange-500/5",
  },
  {
    id: "core_team",
    title: "Sports Core Team",
    description: "Create tournaments and manage event operations.",
    icon: Users,
    tag: "Organizer view",
    accent: "from-blue-500/20 to-indigo-500/5",
  },
  {
    id: "sports_head",
    title: "Institute Sports Committee",
    description: "Preview committee operations and role requests.",
    icon: GraduationCap,
    tag: "Committee view",
    accent: "from-emerald-500/20 to-teal-500/5",
  },
  {
    id: "superadmin",
    title: "Super Admin",
    description: "Review tournament submissions and system overview.",
    icon: ShieldCheck,
    tag: "Administration view",
    accent: "from-violet-500/20 to-fuchsia-500/5",
  },
];

const roleLabels: Record<DemoRole, string> = {
  Player: "Player",
  core_team: "Sports Core Team",
  sports_head: "Institute Sports Committee",
  superadmin: "Super Admin",
};

const dashboardData: Record<
  DemoRole,
  {
    greeting: string;
    subtitle: string;
    stats: {
      label: string;
      value: string;
      note: string;
      icon: typeof Trophy;
    }[];
    tasks: { title: string; detail: string; state: string }[];
  }
> = {
  Player: {
    greeting: "Your sports hub",
    subtitle: "A sample view of the player experience.",
    stats: [
      { label: "Available tournaments", value: "06", note: "Sample data", icon: Trophy },
      { label: "My registrations", value: "02", note: "Demo entries", icon: ClipboardList },
      { label: "Achievements", value: "04", note: "Illustrative only", icon: BadgeCheck },
    ],
    tasks: [
      { title: "Varchasva Cricket Championship", detail: "Team event · Main Cricket Ground", state: "Registration open (demo)" },
      { title: "Inter-Branch Badminton", detail: "Individual event · Indoor Sports Hall", state: "Coming soon (demo)" },
      { title: "Complete your player profile", detail: "Add branch, year and sports interests", state: "Suggested action" },
    ],
  },
  core_team: {
    greeting: "Tournament operations",
    subtitle: "Create and submit tournaments for Super Admin review.",
    stats: [
      { label: "Draft tournaments", value: "01", note: "Demo workflow", icon: Trophy },
      { label: "Team entries", value: "12", note: "Illustrative count", icon: Users },
      { label: "Upcoming fixtures", value: "08", note: "Demo schedule", icon: CalendarDays },
    ],
    tasks: [
      { title: "Create a tournament", detail: "Submit it for Super Admin approval", state: "Core Team action" },
      { title: "Review registration entries", detail: "Preview roster and participant lists", state: "Sample workflow" },
      { title: "Prepare match fixtures", detail: "Set dates, venue and playing format", state: "Demo action only" },
    ],
  },
  sports_head: {
    greeting: "Sports committee overview",
    subtitle: "A sample view of committee operations and role requests.",
    stats: [
      { label: "Pending role requests", value: "05", note: "Sample data", icon: ClipboardList },
      { label: "Active sports", value: "09", note: "Reference data", icon: Trophy },
      { label: "Upcoming events", value: "04", note: "Demo schedule", icon: CalendarDays },
    ],
    tasks: [
      { title: "Core Team access requests", detail: "Preview designation requests", state: "Sample requests" },
      { title: "Sports calendar", detail: "Review the upcoming tournament schedule", state: "Demo data" },
      { title: "Facilities overview", detail: "Preview campus sports facilities", state: "Read-only preview" },
    ],
  },
  superadmin: {
    greeting: "Administration overview",
    subtitle: "Review submitted tournaments and manage demo approvals.",
    stats: [
      { label: "Tournament reviews", value: "Pending", note: "Open the review queue", icon: ClipboardList },
      { label: "Approved events", value: "Demo", note: "Illustrative only", icon: CheckCircle2 },
      { label: "Registered members", value: "248", note: "Fictional demo count", icon: Users },
    ],
    tasks: [
      { title: "Review a tournament", detail: "Approve or reject pending submissions", state: "Super Admin action" },
      { title: "System overview", detail: "Preview sample member and event counts", state: "Illustrative only" },
      { title: "Access and security", detail: "Real permissions require Supabase policies", state: "Demo only" },
    ],
  },
};

function ExploreDemoPage() {
  const [selectedRole, setSelectedRole] = useState<DemoRole | null>(null);
  const selected = selectedRole ? dashboardData[selectedRole] : null;

  function chooseRole(role: DemoRole) {
    sessionStorage.setItem("eksm_demo_role", role);
    setSelectedRole(role);
  }

  function exitDemo() {
    sessionStorage.removeItem("eksm_demo_role");
    setSelectedRole(null);
  }

  return (
    <div className="min-h-[75vh] bg-background">
      <section className="relative isolate overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(245,190,70,0.24),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_45%)]" />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold tracking-wide">
            <FlaskConical className="h-4 w-4 text-amber-300" />
            INTERACTIVE PREVIEW
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Explore EKSM without signing in.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/75 sm:text-base">
            Choose a role to preview its dashboard using sample data. No account,
            password or Supabase session is created.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-200/30 bg-amber-200/10 px-3 py-2 text-xs text-amber-100 sm:text-sm">
            <LockKeyhole className="h-4 w-4 shrink-0" />
            Demo only — actions do not change real accounts or Supabase records.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        {!selectedRole ? (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Select a workspace
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Which role would you like to explore?
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">4 demo views</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {roleOptions.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => chooseRole(role.id)}
                    className="group rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:p-6"
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${role.accent}`}>
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {role.tag}
                        </span>
                        <h3 className="mt-1 text-lg font-bold">{role.title}</h3>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {role.description}
                    </p>
                    <div className="mt-5 text-sm font-semibold text-primary">
                      Explore this role
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              <UserRound className="h-5 w-5 shrink-0" />
              Want to create a real account instead?
              <Link to="/auth" className="font-semibold text-primary underline underline-offset-4">
                Sign in or register
              </Link>
            </div>
          </>
        ) : selected ? (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <button
                  type="button"
                  onClick={exitDemo}
                  className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change demo role
                </button>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {roleLabels[selectedRole]} · demo workspace
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{selected.greeting}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{selected.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={exitDemo}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Exit demo view
              </button>
            </div>

            <div className="mb-6 rounded-xl border border-amber-300/50 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
              <div className="flex items-start gap-2">
                <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />
                <p><strong>Demo workspace.</strong> Figures are illustrative. This selection does not grant real permissions.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selected.stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-4 text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Workspace preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Sample tasks for {roleLabels[selectedRole]}
                  </p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {selected.tasks.map((task) => (
                  <div key={task.title} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{task.detail}</p>
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {task.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {selectedRole === "core_team" && (
                <Link
                  to="/create-tournament"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Trophy className="h-4 w-4" />
                  Create Tournament
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              {selectedRole === "superadmin" && (
                <Link
                  to="/tournament-approvals"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <ClipboardList className="h-4 w-4" />
                  Review Tournament Submissions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                to="/tournaments"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
              >
                Browse Tournaments
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
