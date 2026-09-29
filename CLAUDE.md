# MS Climatização (pt-climatizacao-ms)

- Mercado: PT (pt-PT) | Nicho: Climatização e Ar Condicionado (docs/nichos.md)
- Zona de atuação confirmada: Algarve, com atuação específica em Quarteira.
- Objetivo do site: gerar mensagem no WhatsApp e ligação. Sem formulário.
- Tipo: landing de 1 página.

## Direção visual: "Precisão Técnica"
Fundo grafite quase preto (#14181A) em todo o site (nunca alterna com um
fundo claro), azul aço (#9FC1D1) para anotações e rótulos, e âmbar de
sinalização (#E8A33D) reservado ao botão/CTA (nunca como texto corrido).
Tipografia JetBrains Mono (rótulos: eyebrow, índices numerados, anotações
do diagrama, cssVariable `--font-rotulo`) + Archivo (títulos, com peso 800,
e corpo, mesma família nas duas funções, `--font-titulo` é um alias CSS de
`--font-corpo` em `src/styles/global.css`). Herói em split de 2 colunas:
texto à esquerda, diagrama técnico linear de um ar condicionado (unidade
interior, filtro, fluxo de ar, unidade exterior, linhas de cota) à direita,
em `Hero.astro`. Elemento-assinatura: linhas de cota e anotação, estilo
desenho técnico (`.linha-cota` e `.linha-cota-h` em `src/styles/global.css`),
reaproveitado nos cartões de serviço numerados (`Servicos.astro`, variante
"numerada"), nunca ícone de floco de neve, sol genérico ou gradiente.
Direção anterior ("Sombra e cal") descontinuada; ver `previa-3-direcoes.html`
para as 3 direções comparadas antes da escolha do cliente.

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
