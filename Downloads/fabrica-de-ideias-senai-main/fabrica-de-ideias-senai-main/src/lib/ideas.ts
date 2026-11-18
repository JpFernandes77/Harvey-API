import workshop from "@/assets/feed_oficina.jpg.asset.json";
import corridor from "@/assets/feed_corredor.jpg.asset.json";
import tools from "@/assets/feed_ferramentas.jpg.asset.json";
import ergonomia from "@/assets/feed_ergonomia.jpg.asset.json";

export type Status = "Em triagem" | "Em análise" | "Aprovada" | "Implementada";

export interface Idea {
  id: number;
  author: string;
  course: string;
  category: string;
  status: Status;
  title: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  score: number;
  date: string;
}

export const categories = ["Segurança", "Sustentabilidade", "Melhoria de Processos", "Ergonomia", "Infraestrutura"];

export const ideas: Idea[] = [
  {
    id: 1044, author: "Larissa Mendes", course: "Técnico em Mecatrônica", category: "Segurança",
    status: "Em análise", title: "Faixas de circulação na oficina de usinagem",
    text: "Repintar e ampliar as faixas amarelas de circulação entre os centros de usinagem, criando uma rota segura para visitantes e alunos que transitam com materiais.",
    image: workshop.url, likes: 38, comments: 12, score: 86, date: "há 2 horas",
  },
  {
    id: 1043, author: "Rafael Oliveira", course: "Técnico em Eletrotécnica", category: "Sustentabilidade",
    status: "Em triagem", title: "Sensores de presença nos corredores",
    text: "As luzes dos corredores ficam acesas durante toda a noite. A proposta é instalar sensores de movimento para que as lâmpadas desliguem quando não houver ninguém.",
    image: corridor.url, likes: 54, comments: 9, score: 78, date: "há 5 horas",
  },
  {
    id: 1041, author: "Beatriz Santos", course: "Aprendizagem em Manutenção", category: "Melhoria de Processos",
    status: "Implementada", title: "Quadro de sombras para ferramentas",
    text: "Painel com contorno de cada ferramenta no laboratório de manutenção. Facilita a conferência no fim da aula e reduz perdas.",
    image: tools.url, likes: 91, comments: 23, score: 94, date: "ontem",
  },
  {
    id: 1039, author: "Diego Carvalho", course: "Técnico em Logística", category: "Ergonomia",
    status: "Aprovada", title: "Bancadas com altura regulável",
    text: "Substituir duas bancadas do laboratório de montagem por modelos reguláveis, reduzindo desconforto nas costas durante práticas longas.",
    image: ergonomia.url, likes: 27, comments: 6, score: 81, date: "há 2 dias",
  },
];

export const statusStyle: Record<Status, string> = {
  "Em triagem": "bg-accent text-accent-foreground",
  "Em análise": "bg-info/10 text-info",
  Aprovada: "bg-success/10 text-success",
  Implementada: "bg-secondary text-primary",
};
