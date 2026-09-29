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
    enderecoCurto: '[PREENCHER: morada completa], XXXX-XXX, Quarteira - Algarve',
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
  // aparecem nos posts), NÃO uma lista confirmada pelo cliente. Isso vale
  // para a EXISTÊNCIA de cada serviço como oferta formal (podem existir
  // outros, como reparação ou bombas de calor, ainda não confirmados).
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
      // Diferente do "confirmado: false" acima (que é sobre a EXISTÊNCIA do
      // serviço como oferta formal), o CONTEÚDO abaixo (descrição e passos)
      // é um fato confirmado: passo a passo real publicado pela própria MS
      // Climatização. Fonte: post "Conheça nossos serviços", Instagram
      // @msclimatizacaopt.
      descricao:
        'Manutenção preventiva periódica, com verificação completa do aparelho: limpeza dos filtros de ar, verificação do sistema elétrico e do consumo, verificação das serpentinas do evaporador e do condensador, verificação do isolamento térmico e limpeza das bandejas coletoras de água.',
      passos: [
        'Limpeza dos filtros de ar',
        'Verificação do sistema elétrico e do consumo (tensão, corrente, entre outros)',
        'Verificação das serpentinas do evaporador e do condensador',
        'Verificação do isolamento térmico',
        'Limpeza das bandejas coletoras de água',
      ],
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

  // Nenhum numero real (anos de experiencia, quantidade de instalacoes, etc.)
  // foi confirmado pelo cliente ainda. Em vez de esconder a secao ou inventar
  // um numero, os itens ficam como "[PREENCHER: ...]" visivel: e uma pendencia
  // real, nao um dado. Ver FaixaEstatisticas.astro (_base/CLAUDE.md secao 6).
  estatisticas: [
    { numero: '[PREENCHER: anos de experiência]', legenda: 'anos de experiência' },
    { numero: '[PREENCHER: quantidade de instalações]', legenda: 'instalações realizadas' },
    { numero: '[PREENCHER: prazo de garantia oferecido]', legenda: 'de garantia' },
  ],

  // Zona de atuacao confirmada pelo cliente: Algarve, com atuacao especifica
  // em Quarteira, Loulé e Faro e concelhos vizinhos. Usado por
  // AreaAtendimento.astro (bom para SEO local e para deixar a cobertura clara).
  areasAtendimento: ['Quarteira', 'Loulé', 'Faro', 'Concelhos vizinhos do Algarve'],

  // Sem registo profissional PT confirmado para exibir. A certificação
  // técnica para manuseio de gases fluorados (exigência comum a
  // instaladores de climatização na UE) é uma pendência de verificação,
  // não um dado a inventar (ver docs/nichos.md, nicho "Climatização e Ar
  // Condicionado", status_normativo).
  registrosProfissionaisPT: [],

  legalPT: {
    denominacao: '[PREENCHER: denominação social exata]',
    // NIF de Portugal: sempre 9 dígitos seguidos, sem espaço nem traço.
    // "XXXXXXXXX" é a máscara no formato certo, não um valor real (ver
    // PENDENCIAS.md e scripts/validar-conteudo.mjs).
    nif: 'XXXXXXXXX',
    // Morada (rua e número) não tem formato fixo nacional, então continua
    // "[PREENCHER". Código postal de Portugal e sempre 4 dígitos, traço,
    // 3 dígitos: "XXXX-XXX" é a máscara nesse formato (ver PENDENCIAS.md).
    moradaCompleta: '[PREENCHER: morada completa], XXXX-XXX',
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

  // Direção visual atual (4ª tentativa, definitiva): paleta clara, extraída
  // por amostragem de pixel do logo real do cliente (src/assets/
  // logo-ms-climatizacao.png), não inventada. Fundo branco levemente quente,
  // ink escuro para texto, azul do floco (escurecido para passar AA sobre
  // fundo claro) e degradê pêssego->coral do sol reservado ao botão/CTA.
  // Ver src/styles/global.css para os tokens completos e a checagem de
  // contraste (inclui --color-painel e --color-acento-inicio, que não
  // entram aqui por serem tons de apoio, não cores de marca no schema).
  cores: {
    base: '#1A1A1A',
    superficie: '#FDFCFA',
    texto: '#2A2D30',
    destaque: '#146378',
    // Contraste medido (WCAG, fórmula de luminância relativa): texto
    // --color-base sobre --color-acento = ~9,6:1 -> passa AA (e AAA) para
    // qualquer tamanho. O par usado nos botões é sempre "texto escuro (ink)
    // sobre o degradê pêssego->coral (.botao-cta)", nunca o coral como
    // texto corrido. Ver nota em global.css.
    acento: '#FFAC8D',
    linha: '#D6CEBF',
  },

  // Archivo cobre títulos e corpo (mesma família nas duas funções); a
  // segunda família da direção, JetBrains Mono, é só para rótulos (eyebrow,
  // índices numerados, anotações do diagrama) e fica em --font-rotulo
  // (global.css), fora deste par de 2 famílias documentado aqui.
  fontes: {
    titulo: 'Archivo',
    corpo: 'Archivo',
  },

  seo: {
    tituloPadrao: 'MS Climatização: ar condicionado e climatização em Quarteira, Algarve',
    descricaoPadrao:
      'MS Climatização: instalação e manutenção de ar condicionado no Algarve, com atuação específica em Quarteira. Contacto direto pelo WhatsApp ou por chamada.',
    ogImagem: 'og.jpg',
  },
};
