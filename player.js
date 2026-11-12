import { videoId, range, clock } from './common.js';
const $ = id => document.getElementById(id);
let player, timer, config, stopped = false, resetting = false;
const status = text => { $('status').textContent = text; };
function checkBoundary() {
  if (!player || stopped || resetting || player.getPlayerState() !== 1) return;
  const time = player.getCurrentTime();
  if (time >= config.end || time < config.start - 0.5) {
    if ($('loop').checked) restart();
    else { stopped = true; player.pauseVideo(); player.seekTo(config.end, true); status('Trecho concluído. Clique em Reproduzir trecho para assistir novamente.'); }
  }
}
function restart() {
  if (resetting) return;
  stopped = false;
  resetting = true;
  player.seekTo(config.start, true);
  player.playVideo();
  setTimeout(() => { resetting = false; }, 500);
}
try {
  const params = new URLSearchParams(location.search);
  config = { video: videoId(params.get('video') || ''), ...range(params.get('start') ?? '0', params.get('end') ?? '') };
  $('title').textContent = params.get('title')?.slice(0, 120) || 'Estudo em loop';
  document.title = $('title').textContent;
  $('range').textContent = `${clock(config.start)} → ${clock(config.end)} · ${Math.round((config.end - config.start) * 100) / 100} s`;
  $('loop').checked = params.get('loop') !== '0';
  $('youtube').href = `https://www.youtube.com/watch?v=${config.video}&t=${Math.floor(config.start)}s`;
  $('youtube').hidden = false;
  window.onYouTubeIframeAPIReady = () => {
    player = new window.YT.Player('player', {
      width: '100%', height: '100%', videoId: config.video,
      playerVars: { playsinline: 1, start: Math.floor(config.start), origin: location.origin },
      events: {
        onReady: () => {
          const duration = player.getDuration();
          if (duration > 0 && config.end > duration) { status('O fim escolhido ultrapassa a duração do vídeo. Crie outro link com tempos válidos.'); return; }
          ['play', 'pause', 'restart'].forEach(id => { $(id).disabled = false; });
          status('Clique em Reproduzir trecho para começar.');
          timer = setInterval(checkBoundary, 100);
        },
        onStateChange: event => {
          if (event.data === 0 && !stopped) {
            if ($('loop').checked) restart();
            else { stopped = true; status('Trecho concluído.'); }
          }
          if (event.data === 1) {
            if (stopped) restart();
            else status('Reproduzindo. A repetição segue a opção acima.');
          }
        },
        onError: event => { clearInterval(timer); ['play', 'pause', 'restart'].forEach(id => { $(id).disabled = true; }); status(`Não foi possível reproduzir (código ${event.data}). O vídeo pode estar indisponível ou bloquear incorporação. Tente o link do YouTube abaixo.`); },
        onAutoplayBlocked: () => status('O navegador bloqueou a reprodução. Clique no botão de play do vídeo.')
      }
    });
  };
  const api = document.createElement('script'); api.src = 'https://www.youtube.com/iframe_api';
  api.onerror = () => status('Não foi possível carregar o YouTube. Verifique sua conexão e os bloqueadores do navegador.');
  document.head.append(api);
  $('play').onclick = () => { if (stopped || player.getCurrentTime() < config.start || player.getCurrentTime() >= config.end) restart(); else player.playVideo(); };
  $('pause').onclick = () => player.pauseVideo();
  $('restart').onclick = restart;
  window.addEventListener('pagehide', () => clearInterval(timer));
  window.addEventListener('pageshow', event => { if (event.persisted && player) timer = setInterval(checkBoundary, 100); });
} catch (error) { $('range').textContent = 'Link inválido'; status(error.message + ' Use o gerador para criar outro link.'); }
