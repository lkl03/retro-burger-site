/* ============================================================================
   scroll-walk — motor de "paseo con el scroll" (vanilla JS, sin dependencias)
   ----------------------------------------------------------------------------
   Un escenario fijo (sticky) con N-1 clips de vídeo que unen N paradas. El
   scroll no reproduce el vídeo: fija su currentTime. Bajás y la cámara avanza;
   subís y vuelve.

   MARCADO QUE ESPERA (ver references/template/index.html):
     <section data-sw>
       <div data-sw-stage>
         <img data-sw-poster src="world/stop-0.webp">   ← uno por parada (N)
         <video data-sw-clip data-src="video/clip-1.mp4"
                data-src-mobile="video/clip-1-m.mp4" muted playsinline preload="none">
                                                         ← uno por tramo (N-1)
         <a data-sw-goto href="#parada">                 ← opcional (raíl)
       </div>
       <div class="sw-stops">
         <article data-sw-stop data-focus="50" id="...">  ← una por parada (N)
       </div>
     </section>

   REGLAS DE LOS ASSETS
     - clip-k va de la parada k-1 a la parada k (el último frame de clip-k es el
       primero de clip-k+1). Los pósters son frames REALES del vídeo, no las fotos.
     - H.264 sin audio, GOP corto (-g 6), +faststart (scripts/encode_web.py).

   OPCIONES
     hold      0..0.6  fracción de cada tramo en la que la cámara se queda quieta
                       en la parada (mientras se lee el texto). Default 0.22.
     smooth    0..1    suavizado del scroll (1 = sin suavizado; usar 1 si hay Lenis).
     mobileQuery       media query que activa data-src-mobile y el foco por parada.
     onStop(i)         callback cuando cambia la parada actual.

   Devuelve { refresh(), destroy() }.
   ========================================================================== */

