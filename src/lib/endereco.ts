// Utilitario pequeno e sem estado: extrai a cidade de um endereco curto
// no formato "Rua X, 123, Bairro Y, Cidade - UF, CEP". Usado no H1 (secao 8
// do CLAUDE.md exige servico + cidade/bairro) e no rodape.
export function cidadeDoEndereco(enderecoCurto: string): string {
  const partes = enderecoCurto.split(',').map((parte) => parte.trim());
  const parteComEstado = partes.find((parte) => parte.includes(' - '));
  if (!parteComEstado) {
    return partes[partes.length - 1] ?? enderecoCurto;
  }
  return parteComEstado.split(' - ')[0]?.trim() ?? parteComEstado;
}

export function linkWhatsApp(whatsappDigitos: string, mensagem: string): string {
  return `https://wa.me/${whatsappDigitos}?text=${encodeURIComponent(mensagem)}`;
}

export function linkTelefone(telefone: string): string {
  const somenteDigitos = telefone.replace(/[^\d+]/g, '');
  return `tel:${somenteDigitos}`;
}
