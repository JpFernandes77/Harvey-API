import { createServerFn } from "@tanstack/react-start";

export const analisarIdeia = createServerFn({ method: "POST" })
  .inputValidator((input: { titulo: string; descricao: string }) => ({
    titulo: String(input.titulo ?? "").slice(0, 200),
    descricao: String(input.descricao ?? "").slice(0, 4000),
  }))
  .handler(async ({ data }) => {
    // 1. Mudamos para buscar a chave do OpenRouter
    const key = process.env["OPENROUTER_API_KEY"];
    if (!key) return { ok: false as const, texto: "Chave do OpenRouter não configurada." };
    
    const prompt = `Você é um avaliador de ideias de melhoria do SENAI Limeira. Analise a ideia abaixo em português, de forma curta (máx. 120 palavras), com: 1) nota de 0 a 10, 2) pontos fortes, 3) uma sugestão para melhorar o texto.\n\nTítulo: ${data.titulo}\nDescrição: ${data.descricao}`;
    
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions", // 2. Nova URL do OpenRouter
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${key}` // 3. Formato de autorização padrão
        },
        body: JSON.stringify({ 
          model: "openai/gpt-4o", 
          messages: [{ role: "user", content: prompt }] // 4. Formato de mensagens
        }),
      },
    );
    
    if (!res.ok) {
      if (res.status === 429) return { ok: false as const, texto: "Limite atingido. Tente em instantes." };
      return { ok: false as const, texto: `Erro na IA (${res.status}).` };
    }
    
    const json: any = await res.json();
    // 5. Novo caminho para extrair o texto da resposta
    const texto = json?.choices?.[0]?.message?.content ?? "Sem resposta.";
    
    return { ok: true as const, texto };
  });