import { Link } from "@tanstack/react-router";
import { Lightbulb, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/feed", label: "Feed de ideias" },
  { to: "/cadastrar", label: "Cadastrar ideia" },
] as const;

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <Lightbulb className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="min-w-0 leading-none">
        <span className={`block font-display text-base tracking-tight ${inverted ? "text-secondary-foreground" : "text-foreground"}`}>
          Fábrica de Ideias
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">SENAI Limeira</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-sidebar-border bg-secondary">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo inverted />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              activeProps={{ className: "bg-sidebar-accent !text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/cadastrar" className="hidden rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 md:inline-flex">
          Enviar ideia
        </Link>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-secondary-foreground md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-sidebar-border px-4 pb-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="block rounded-md px-3 py-3 text-sm font-medium text-secondary-foreground/80"
              activeProps={{ className: "!text-primary bg-sidebar-accent" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
      <div className="stripes h-1" />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo inverted />
        <p className="text-xs text-secondary-foreground/60">
          Protótipo acadêmico apresentado em sala de aula · Dados fictícios · Uso não oficial
        </p>
      </div>
    </footer>
  );
}
