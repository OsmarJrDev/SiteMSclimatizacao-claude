# Pendências de dados (MS Climatização)

Preencher assim que o cliente responder. Registrar a data da resposta aqui.

Data da resposta do cliente: [PREENCHER]

Este arquivo é interno (não faz parte do site) e lista exatamente o que cada
marcador pendente representa e onde fica em `src/data/site.ts`, para não
perder o controle depois de substituir os placeholders. Os campos abaixo são
os únicos com pendência real hoje. Para pendências que não são um placeholder
literal em `site.ts` (domínio definitivo, fotos originais, adesão formal à
entidade RAL, etc.), ver a seção "Pendências [PREENCHER]" em `CLAUDE.md`.

## Marcadores `[PREENCHER: ...]` (sem formato nacional fixo, texto livre)

- `nap.enderecoCurto` (linha ~26): morada (rua e número) de Quarteira.
- `nap.email` (linha ~29): e-mail profissional da MS Climatização.
- `legalPT.denominacao` (linha ~142): denominação social exata da empresa.
- `legalPT.moradaCompleta` (linha ~150): morada (rua e número), mesma
  informação de `nap.enderecoCurto`.
- `legalPT.registoComercial` (linha ~151): conservatória e número do
  registo comercial.
- `estatisticas[0].numero` (linha ~124): anos de experiência.
- `estatisticas[1].numero` (linha ~125): quantidade de instalações
  realizadas.
- `estatisticas[2].numero` (linha ~126): prazo de garantia oferecido.
- `faq[1].resposta` (linha ~178): periodicidade de manutenção recomendada
  pela MS Climatização (hoje o FAQ não afirma um número, e não deve afirmar
  até o cliente confirmar).

## Máscaras `XXX` (dado pessoal/legal com formato nacional português conhecido)

- `legalPT.nif` (linha ~146): NIF da empresa. Máscara `XXXXXXXXX` (9 dígitos
  seguidos, sem espaço nem traço, formato oficial português).
- `nap.enderecoCurto` (linha ~26) e `legalPT.moradaCompleta` (linha ~150):
  código postal de Quarteira. Máscara `XXXX-XXX` (4 dígitos, traço, 3
  dígitos, formato oficial português).

Essas duas máscaras são reconhecidas por `scripts/validar-conteudo.mjs`
exatamente como o marcador `[PREENCHER`: bloqueiam o build só quando
`DEPLOY_ALVO=producao` estiver definido; fora disso, aparecem como aviso.

## Arrays vazios/sem prova real (não são um placeholder de texto, mas também são pendência)

- `registrosProfissionaisPT` (linha ~139): vazio porque a certificação do
  instalador para gases fluorados ainda não foi confirmada. Não publicar um
  número de registo antes dessa confirmação.
- `depoimentos`, `numeros`, `credenciais`, `premios` (linhas ~108, ~112,
  ~115, ~117): vazios porque nenhum depoimento, número ou credencial real
  foi aprovado pelo cliente ainda. Cada item novo precisa de `fonte` e
  `aprovadoPeloCliente: true` (`scripts/validar-conteudo.mjs` cobra isso).
- `servicos[0]` e `servicos[1]` têm `confirmado: false` (linhas ~61 e ~80):
  a existência de cada serviço como oferta formal ainda é indício visual do
  Instagram/Facebook, não confirmação escrita do cliente. Isso é diferente
  do passo a passo de manutenção (`servicos[1].passos`, linha ~73), que já é
  fato confirmado por publicação real da empresa (ver comentário ao lado, em
  `site.ts`).
