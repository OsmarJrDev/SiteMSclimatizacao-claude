// Tipos de dados do cliente.
// Regra de ouro (CLAUDE.md secao 7): nenhum dado real pode ser inventado.
// Todo depoimento, numero, credencial ou premio precisa de "fonte" e
// "aprovadoPeloCliente: true". O script scripts/validar-conteudo.mjs falha
// o build se esses campos estiverem ausentes.

export type Mercado = 'BR' | 'PT';

/** Registro de onde veio um dado sensivel e se o cliente aprovou publicar. */
export interface ProvaReal {
  /** De onde veio o dado. Ex.: "print Google 12/09/2026", "contrato assinado 03/2026". */
  fonte: string;
  /** Sempre true. Se nao houver aprovacao por escrito, o dado nao entra aqui. */
  aprovadoPeloCliente: true;
}

export interface Depoimento extends ProvaReal {
  nomeCliente: string;
  cargoOuContexto?: string;
  texto: string;
}

export interface NumeroDestaque extends ProvaReal {
  valor: string;
  legenda: string;
}

export interface Credencial extends ProvaReal {
  titulo: string;
  descricao?: string;
}

export interface Premio extends ProvaReal {
  titulo: string;
  ano?: string;
}

export type DiaDaSemana =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo';

export interface HorarioDia {
  dia: DiaDaSemana;
  /** Formato "HH:mm". null quando fechado nesse dia. */
  abertura: string | null;
  fechamento: string | null;
}

export interface Servico {
  slug: string;
  nome: string;
  descricao: string;
  /**
   * Lista curta de passos/itens reais de um servico (ex.: etapas de uma
   * manutencao preventiva). Opcional: so preencher com passos confirmados
   * pelo cliente ou por publicacao real da propria empresa (registrar a
   * fonte em comentario ao lado do array em site.ts). Nao inventar passos
   * genericos so para preencher o layout.
   */
  passos?: string[];
  /** Preco publico so deve ser mostrado se a norma do nicho permitir (ver docs/nichos.md). */
  precoAPartir?: string;
  /**
   * Adaptacao especifica deste cliente (nao existe no _base): quando false,
   * o servico veio de indicio visual nos posts do Instagram, nao de uma
   * lista confirmada pelo cliente. O componente Servicos.astro mostra um
   * aviso "(a confirmar)" para esses itens. Omitir o campo (ou usar true)
   * quando o cliente confirmar a lista exata.
   */
  confirmado?: boolean;
}

export interface Diferencial {
  titulo: string;
  descricao: string;
}

/**
 * Item da faixa de estatisticas/prova em destaque tipografico grande
 * (FaixaEstatisticas.astro), separada do Hero. E prova real quando o numero
 * vem de um fato confirmado: precisa de "fonte" e "aprovadoPeloCliente: true"
 * (scripts/validar-conteudo.mjs cobra isso). Enquanto o numero nao existir,
 * use "numero: '[PREENCHER: descricao]'" (sem fonte/aprovacao) em vez de
 * inventar um valor: o componente mostra o placeholder de forma visivel, sem
 * esconder a secao.
 */
export interface EstatisticaDestaque {
  numero: string;
  legenda: string;
  fonte?: string;
  aprovadoPeloCliente?: true;
}

/**
 * Linha da tabela comparativa "nos vs. outras empresas" (TabelaComparativa.astro).
 * E prova real: precisa de "fonte" e "aprovadoPeloCliente: true" quando "nos"
 * e "outras" descrevem um fato confirmado. So inclua linhas com diferencial
 * de verdade (nunca um diferencial generico so para preencher a tabela).
 */
export interface ComparativoLinha {
  diferencial: string;
  nos: boolean;
  outras: boolean;
  notaNos?: string;
  notaOutras?: string;
  fonte?: string;
  aprovadoPeloCliente?: true;
}

/** Marca atendida/trabalhada (MarcasAtendidas.astro). So entra com confirmacao do cliente. */
export interface MarcaAtendida {
  nome: string;
}

export interface PerguntaFaq {
  pergunta: string;
  resposta: string;
}

