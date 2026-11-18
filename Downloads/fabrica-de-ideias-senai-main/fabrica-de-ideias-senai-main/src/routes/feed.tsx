import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Link2, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { categories, ideas, statusStyle } from "@/lib/ideas";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed de ideias – Fábrica de Ideias SENAI Limeira" },
      { name: "description", content: "Acompanhe as sugestões de melhoria enviadas por alunos do SENAI Limeira." },
      { property: "og:title", content: "Feed de ideias – Fábrica de Ideias" },
      { property: "og:description", content: "Acompanhe as sugestões de melhoria enviadas por alunos do SENAI Limeira." },
    ],
  }),
  component: Feed,
});

function initials(n: string) {
  return n.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function Feed() {
  const [cat, setCat] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const list = cat ? ideas.filter((i) => i.category === cat) : ideas;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary-foreground/70">Campanha em destaque · Contribua com suas ideias sobre</p>
            <h1 className="font-display text-4xl text-primary-foreground sm:text-5xl">Ergonomia</h1>
          </div>
          <Link to="/cadastrar" className="w-fit rounded-md bg-secondary px-5 py-3 text-sm font-bold text-primary">Enviar ideia</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-muted-foreground">Filtrar por</span>
            {[null, ...categories].map((c) => (
              <button key={c ?? "all"} onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${cat === c ? "border-secondary bg-secondary text-secondary-foreground" : "bg-card hover:border-foreground/30"}`}>
                {c ?? "Todas"}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {list.map((i) => (
              <article key={i.id} className="overflow-hidden rounded-xl border bg-card shadow-card">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">{initials(i.author)}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{i.author}</p>
                      <p className="truncate text-xs text-muted-foreground">#{i.id} em {i.category} · {i.date}</p>
                    </div>
                  </div>
                  <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusStyle[i.status]}`}>{i.status}</span>
                </div>
                <div className="px-5 pb-4">
                  <h2 className="text-lg font-bold">{i.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
                </div>
                {i.image && <img src={i.image} alt={i.title} loading="lazy" width={1024} height={768} className="aspect-video w-full bg-muted object-cover" />}
                <div className="flex items-center justify-between border-t px-3 py-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setLiked({ ...liked, [i.id]: !liked[i.id] })}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${liked[i.id] ? "text-accent-foreground" : ""}`}>
                      <ThumbsUp className={`h-4 w-4 ${liked[i.id] ? "fill-primary" : ""}`} /> {i.likes + (liked[i.id] ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"><MessageSquare className="h-4 w-4" /> {i.comments}</button>
                    <button aria-label="Compartilhar" className="rounded-md p-2 hover:bg-muted"><Share2 className="h-4 w-4" /></button>
                    <button aria-label="Salvar" className="rounded-md p-2 hover:bg-muted"><Bookmark className="h-4 w-4" /></button>
                    <button aria-label="Copiar link" className="hidden rounded-md p-2 hover:bg-muted sm:block"><Link2 className="h-4 w-4" /></button>
                  </div>
                  <span className="pr-2 text-xs font-semibold text-muted-foreground">Score IA <span className="text-foreground">{i.score}%</span></span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl bg-secondary p-6 text-secondary-foreground">
            <p className="font-display text-5xl text-primary">+50</p>
            <p className="mt-1 text-sm text-secondary-foreground/70">pontos para ideias com score de 70% ou mais.</p>
            <Link to="/cadastrar" className="mt-5 block rounded-md bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground">Cadastrar ideia</Link>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="font-bold">Ranking da semana</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {[["Beatriz Santos", 340], ["Rafael Oliveira", 280], ["Larissa Mendes", 250], ["Diego Carvalho", 190]].map(([n, p], idx) => (
                <li key={n} className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate"><span className="mr-2 font-display text-primary">{idx + 1}</span>{n}</span>
                  <span className="shrink-0 font-semibold">{p} pts</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
