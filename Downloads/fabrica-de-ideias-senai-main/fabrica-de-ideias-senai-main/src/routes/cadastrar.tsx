import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Paperclip, Sparkles, UploadCloud } from "lucide-react";
import { useState, type ReactNode } from "react";
import { categories } from "@/lib/ideas";
import { useServerFn } from "@tanstack/react-start";
import { analisarIdeia } from "@/lib/ai.functions";

export const Route = createFileRoute("/cadastrar")({
  head: () => ({
    meta: [
      { title: "Cadastrar ideia – Fábrica de Ideias SENAI Limeira" },
      { name: "description", content: "Envie sua proposta de melhoria para a Fábrica de Ideias do SENAI Limeira." },
      { property: "og:title", content: "Cadastrar ideia – Fábrica de Ideias" },
      { property: "og:description", content: "Envie sua proposta de melhoria para a Fábrica de Ideias do SENAI Limeira." },
    ],
  }),
  component: Cadastro,
});

const field = "w-full rounded-md border border-input bg-card px-3.5 py-3 text-sm outline-none transition placeholder:italic placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20";

function Field({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider">{label} *</span>
      <span className="mb-2 mt-0.5 block text-sm text-muted-foreground">{hint}</span>
      {children}
    </label>
  );
}

function Cadastro() {
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const analisar = useServerFn(analisarIdeia);
  const pedirIA = async () => {
    setAiLoading(true); setAiText("");
    try { const r = await analisar({ data: { titulo, descricao } }); setAiText(r.texto); }
    catch { setAiText("Não foi possível falar com a IA agora."); }
    finally { setAiLoading(false); }
  };

  if (sent)
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-4 font-display text-3xl">Ideia enviada!</h1>
        <p className="mt-2 text-muted-foreground">Sua proposta entrou em triagem. (Demonstração — nada foi salvo.)</p>
        <button onClick={() => setSent(false)} className="mt-6 rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground">Cadastrar outra</button>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Nova proposta</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Cadastrar ideia</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-7 rounded-xl border bg-card p-5 shadow-card sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_220px]">
            <Field label="Título" hint="Um nome curto e objetivo para a sua ideia.">
              <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} className={field} placeholder="Ex.: Sensores de presença nos corredores" />
            </Field>
            <Field label="Categoria" hint="Tema principal.">
              <select required className={field} defaultValue="">
                <option value="" disabled>Selecione</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Descrição da melhoria" hint="Descreva em detalhes a proposta de melhoria ou iniciativas que tragam soluções para o problema apresentado.">
            <textarea required rows={4} value={descricao} onChange={(e) => setDescricao(e.target.value)} className={field} placeholder="Insira os detalhes da sua proposta" />
          </Field>
          <Field label="Condição atual" hint="Descreva o cenário atual de forma clara e objetiva e os impactos que esse problema traz para a rotina, área ou processo.">
            <textarea required rows={4} className={field} placeholder="Insira os impactos da situação atual" />
          </Field>
          <Field label="Benefícios da ideia" hint="Como sua ideia facilita ou melhora alguma atividade, com foco em resultados concretos e mensuráveis.">
            <textarea required rows={4} className={field} placeholder="Insira o texto da resposta" />
          </Field>
          <Field label="Aplicação em outras áreas" hint="Essa ideia pode ser replicada em outros laboratórios, cursos ou setores? Quais?">
            <textarea required rows={3} className={field} placeholder="Ex.: pode ser aplicada também no bloco administrativo" />
          </Field>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider">Anexos</span>
            <span className="mb-2 mt-0.5 block text-sm text-muted-foreground">Fotos, desenhos ou documentos que ajudem a explicar a ideia.</span>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-muted/50 px-4 py-10 text-center transition hover:border-primary hover:bg-accent">
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-semibold">Clique para anexar arquivos</span>
              <span className="text-xs text-muted-foreground">JPG, PNG ou PDF · até 10 MB</span>
              <input type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
            </label>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {files.map((f) => <li key={f} className="flex items-center gap-2 truncate text-sm"><Paperclip className="h-4 w-4 shrink-0" />{f}</li>)}
              </ul>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <button type="button" className="rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">Salvar rascunho</button>
            <button type="submit" className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">Enviar ideia</button>
          </div>
        </form>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-secondary p-6 text-secondary-foreground">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-bold">Assistente de IA</h3>
            <p className="mt-1 text-sm text-secondary-foreground/70">Preencha o título e a descrição e receba uma avaliação do OpenAI com nota e sugestões.</p>
            <button type="button" onClick={pedirIA} disabled={aiLoading || descricao.trim().length < 10} className="mt-5 w-full rounded-md bg-primary py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-40">{aiLoading ? "Analisando..." : "Analisar com IA"}</button>
            {aiText && <p className="mt-4 whitespace-pre-wrap rounded-md bg-background/10 p-3 text-sm">{aiText}</p>}
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="font-bold">Dicas para um bom score</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Seja específico sobre o local e o problema.</li>
              <li>• Use números: tempo, custo, ocorrências.</li>
              <li>• Anexe uma foto da situação atual.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