/** Registros profissionais exigidos no Brasil, conforme o nicho (docs/nichos.md). */
export interface RegistroProfissionalBR {
  tipo:
    | 'CRM'
    | 'RQE'
    | 'CRO'
    | 'OAB'
    | 'CRECI-J'
    | 'CRP'
    | 'CRC'
    | 'CREF'
    | 'CAU'
    | 'CRMV'
    | 'outro';
  numero: string;
  responsavelTecnico?: string;
}

/** Registros profissionais exigidos em Portugal, conforme o nicho (docs/nichos.md). */
export interface RegistroProfissionalPT {
  tipo: 'ERS' | 'licenca-funcionamento' | 'cedula-profissional' | 'AMI' | 'ordem' | 'outro';
  numero: string;
  responsavel?: string;
}

export interface DadosLegaisBR {
  razaoSocial: string;
  cnpj: string;
  enderecoCompleto: string;
  /** Canal para o titular exercer direitos da LGPD (e-mail ou formulario). */
  canalTitularDados: string;
}

export interface EntidadeRAL {
  nome: string;
  site: string;
}

export interface DadosLegaisPT {
  denominacao: string;
  nif: string;
  moradaCompleta: string;
  registoComercial: string;
  entidadeRAL: EntidadeRAL;
  livroReclamacoesUrl: string;
}

export interface NAP {
  nomeComercial: string;
  enderecoCurto: string;
  telefone: string;
  /** Somente digitos, sem +, espaco ou traco. Ex.: "5511912345678". */
  whatsappDigitos: string;
  email: string;
  /** Coordenadas reais do endereco. Ausente ate o cliente confirmar (nunca estimar). */
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export interface MapaLocalizacao {
  /** Caminho da imagem estatica do mapa em src/assets (nunca embed). */
  imagem: string;
  linkGoogleMaps: string;
}

/** Tokens de cor. Preenchidos em @theme, nunca em hex solto no componente. */
export interface CoresTema {
  base: string;
  superficie: string;
  texto: string;
  destaque: string;
  acento: string;
  linha: string;
}

/** No maximo 2 familias, nomes exatamente como no provider da Fonts API. */
export interface FontesTema {
  titulo: string;
  corpo: string;
}

export interface Seo {
  tituloPadrao: string;
  descricaoPadrao: string;
  /** Caminho relativo em src/assets, 1200x630 JPEG < 200 KB. */
  ogImagem: string;
}

export interface SiteData {
  /** Marca este site como demonstracao. Nunca false em /demos ou /_base. */
  demo: boolean;
  avisoDemo?: string;
  mercado: Mercado;
  nicho: string;
  /** Subtipo de LocalBusiness do schema.org (ex.: "MedicalClinic"). */
  schemaOrgTipo: string;
  nap: NAP;
  horarios: HorarioDia[];
  servicos: Servico[];
  diferenciais: Diferencial[];
  depoimentos: Depoimento[];
  numeros: NumeroDestaque[];
  credenciais: Credencial[];
  premios: Premio[];
  /** Faixa de estatisticas/prova em destaque tipografico grande (opcional, ver EstatisticaDestaque). */
  estatisticas?: EstatisticaDestaque[];
  /** Bairros/cidades/concelhos atendidos, para SEO local e cobertura clara (AreaAtendimento.astro). */
  areasAtendimento?: string[];
  /** Linhas do comparativo "nos vs. outras empresas", so com diferenciais reais (ComparativoLinha). */
  comparativo?: ComparativoLinha[];
  /** Marcas atendidas/trabalhadas confirmadas pelo cliente (MarcasAtendidas.astro). */
  marcasAtendidas?: MarcaAtendida[];
  registrosProfissionaisBR?: RegistroProfissionalBR[];
  registrosProfissionaisPT?: RegistroProfissionalPT[];
  legalBR?: DadosLegaisBR;
  legalPT?: DadosLegaisPT;
  faq: PerguntaFaq[];
  mapa: MapaLocalizacao;
  cores: CoresTema;
  fontes: FontesTema;
  seo: Seo;
}
