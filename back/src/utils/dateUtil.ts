
export function timestampToDate(timestamp: number): Date {
    return new Date(timestamp);  
}

export function sqliteToDate(dateString: string): Date {
    return new Date(dateString); 
}

export function postGresToDate(data: string): string {
  const [dia, mes, ano] = data.split("/").map(Number);

  const agora = new Date();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  const segundo = agora.getSeconds();

  const date = new Date(ano, mes - 1, dia, hora, minuto, segundo);

  if (isNaN(date.getTime())) {
    throw new Error(`Data inválida recebida em postGresToDate: "${data}"`);
  }

  return date.toISOString();
}
