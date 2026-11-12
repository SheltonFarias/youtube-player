import { videoId, range } from './common.js';
const $ = id => document.getElementById(id);
const message = $('message');
$('generator').addEventListener('submit', event => {
  event.preventDefault();
  $('result').hidden = true;
  try {
    const id = videoId($('video').value);
    const times = range($('start').value, $('end').value);
    const url = new URL('player.html', location.href);
    url.search = new URLSearchParams({ video: id, start: times.start, end: times.end, loop: $('loop').checked ? '1' : '0', title: $('title').value.trim() });
    $('output').value = url.href;
    $('open').href = url.href;
    $('result').hidden = false;
    message.textContent = 'Link gerado. Teste o player antes de incorporar.';
  } catch (error) { message.textContent = error.message; }
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('output').value); message.textContent = 'Link copiado!'; }
  catch { $('output').focus(); $('output').select(); message.textContent = 'Selecione e copie o link manualmente (Ctrl+C ou o menu do celular).'; }
});
