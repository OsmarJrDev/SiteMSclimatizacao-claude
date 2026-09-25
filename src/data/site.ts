// FONTE UNICA DE DADOS DO CLIENTE.
// MS Climatização (Algarve, Portugal). Cliente REAL, site em preparação.
// Regra de ouro (CLAUDE.md secao 7): nenhum dado real pode ser inventado.
// Todo campo sem confirmação do cliente usa literalmente "[PREENCHER: ...]".
// Fatos confirmados (única fonte): nome, mercado, zona de atuação (Algarve,
// com atuação específica em Quarteira), WhatsApp/telefone, Instagram,
// pessoa autorizada a aparecer (Dione Ademir, dono/técnico), marca de
// ferramentas Berner (ferramenta usada nos trabalhos, NÃO a marca do
// equipamento de ar condicionado instalado). Tudo o mais é indício ou
// pendência, nunca fato.
import type { SiteData } from './site.schema';

export const site: SiteData = {
  demo: false,
  mercado: 'PT',
  nicho: 'Climatização e Ar Condicionado',
  schemaOrgTipo: 'HVACBusiness',

  nap: {
    nomeComercial: 'MS Climatização',
    // "Quarteira - Algarve" aqui aproveita de propósito o mesmo padrão que
    // src/lib/endereco.ts usa para o Brasil ("Cidade - UF"): a função
    // cidadeDoEndereco() procura um trecho com " - " e usa a parte antes do
    // traço como cidade do H1. Isso garante "Quarteira" (zona confirmada
    // pelo cliente) no título, sem inventar morada nem código postal.
    enderecoCurto: '[PREENCHER: morada completa e código postal], Quarteira - Algarve',
    telefone: '+351 936 996 145',
    whatsappDigitos: '351936996145',
    email: '[PREENCHER: e-mail profissional da MS Climatização]',
  },

  // Horário de funcionamento ainda não confirmado pelo cliente. Em vez de
  // inventar um horário plausível (proibido) ou marcar todos os dias como
  // "Fechado" (o que sugeriria uma empresa inativa, também enganoso), os
  // componentes de informações de contacto e o Hero detectam que todos os dias
  // estão com abertura/fechamento nulos e mostram um aviso
  // "[PREENCHER: horário de funcionamento]" em vez da tabela.
  horarios: [
    { dia: 'segunda', abertura: null, fechamento: null },
    { dia: 'terca', abertura: null, fechamento: null },
    { dia: 'quarta', abertura: null, fechamento: null },
    { dia: 'quinta', abertura: null, fechamento: null },
    { dia: 'sexta', abertura: null, fechamento: null },
    { dia: 'sabado', abertura: null, fechamento: null },
    { dia: 'domingo', abertura: null, fechamento: null },
  ],

  // Os dois serviços abaixo são um INDÍCIO visual das publicações no
  // Instagram/Facebook da empresa (instalação e manutenção/limpeza
  // aparecem nos posts), NÃO uma lista confirmada pelo cliente.
  // "confirmado: false" (campo próprio deste cliente, ver site.schema.ts)
  // faz Servicos.astro mostrar "(a confirmar)" ao lado de cada nome.
  servicos: [
    {
      slug: 'instalacao',
      nome: 'Instalação de ar condicionado',
      descricao:
        'Instalação de equipamento de climatização residencial ou comercial. Detalhes técnicos exatos (marcas trabalhadas, tipos de sistema) a confirmar com o cliente.',
      confirmado: false,
    },
    {
      slug: 'manutencao-limpeza',
      nome: 'Manutenção e limpeza',
      descricao:
        'Manutenção periódica e limpeza de aparelhos de ar condicionado, reduzindo falhas e problemas de qualidade do ar associados à falta de manutenção.',
      confirmado: false,
    },
  ],

  // Diferenciais reais e confirmáveis (não inventados): ligados a fatos já
  // aprovados (pessoa autorizada, marca de ferramentas, comportamento real
  // observado no Instagram). Nenhuma alegação de "melhor preço", "mais
  // rápido" ou número de clientes/anos, que não foram confirmados.
  diferenciais: [
    {
      titulo: 'Acompanhamento direto do técnico',
      descricao:
        'Os trabalhos de instalação e manutenção são acompanhados por Dione Ademir, responsável técnico da MS Climatização.',
    },
    {
      titulo: 'Ferramentas profissionais',
      descricao:
        'Equipamento profissional Berner utilizado nos trabalhos de instalação e manutenção.',
    },
    {
      titulo: 'Conteúdo educativo sobre climatização',
      descricao:
        'A MS Climatização partilha no Instagram (@msclimatizacaopt) esclarecimentos sobre mitos ligados a ar condicionado e saúde, além de dicas de manutenção.',
    },
  ],

  // Nenhum depoimento real aprovado ainda: a seção Depoimentos.astro
  // some sozinha do HTML quando este array está vazio.
  depoimentos: [],

  // Nenhum número real (clientes atendidos, anos de mercado, etc.) foi
  // confirmado. Não inventar para preencher o layout.
  numeros: [],

  // Nenhuma credencial (certificação, nota do Google, etc.) confirmada.
  credenciais: [],

  premios: [],

  // Sem registo profissional PT confirmado para exibir. A certificação
  // técnica para manuseio de gases fluorados (exigência comum a
  // instaladores de climatização na UE) é uma pendência de verificação,
  // não um dado a inventar (ver docs/nichos.md, nicho "Climatização e Ar
  // Condicionado", status_normativo).
  registrosProfissionaisPT: [],

  legalPT: {
    denominacao: '[PREENCHER: denominação social exata]',
    nif: '[PREENCHER: NIF]',
    moradaCompleta: '[PREENCHER: morada completa e código postal]',
    registoComercial: '[PREENCHER: registo comercial, conservatória e número]',
    // Pesquisado (WebSearch) e confirmado em fonte oficial: a base de dados
    // de entidades de resolução de litígios de consumo da Comissão Europeia
    // lista a entidade generalista com competência territorial no distrito
    // de Faro (inclui o concelho de Loulé, onde fica Quarteira). Fonte:
    // https://consumer-redress.ec.europa.eu/dispute-resolution-bodies/portugal-cimaal-associacao-centro-de-informacao-mediacao-e-arbitragem-de-conflitos-de-consumo-do_en
    // Ainda assim, o cliente deve confirmar se prefere aderir a esta
    // entidade ou a outra, e formalizar a adesão antes da publicação.
    entidadeRAL: {
      nome: 'CIMAAL – Associação Centro de Informação, Mediação e Arbitragem de Conflitos de Consumo do Algarve',
      site: 'https://consumoalgarve.pt/',
    },
    // Link genérico do portal oficial do Livro de Reclamações Eletrónico
    // (não o link específico da empresa, que só existe após o registo da
    // MS Climatização na plataforma). Ver pendência no relatório final.
    livroReclamacoesUrl: 'https://www.livroreclamacoes.pt/Inicio/',
  },

  faq: [
    {
      pergunta: 'O ar condicionado faz mal à saúde?',
      resposta:
        'O ar condicionado, por si só, não é prejudicial à saúde. Os problemas mais comuns (ar seco, cheiros, irritação respiratória) costumam estar ligados à falta de manutenção e limpeza dos filtros, não ao aparelho em funcionamento normal.',
    },
    {
      pergunta: 'Com que frequência deve ser feita a manutenção do ar condicionado?',
      resposta:
        '[PREENCHER: periodicidade recomendada pela MS Climatização, a confirmar com o cliente antes de publicar como orientação oficial]',
    },
    {
      pergunta: 'Que zonas do Algarve são atendidas?',
      resposta: 'A MS Climatização atua no Algarve, com atuação específica em Quarteira.',
    },
    {
      pergunta: 'Como pode ser pedido um orçamento?',
      resposta:
        'O contacto pode ser feito diretamente pelo WhatsApp ou por chamada telefónica, através do número indicado no topo da página.',
    },
  ],

  // Sem fotos originais em alta qualidade disponíveis (só existem capturas
  // de ecrã do Instagram/Facebook, que não são reutilizáveis). O mapa
  // reaproveita o SVG técnico de exemplo do _base como placeholder, porque
  // a morada exata ainda não foi confirmada e não há coordenadas reais.
  mapa: {
    imagem: 'mapa-demo.svg',
    linkGoogleMaps: 'https://www.google.com/maps/search/?api=1&query=Quarteira+Algarve+Portugal',
  },

  cores: {
    base: '#123C44',
    superficie: '#F4EFE4',
    texto: '#1C2321',
    destaque: '#CFE3DC',
    // Ajustado de um terracota mais vivo (perto de #C1502E) para este tom
    // mais profundo: contra --color-superficie o contraste é ~5,4:1, e o
    // par usado nos botões é sempre "texto claro (superfície) sobre acento"
    // (nunca --color-texto sobre --color-acento). Ver nota em global.css.
    acento: '#A83E22',
    linha: '#D8CBB3',
  },

  fontes: {
    titulo: 'Space Grotesk',
    corpo: 'Instrument Sans',
  },

  seo: {
    tituloPadrao: 'MS Climatização — Ar condicionado e climatização em Quarteira, Algarve',
    descricaoPadrao:
      'MS Climatização: instalação e manutenção de ar condicionado no Algarve, com atuação específica em Quarteira. Contacto direto pelo WhatsApp ou por chamada.',
    ogImagem: 'og.jpg',
  },
};
