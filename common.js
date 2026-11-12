export function videoId(value) {
  value = value.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  let url;
  try { url = new URL(value); } catch { throw new Error('Cole um link válido do YouTube ou o ID de 11 caracteres.'); }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Use um link HTTP ou HTTPS.');
  const host = url.hostname.toLowerCase();
  let id;
  if (['youtu.be', 'www.youtu.be'].includes(host)) id = url.pathname.split('/')[1];
  else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
    id = url.searchParams.get('v') || (/^\/(embed|shorts|live)\//.test(url.pathname) ? url.pathname.split('/')[2] : null);
  }
  if (!id || !/^[\w-]{11}$/.test(id)) throw new Error('Não foi possível identificar o vídeo nesse link.');
  return id;
}
export function seconds(value) {
  const text = String(value).trim();
  if (!/^\d+(?:[.,]\d+)?$/.test(text) && !/^\d+:\d{1,2}(?::\d{1,2})?$/.test(text)) throw new Error('Informe os tempos em segundos, mm:ss ou hh:mm:ss.');
  const parts = text.replace(',', '.').split(':').map(Number);
  if (parts.length > 1 && parts.slice(1).some(p => p >= 60)) throw new Error('Minutos e segundos após dois-pontos devem ser menores que 60.');
  const n = parts.reduce((total, p) => total * 60 + p, 0);
  if (!Number.isFinite(n) || n < 0 || n > 604800) throw new Error('Tempo fora do intervalo permitido.');
  return n;
}
export function range(start, end) {
  const a = seconds(start), b = seconds(end);
  if (b <= a) throw new Error('O fim deve ser maior que o início.');
  return { start: a, end: b };
}
export function clock(n) {
  n = Math.floor(n);
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
}
