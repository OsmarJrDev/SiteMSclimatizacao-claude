# MS Climatização (pt-climatizacao-ms)

- Mercado: PT (pt-PT) | Nicho: Climatização e Ar Condicionado (docs/nichos.md)
- Zona de atuação confirmada: Algarve, com atuação específica em Quarteira.
- Objetivo do site: gerar mensagem no WhatsApp e ligação. Sem formulário.
- Tipo: landing de 1 página.

## Direção visual: identidade real da marca (4ª tentativa, definitiva)
As 3 tentativas anteriores ("Sombra e cal", "Precisão Técnica" e as
descartadas "Ar Puro"/"Luz Algarvia") foram rejeitadas pelo cliente por
serem conceitos abstratos inventados, sem relação com a marca real; a
última ainda regrediu para um fundo escuro e teve um diagrama técnico
confuso ("parece placa de vídeo com varal"). Esta direção não inventa
conceito nenhum: parte do logo real do cliente
(`src/assets/logo-ms-climatizacao.png`, tratado para fundo transparente a
partir do arquivo original) e das cores extraídas por amostragem de pixel
dele (não são chute): fundo branco do logo, "MS" em preto, floco de neve
azul claro (~#9ED9EB) e sol em degradê pêssego->coral (~#FFD895 ->
~#FFAC8D). Site CLARO (fundo #FDFCFA, branco levemente quente), nunca mais
escuro. Ink escuro (#1A1A1A) para títulos e texto de botão, corpo de texto
em #2A2D30 (calibrado para continuar >= 4.5:1 mesmo com a opacidade
`text-texto/70` usada em vários parágrafos), azul do floco escurecido para
`#146378` (o tom claro original do logo não passaria AA sobre fundo claro)
e o degradê pêssego->coral reservado ao botão/CTA (`.botao-cta` em
`src/styles/global.css`), nunca como texto corrido nem fundo de bloco
grande. Tipografia mantida (Archivo + JetBrains Mono, não fazia parte da
crítica do cliente). Logo real usado de verdade no cabeçalho
(`Cabecalho.astro`, seção nova) e no rodapé (`RodapePT.astro`/
`RodapeBR.astro`), com `<Image />` e alt = nome comercial.

Herói em split de 2 colunas: texto à esquerda, ilustração simples de um
aparelho de ar condicionado soltando ar (sem nenhuma legenda/cota, ao
contrário da direção anterior) sobre um fundo em degradê frio/quente
(`.fundo-termico`) à direita, em `Hero.astro`. Elemento-assinatura: um fio
em degradê entre o azul do floco e o coral do sol (`.fio-termico` e
`.fio-termico-h` em `src/styles/global.css`), reaproveitado nos cartões de
serviço numerados (`Servicos.astro`, variante "numerada") — representa a
dualidade frio/quente do logo de forma abstrata, nunca um ícone literal de
floco de neve ou sol de desenho animado.

Botão de WhatsApp flutuante (`BotaoWhatsAppFlutuante.astro`) visível em
TODAS as larguras de tela (correção de uma falha real: antes só existia a
barra inferior `BarraMobile.astro`, escondida no desktop com `md:hidden`,
e o cliente notou a ausência de contacto rápido fixo no desktop). Usa o
verde oficial do WhatsApp (`--color-whatsapp`, não é cor de marca do
cliente), círculo no canto inferior direito, sempre visível ao rolar.

Ver `previa-3-direcoes.html` para as 3 direções comparadas antes da
escolha inicial do cliente (contexto histórico; a direção atual não faz
parte dessa prévia).

## Pendências [PREENCHER] e máscaras `XXX` (não inventar; confirmar com o cliente antes de publicar)
Lista detalhada, com a localização exata de cada marcador em
`src/data/site.ts`, em `PENDENCIAS.md` (data da resposta do cliente também
fica registrada lá). Resumo:
- E-mail profissional.
- Morada completa (sem formato fixo, `[PREENCHER`) e código postal de
  Quarteira (formato português conhecido, máscara `XXXX-XXX`).
- Horário de funcionamento (todos os dias marcados como não confirmados).
- Denominação social exata e registo comercial (`[PREENCHER`); NIF (formato
  português conhecido, máscara `XXXXXXXXX`).
- Lista exata de serviços (indício atual: instalação e manutenção/limpeza,
  a partir dos posts do Instagram/Facebook). O passo a passo da manutenção
  já é fato confirmado (post "Conheça nossos serviços", Instagram
  @msclimatizacaopt): ver `servicos[1].passos` em `site.ts`.
- Adesão formal a uma entidade RAL e link específico do Livro de Reclamações
  Eletrónico da empresa (hoje: link genérico do portal oficial).
- Certificação do instalador para gases fluorados (a confirmar antes de
  anunciar qualquer número de registo).
- Fotos originais em alta qualidade (só há capturas de ecrã do Instagram/
  Facebook, não usadas como imagem real no site).
- Depoimentos, números e credenciais reais (arrays vazios até aprovação).
- Domínio definitivo (astro.config.mjs e wrangler.jsonc usam placeholder).
- `public/favicon.ico`: regenerado com a marca "M" (era um PNG disfarçado
  de `.ico`, prática comum e aceita pelos navegadores atuais, mas não é um
  contêiner ICO "de verdade"; se algum dia isso importar, gerar um `.ico`
  multi-resolução de verdade com uma ferramenta dedicada).

## Fonte pesquisada
Entidade RAL com competência no distrito de Faro (inclui Loulé/Quarteira):
CIMAAL – Associação Centro de Informação, Mediação e Arbitragem de Conflitos
de Consumo do Algarve (consumoalgarve.pt), confirmada na base de dados
oficial da Comissão Europeia. Ver comentário em `src/data/site.ts`.