export function mountScrollWalk(root, options = {}) {
  const o = { hold: 0.22, smooth: 0.16, mobileQuery: '(max-width: 860px)', onStop: null, ...options };
  const stage = root.querySelector('[data-sw-stage]');
  if (!stage) return { refresh() {}, destroy() {} };

  const stops = [...root.querySelectorAll('[data-sw-stop]')];
  const posters = [...stage.querySelectorAll('[data-sw-poster]')];
  const clips = [...stage.querySelectorAll('[data-sw-clip]')];
  const links = [...root.querySelectorAll('[data-sw-goto]')];
  const N = stops.length;
  const last = N - 1;

  const coarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const isMobile = coarse || matchMedia(o.mobileQuery).matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const useVideo = clips.length > 0 && !reduce && !saveData;
  const focus = stops.map((s) => Number(s.dataset.focus ?? 50));

  const ready = clips.map(() => false);
  const pending = clips.map(() => null);
  let tops = [];
  let target = 0;
  let w = 0;
  let raf = 0;
  let current = -1;
  let shown = -1;
  let lastWidth = innerWidth;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  function measure() {
    const y = scrollY;
    tops = stops.map((s) => s.getBoundingClientRect().top + y);
  }

  // Posición continua en el paseo: 0 en la primera parada, 1 en la segunda...
  function readScroll() {
    const y = scrollY;
    if (!tops.length || y <= tops[0]) return 0;
    for (let i = 1; i < N; i++) {
      if (y <= tops[i]) return i - 1 + (y - tops[i - 1]) / (tops[i] - tops[i - 1] || 1);
    }
    return last;
  }

  // Tramo + avance local dentro del tramo, con la pausa (hold) al principio.
  function locate(pos) {
    const seg = Math.min(Math.floor(pos), Math.max(0, N - 2));
    const f = clamp(pos - seg);
    const local = f <= o.hold ? 0 : (f - o.hold) / (1 - o.hold);
    return { seg, local };
  }

  function seek(i, t) {
    const v = clips[i];
    if (v.seeking) { pending[i] = t; return; }
    if (Math.abs(v.currentTime - t) > 1 / 90) v.currentTime = t;
    else reveal(i);
  }

  function reveal(i) {
    if (shown === i) return;
    shown = i;
    clips.forEach((c, k) => c.classList.toggle('is-shown', k === i));
    stage.dataset.mode = 'video';
  }

  function setCurrent(i) {
    if (i === current) return;
    current = i;
    stops.forEach((s, k) => s.classList.toggle('is-current', k === i));
    links.forEach((a, k) => a.setAttribute('aria-current', String(k === i)));
    if (o.onStop) o.onStop(i);
  }

  function render() {
    const { seg, local } = locate(w);
    setCurrent(Math.round(w));
    root.style.setProperty('--sw-progress', String(last ? w / last : 0));

    if (isMobile) {
      const a = focus[seg] ?? 50;
      const b = focus[seg + 1] ?? a;
      stage.style.setProperty('--sw-focus', `${a + (b - a) * local}%`);
    }

    const videoOn = useVideo && ready[seg];
    // Pósters: con vídeo listo hacen de colchón (mismo encuadre); sin vídeo, fundido + leve zoom.
    posters.forEach((p, k) => {
      let op = 0;
      if (k === seg) op = 1;
      else if (k === seg + 1) op = videoOn ? (local > 0.5 ? 1 : 0) : local;
      p.style.opacity = String(op);
      if (!reduce && !videoOn) p.style.transform = k === seg ? `scale(${1 + 0.05 * local})` : 'scale(1)';
    });

    if (!videoOn) {
      if (shown !== -1) { shown = -1; clips.forEach((c) => c.classList.remove('is-shown')); }
      delete stage.dataset.mode;
      return;
    }
    const v = clips[seg];
    const d = v.duration || 0;
    if (d) seek(seg, Math.min(local * d, d - 0.04));
  }

  function tick() {
    const diff = target - w;
    w = Math.abs(diff) < 0.0005 || o.smooth >= 1 ? target : w + diff * o.smooth;
    render();
    raf = w === target ? 0 : requestAnimationFrame(tick);
  }

  function onScroll() {
    target = readScroll();
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onResize() {
    if (coarse && innerWidth === lastWidth) return; // la barra de URL del móvil no recoloca nada
    lastWidth = innerWidth;
    measure();
    onScroll();
  }

  clips.forEach((v, i) => {
    v.muted = true;
    v.playsInline = true;
    v.addEventListener('seeked', () => {
      if (pending[i] != null) { const t = pending[i]; pending[i] = null; seek(i, t); return; }
      if (locate(w).seg === i) reveal(i);
    });
  });

  // Carga de a un clip, primero el más cercano a la posición actual. Blob = siempre seekable.
  const queue = clips.map((_, i) => i);
  const distance = (i) => {
    const { seg } = locate(w);
    if (i === seg) return -1;
    return i > seg ? i - seg : (seg - i) + 0.5;
  };
  async function loadNext() {
    queue.sort((a, b) => distance(a) - distance(b));
    const i = queue.shift();
    if (i === undefined) return;
    const v = clips[i];
    const src = (isMobile && v.dataset.srcMobile) || v.dataset.src;
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(String(res.status));
      v.src = URL.createObjectURL(await res.blob());
    } catch {
      v.src = src;
    }
    const ok = await new Promise((resolve) => {
      v.addEventListener('loadeddata', () => resolve(true), { once: true });
      v.addEventListener('error', () => resolve(false), { once: true });
      v.load();
    });
    if (ok) {
      // iOS no pinta frames buscados hasta que el vídeo se reprodujo una vez.
      try { await v.play(); } catch {}
      v.pause();
      ready[i] = true;
      render();
    }
    loadNext();
  }

  links.forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')?.slice(1);
    const k = stops.findIndex((s) => s.id === id);
    if (k < 0) return;
    e.preventDefault();
    scrollTo({ top: tops[k] + 2, behavior: reduce ? 'auto' : 'smooth' });
  }));

  measure();
  target = w = readScroll();
  render();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);
  addEventListener('orientationchange', () => setTimeout(() => { measure(); onScroll(); }, 300));
  addEventListener('load', () => { measure(); onScroll(); }, { once: true });
  if (useVideo) {
    if (document.readyState === 'complete') loadNext();
    else addEventListener('load', loadNext, { once: true });
  }

  return {
    refresh() { measure(); onScroll(); },
    destroy() {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      clips.forEach((v) => { if (v.src.startsWith('blob:')) URL.revokeObjectURL(v.src); });
    },
  };
}
