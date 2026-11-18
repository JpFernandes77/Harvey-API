import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, ClipboardList, Sparkles, Star, Target } from "lucide-react";
import { ideas } from "@/lib/ideas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fábrica de Ideias – SENAI Limeira" },
      { name: "description", content: "Sua ideia + IA = pontos extras. Envie melhorias para o SENAI Limeira." },
      { property: "og:title", content: "Fábrica de Ideias – SENAI Limeira" },
      { property: "og:description", content: "Sua ideia + IA = pontos extras. Envie melhorias para o SENAI Limeira." },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: ClipboardList, t: "Preencha o formulário", d: "Descreva sua ideia, a condição atual e os benefícios esperados." },
  { icon: Bot, t: "Aprimore com IA", d: "Use o assistente para estruturar e fortalecer sua proposta." },
  { icon: Target, t: "Atinja 70% de score", d: "Ajuste os pontos indicados até alcançar a pontuação mínima." },
  { icon: Star, t: "Ganhe +50 pontos", d: "Ideias válidas recebem pontos extras e concorrem a prêmios." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Campanha 2026
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Sua ideia <span className="text-primary">+</span> IA
              <span className="mt-3 block w-fit rounded-xl bg-primary px-4 py-1 text-primary-foreground">= Pontos extras!</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-secondary-foreground/70">
              Proponha melhorias para as oficinas, laboratórios e processos do SENAI Limeira. Construa sua ideia com apoio de inteligência artificial e some pontos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cadastrar" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
                Cadastrar ideia <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/feed" className="inline-flex items-center rounded-md border border-sidebar-border px-6 py-3.5 font-semibold transition-colors hover:bg-sidebar-accent">
                Ver feed de ideias
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-primary shadow-glow" />
            <div className="absolute inset-5 grid place-items-center rounded-full border-4 border-dashed border-primary-foreground/25 text-center text-primary-foreground">
              <div>
                <div className="font-display text-8xl leading-none">+50</div>
                <div className="mt-2 text-sm font-bold uppercase tracking-[0.3em]">pontos extras</div>
              </div>
            </div>
          </div>
        </div>
        <div className="stripes h-2" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Como funciona</p>
        <h2 className="mt-2 font-display text-3xl">Quatro etapas até o reconhecimento</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <s.icon className="h-8 w-8" strokeWidth={1.5} />
                <span className="font-display text-3xl text-primary">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[["128", "ideias enviadas"], ["42", "em análise"], ["17", "implementadas"], ["6.400", "pontos distribuídos"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl">{n}</div>
              <div className="text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Ideias recentes</h2>
          <Link to="/feed" className="shrink-0 text-sm font-semibold underline decoration-primary decoration-2 underline-offset-4">Ver todas</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ideas.filter((i) => i.image).map((i) => (
            <Link to="/feed" key={i.id} className="group overflow-hidden rounded-xl border bg-card shadow-card">
              <img src={i.image} alt={i.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105" />
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i.category}</span>
                <h3 className="mt-1 font-bold">{i.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
