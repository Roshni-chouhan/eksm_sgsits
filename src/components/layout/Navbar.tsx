
import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Search,
  Bell,
  UserRound,
  Menu,
  X,
  CalendarDays,
  Trophy,
  Users,
  Handshake,
  Camera,
  MapPinned,
  Building2,
  ChevronDown,
  Volleyball,
  Info,
} from "lucide-react";

type NavLink = {
  label: string;
  to: string;
  icon?: typeof Trophy;
};

type NavGroup = {
  label: string;
  items: NavLink[];
};

const navigation: (NavLink | NavGroup)[] = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },

  {
    label: "Sports",
    items: [
      { label: "All Sports", to: "/sports", icon: Volleyball },
      { label: "Schedule", to: "/schedule", icon: CalendarDays },
      { label: "Calendar", to: "/calendar", icon: CalendarDays },
    ],
  },

  {
    label: "Tournaments",
    items: [
      { label: "All Tournaments", to: "/tournaments", icon: Trophy },
      { label: "Teams", to: "/teams", icon: Users },
    ],
  },

  { label: "Athletes", to: "/athletes" },

  {
    label: "Other",
    items: [
      {
        label: "Facilities",
        to: "/facilities",
        icon: Building2,
      },
      { label: "Campus Map", to: "/campus-map", icon: MapPinned },
      { label: "Gallery", to: "/gallery", icon: Camera },
      { label: "Sponsors", to: "/sponsors", icon: Handshake },
      { label: "About", to: "/about", icon: Info },
    ],
  },
];

function isGroup(item: NavLink | NavGroup): item is NavGroup {
  return "items" in item;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);

  const location = useLocation();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const groupIsActive = (group: NavGroup) =>
    group.items.some((item) => isActive(item.to));

  const closeMenus = () => {
    setMobileOpen(false);
    setMobileGroup(null);
    setDesktopGroup(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={closeMenus}
        >
          <img
            src="/favicon.png"
            alt="Khel Sankalp"
            className="h-12 w-12 object-contain"
          />

          <div className="hidden sm:block">
            <div className="font-display text-xl font-bold leading-none text-primary">
              KhelSankalp
            </div>
            <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
              SGSITS INDORE
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navigation.map((item) => {
            if (!isGroup(item)) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenus}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive(item.to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const active = groupIsActive(item);
            const open = desktopGroup === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseLeave={() => setDesktopGroup(null)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() =>
                    setDesktopGroup(open ? null : item.label)
                  }
                  onMouseEnter={() => setDesktopGroup(item.label)}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {item.label}

                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute left-0 top-full z-50 mt-2 min-w-52 rounded-xl border border-border bg-background p-2 shadow-xl">
                    {item.items.map((child) => {
                      const Icon = child.icon;

                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={closeMenus}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                            isActive(child.to)
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted hover:text-primary"
                          }`}
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" />}
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-2 xl:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <Link
            to="/auth"
            className="ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <UserRound className="h-4 w-4" />
            Sign in / Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl text-primary hover:bg-muted xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 xl:hidden">
          <nav className="grid gap-1 sm:grid-cols-2">
            {navigation.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenus}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive(item.to)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const open = mobileGroup === item.label;

              return (
                <div key={item.label} className="min-w-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setMobileGroup(open ? null : item.label)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                      groupIsActive(item)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="ml-3 mt-1 grid gap-1 border-l border-border pl-2">
                      {item.items.map((child) => {
                        const Icon = child.icon;

                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeMenus}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                              isActive(child.to)
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-primary"
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              to="/auth"
              onClick={closeMenus}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:col-span-2"
            >
              <UserRound className="h-4 w-4" />
              Sign in / Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
