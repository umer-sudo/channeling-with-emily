/* Channeling with Emily — v3 "Spectrum". Vanilla, no build step. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wide = matchMedia('(min-width: 900px)');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const DPR = Math.min(devicePixelRatio || 1, 1.75);

  const C = { orchid: '#c77dff', aqua: '#2fe6c6', coral: '#ff6f91', amber: '#ffb547', cobalt: '#6a86ff', emerald: '#46d68a', gold: '#ecc77f' };
  const TONES = {
    orchid: ['#4d1873', '#140824'], emerald: ['#0f5c3c', '#06150f'], aqua: ['#0a5a5e', '#051519'],
    coral: ['#7d1f43', '#180811'], amber: ['#7a4810', '#190e06'], cobalt: ['#21308f', '#080a1e'], sunrise: ['#7e2c45', '#1b0a16'],
  };
  let tone = '', auraTone = null;
  const setTone = name => {
    const t = TONES[name] || TONES.orchid; if (name === tone) return; tone = name;
    root.style.setProperty('--t1', t[0]); root.style.setProperty('--t2', t[1]);
  };

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollToEl = (el, instant) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + scrollY - 10;
    if (lenis) lenis.scrollTo(y, { immediate: !!instant }); else scrollTo({ top: y, behavior: instant || reduce ? 'auto' : 'smooth' });
  };

  /* ---------- Hero headline: letters ---------- */
  let ci = 0;
  $$('.hero .display .line > span').forEach(sp => {
    [...sp.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(word => {
          if (!word) return; if (!word.trim()) { f.append(' '); return; }
          const wd = document.createElement('span'); wd.className = 'wd';
          [...word].forEach(ch => { const c = document.createElement('span'); c.className = 'ch'; c.textContent = ch; c.style.setProperty('--i', ci++); wd.append(c); });
          f.append(wd);
        });
        n.replaceWith(f);
      } else { n.classList.add('ch'); n.style.setProperty('--i', ci++); ci += 2; }
    });
  });

  /* ---------- Loader ---------- */
  const loader = $('.loader');
  const begin = () => { loader.classList.add('done'); document.body.classList.add('ready'); };
  let seen = false;
  try { seen = sessionStorage.getItem('cwe3-seen') === '1'; sessionStorage.setItem('cwe3-seen', '1'); } catch (e) {}
  if (reduce || seen) { loader.classList.add('done'); setTimeout(() => document.body.classList.add('ready'), 60); }
  else { setTimeout(begin, 1500); loader.addEventListener('click', begin); }

  /* ---------- Stars ---------- */
  const sc = $('canvas.stars'), sx = sc.getContext('2d');
  let stars = [], SW = 0, SH = 0;
  const sizeStars = () => {
    SW = innerWidth; SH = innerHeight; sc.width = SW * DPR; sc.height = SH * DPR; sc.style.width = SW + 'px'; sc.style.height = SH + 'px';
    const count = Math.round(Math.min(240, SW * SH / 6500));
    const tints = ['#ffffff', '#ffffff', '#ffffff', C.orchid, C.aqua, C.amber, C.coral];
    stars = Array.from({ length: count }, () => ({ x: Math.random() * SW, y: Math.random() * SH * 1.6, r: Math.random() * 1.2 + .2, d: Math.random() * .6 + .1, ph: Math.random() * 6.28, sp: Math.random() * .8 + .3, c: tints[Math.random() * tints.length | 0] }));
  };
  sizeStars(); addEventListener('resize', sizeStars);
  const drawStars = (t, sy) => {
    sx.setTransform(DPR, 0, 0, DPR, 0, 0); sx.clearRect(0, 0, SW, SH);
    for (const s of stars) {
      let y = (s.y - sy * s.d * .25) % (SH * 1.6); if (y < 0) y += SH * 1.6; if (y > SH) continue;
      sx.globalAlpha = (.35 + .65 * (reduce ? .6 : Math.sin(t * .001 * s.sp + s.ph) * .5 + .5)) * (.4 + s.d);
      sx.fillStyle = s.c; sx.beginPath(); sx.arc(s.x, y, s.r, 0, 6.283); sx.fill();
    }
    sx.globalAlpha = 1;
  };

  /* ---------- Hero: four offerings, each its own colour ---------- */
  const offers = [
    { c: C.orchid, b: C.cobalt, sel: 'Intuitive Channeling' },
    { c: C.aqua, b: C.emerald, sel: 'Reconnective Healing' },
    { c: C.coral, b: C.orchid, sel: 'Mediumship' },
    { c: C.amber, b: C.coral, sel: 'Past-life Regression' },
  ];
  const sw = $('.switch'), lens = $('.lens', sw), btns = $$('button', sw);
  let cur = 0, auraNow = hex(offers[0].c), auraTo = auraNow.slice(), bNow = hex(offers[0].b), bTo = bNow.slice(), autoT0 = performance.now(), autoOn = !reduce;
  const CYCLE = 3600;
  const placeLens = () => { const b = btns[cur]; lens.style.width = b.offsetWidth + 'px'; lens.style.transform = `translateX(${b.offsetLeft - 5}px)`; };
  const setOffer = (i, user) => {
    if (user) autoOn = false;
    cur = i; btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i));
    root.style.setProperty('--aura', offers[i].c); auraTo = hex(offers[i].c); bTo = hex(offers[i].b); placeLens();
    autoT0 = performance.now();
  };
  btns.forEach((b, i) => b.addEventListener('click', () => setOffer(i, true)));
  addEventListener('resize', placeLens); document.fonts && document.fonts.ready.then(placeLens); placeLens();

  const portal = $('.portal'), back = $('.orbit.back'), front = $('.orbit.front'), arch = $('.arch');
  const glyphDefs = [['g-moon', C.gold], ['g-lotus', C.aqua], ['g-seed', C.orchid], ['g-heart', C.emerald], ['g-star', C.amber], ['g-spiral', C.coral]];
  const glyphs = glyphDefs.map(([id, col], i) => {
    const el = document.createElement('div'); el.className = 'glyph'; el.style.setProperty('--gc', col);
    el.innerHTML = `<svg viewBox="0 0 64 64"><use href="#${id}"/></svg>`; back.appendChild(el);
    return { el, a: i / glyphDefs.length * Math.PI * 2, front: false, s: i % 2 ? .8 : 1 };
  });
  const ac = $('canvas.aura'), ax = ac.getContext('2d');
  let AW = 0, AH = 0;
  const sizeAura = () => { const r = ac.getBoundingClientRect(); AW = r.width; AH = r.height; ac.width = AW * DPR; ac.height = AH * DPR; };
  sizeAura(); addEventListener('resize', sizeAura);
  const motes = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), v: Math.random() * .00012 + .00004, r: Math.random() * 1.8 + .4, ph: Math.random() * 6.28 }));
  const drawAura = t => {
    auraNow = auraNow.map((v, i) => lerp(v, auraTo[i], .04)); bNow = bNow.map((v, i) => lerp(v, bTo[i], .04));
    const a = auraNow.map(Math.round).join(','), b = bNow.map(Math.round).join(',');
    ax.setTransform(DPR, 0, 0, DPR, 0, 0); ax.clearRect(0, 0, AW, AH);
    ax.globalCompositeOperation = 'lighter';
    const blobs = [[.5, .42, .3, .42, a], [.38 + Math.sin(t * .0003) * .06, .56, .24, .34, b], [.62 + Math.cos(t * .00027) * .06, .5, .24, .34, a]];
    for (const [bx, by, br, ba, c] of blobs) {
      const g = ax.createRadialGradient(bx * AW, by * AH, 0, bx * AW, by * AH, br * Math.max(AW, AH));
      g.addColorStop(0, `rgba(${c},${ba})`); g.addColorStop(1, `rgba(${c},0)`);
      ax.fillStyle = g; ax.fillRect(0, 0, AW, AH);
    }
    ax.fillStyle = '#fff6e4';
    for (const m of motes) {
      if (!reduce) { m.y -= m.v * 16; if (m.y < 0) { m.y = 1; m.x = Math.random(); } }
      ax.globalAlpha = .25 + .55 * (Math.sin(t * .002 + m.ph) * .5 + .5);
      ax.beginPath(); ax.arc(m.x * AW, m.y * AH, m.r, 0, 6.283); ax.fill();
    }
    ax.globalAlpha = 1; ax.globalCompositeOperation = 'source-over';
  };
  let px = 0, py = 0, tpx = 0, tpy = 0;
  if (fine) addEventListener('pointermove', e => { tpx = e.clientX / innerWidth - .5; tpy = e.clientY / innerHeight - .5; }, { passive: true });
  const drawOrbit = dt => {
    const W = portal.offsetWidth, H = portal.offsetHeight, rx = W * .8, ry = H * .14, cy = -H * .02;
    px = lerp(px, tpx, .06); py = lerp(py, tpy, .06);
    const tilt = -.18 + px * .12;
    for (const g of glyphs) {
      if (!reduce) g.a += dt * .00024;
      const ca = Math.cos(g.a), sa = Math.sin(g.a);
      const x = ca * rx, y = sa * ry + cy;
      const xr = x * Math.cos(tilt) - y * Math.sin(tilt), yr = x * Math.sin(tilt) + y * Math.cos(tilt);
      const z = sa, isFront = z > 0;
      if (isFront !== g.front) { (isFront ? front : back).appendChild(g.el); g.front = isFront; }
      g.el.style.transform = `translate3d(${xr + px * 30 * (z + 1)}px, ${yr + py * 20 * (z + 1)}px, 0) scale(${(.62 + (z + 1) * .26) * g.s}) rotate(${g.a * 20}deg)`;
      g.el.style.opacity = .4 + (z + 1) * .3;
    }
    arch.style.transform = `translate3d(${px * -10}px, ${py * -8}px, 0)`;
  };

  /* ---------- Hero ink: two-colour living watercolour, WebGL ---------- */
  const inkC = $('canvas.ink');
  const ink = (() => {
    const gl = inkC.getContext('webgl', { premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return null;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision highp float;
uniform vec2 R;uniform float T;uniform vec2 M;uniform vec3 A;uniform vec3 B;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=r*p*2.02;a*=.5;}return v;}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*R)/R.y; float t=T*.04; p+=M*.06;
  vec2 q=vec2(fbm(p*1.3+vec2(0.,t)),fbm(p*1.3+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p*1.6+3.*q+vec2(1.7,9.2)+t*.6),fbm(p*1.6+3.*q+vec2(8.3,2.8)-t*.5));
  float f=fbm(p*1.2+2.6*r);
  vec3 night=vec3(.04,.02,.07);
  vec3 col=mix(night,A*.32,smoothstep(.2,.8,f));
  col=mix(col,A*.85,smoothstep(.5,1.,f*q.x*1.6)*.9);
  col=mix(col,B*.75,smoothstep(.5,.95,r.y)*.6);
  float e=abs(fract(f*3.2+q.y)-.5);
  col+=vec3(.93,.78,.5)*smoothstep(.03,.0,e)*smoothstep(.35,.75,f)*.6;
  col*=.8+.35*smoothstep(1.25,.15,length(p*vec2(.8,1.)));
  col=mix(col,night,smoothstep(.7,.05,length(p-vec2(0.,.05)))*.3);
  col+=(h(gl_FragCoord.xy+T)-.5)*.025;
  gl_FragColor=vec4(col,1.);
}`;
    const sh = (t, src) => { const o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs); if (!v || !f) return null;
    const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr); gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = k => gl.getUniformLocation(pr, k); const uR = U('R'), uT = U('T'), uM = U('M'), uA = U('A'), uB = U('B');
    const size = () => { inkC.width = Math.round(inkC.offsetWidth * .6); inkC.height = Math.round(inkC.offsetHeight * .6); gl.viewport(0, 0, inkC.width, inkC.height); };
    size(); addEventListener('resize', size);
    const t0 = performance.now();
    return (t, mx, my, a, b) => {
      gl.uniform2f(uR, inkC.width, inkC.height); gl.uniform1f(uT, reduce ? 40 : (t - t0) / 1000 + 40);
      gl.uniform2f(uM, mx, -my); gl.uniform3f(uA, a[0] / 255, a[1] / 255, a[2] / 255); gl.uniform3f(uB, b[0] / 255, b[1] / 255, b[2] / 255);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
  })();

  /* ---------- Aura orb: pick what you carry ---------- */
  const answers = {
    love: ['coral', 'Intuitive Channeling', 'Love,', 'heard.'],
    purpose: ['amber', 'Intuitive Channeling', 'Your path,', 'lit.'],
    grief: ['cobalt', 'Mediumship', 'They’re', 'still here.'],
    body: ['aqua', 'Reconnective Healing', 'Back to', 'balance.'],
    pattern: ['orchid', 'Past-life Regression', 'Where it', 'began.'],
    cross: ['emerald', 'Intuitive Channeling', 'The way', 'forward.'],
  };
  const orbC = $('canvas.orb'), ox = orbC.getContext('2d'), orbSec = $('.aura-sec'), orbOut = $('.orb-out');
  const oT = $('[data-o-t]'), oGo = $('[data-o-go]'), oK = $('.k', orbOut), sws = $$('.swatches button');
  let OW = 0, OH = 0, orbCol = hex(C.emerald), orbTo = orbCol.slice(), orbCol2 = hex(C.aqua), orbTo2 = orbCol2.slice(), picked = null, chosenArea = '', idleI = 0, idleT = 0, pulse = 0;
  const sizeOrb = () => { const r = orbC.getBoundingClientRect(); OW = r.width; OH = r.height; orbC.width = OW * DPR; orbC.height = OH * DPR; };
  sizeOrb(); addEventListener('resize', sizeOrb);
  const idleSeq = ['emerald', 'aqua', 'cobalt', 'orchid', 'coral', 'amber'];
  sws.forEach(b => b.addEventListener('click', () => {
    sws.forEach(x => x.setAttribute('aria-pressed', x === b));
    const [tn, sess, l1, l2] = answers[b.dataset.k]; picked = tn; chosenArea = b.textContent.trim();
    orbTo = hex(C[tn]); orbTo2 = hex(C[idleSeq[(idleSeq.indexOf(tn) + 1) % 6]]); pulse = 1;
    orbSec.style.setProperty('--sel', C[tn]); auraTone = tn; tone = '';
    orbOut.classList.remove('swap'); void orbOut.offsetWidth; orbOut.classList.add('swap');
    oK.textContent = 'Emily suggests · ' + sess;
    oT.innerHTML = `${l1}<br><em>${l2}</em>`;
    oGo.hidden = false; oGo.dataset.offer = sess;
  }));
  const drawOrb = (t, dt) => {
    if (!picked && !reduce) { idleT += dt; if (idleT > 2400) { idleT = 0; idleI = (idleI + 1) % 6; orbTo = hex(C[idleSeq[idleI]]); orbTo2 = hex(C[idleSeq[(idleI + 2) % 6]]); } }
    orbCol = orbCol.map((v, i) => lerp(v, orbTo[i], .045)); orbCol2 = orbCol2.map((v, i) => lerp(v, orbTo2[i], .035));
    pulse = Math.max(0, pulse - dt / 900);
    const a = orbCol.map(Math.round).join(','), b = orbCol2.map(Math.round).join(',');
    const cx = OW / 2, cy = OH / 2, R = Math.min(OW, OH) * .27 * (1 + pulse * .12), tt = reduce ? 0 : t * .001;
    ox.setTransform(DPR, 0, 0, DPR, 0, 0); ox.clearRect(0, 0, OW, OH);
    ox.globalCompositeOperation = 'lighter';
    // outer halo
    let g = ox.createRadialGradient(cx, cy, R * .4, cx, cy, R * 2.1);
    g.addColorStop(0, `rgba(${a},.35)`); g.addColorStop(1, `rgba(${a},0)`); ox.fillStyle = g; ox.fillRect(0, 0, OW, OH);
    // three wobbling membranes
    for (let L = 0; L < 3; L++) {
      const col = L === 1 ? b : a, rr = R * (1.12 - L * .14);
      ox.beginPath();
      for (let k = 0; k <= 120; k++) {
        const th = k / 120 * Math.PI * 2;
        const w = 1 + .07 * Math.sin(3 * th + tt * (1.1 + L * .3) + L) + .05 * Math.sin(5 * th - tt * 1.4 + L * 2) + .03 * Math.sin(8 * th + tt * 2);
        const x = cx + Math.cos(th) * rr * w, y = cy + Math.sin(th) * rr * w;
        k ? ox.lineTo(x, y) : ox.moveTo(x, y);
      }
      g = ox.createRadialGradient(cx - rr * .3, cy - rr * .35, rr * .05, cx, cy, rr * 1.1);
      g.addColorStop(0, `rgba(255,255,255,${.16 - L * .05})`); g.addColorStop(.4, `rgba(${col},${.5 - L * .12})`); g.addColorStop(1, `rgba(${col},.03)`);
      ox.fillStyle = g; ox.fill();
      ox.strokeStyle = `rgba(255,255,255,${.12 + pulse * .3})`; ox.lineWidth = 1; ox.stroke();
    }
    // rings that ripple out on pick
    for (let k = 0; k < 3; k++) {
      const ph = ((tt * .25 + k / 3) % 1), rr = R * (1.15 + ph * .9);
      ox.strokeStyle = `rgba(${a},${(1 - ph) * .35})`; ox.lineWidth = 1.2;
      ox.beginPath(); ox.arc(cx, cy, rr, 0, 6.283); ox.stroke();
    }
    // orbiting sparks
    ox.fillStyle = '#fff';
    for (let k = 0; k < 14; k++) {
      const an = tt * (.3 + (k % 3) * .12) + k * 2.1, rr = R * (1.3 + (k % 4) * .16);
      ox.globalAlpha = .5 + .5 * Math.sin(tt * 2 + k);
      ox.beginPath(); ox.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * .9, 1.2 + (k % 3) * .6, 0, 6.283); ox.fill();
    }
    ox.globalAlpha = 1; ox.globalCompositeOperation = 'source-over';
  };

  /* ---------- Offerings rail ---------- */
  const rail = $('.rail'), track = $('.rail-track'), panels = $$('.panel'), countB = $('.rail-count b'), bar = $('.rail-bar');
  let railP = 0, railActive = 0;
  const updateRail = () => {
    if (wide.matches) {
      const r = rail.getBoundingClientRect(), total = r.height - innerHeight;
      railP = clamp(-r.top / Math.max(1, total));
      const max = track.scrollWidth - innerWidth;
      track.style.transform = `translate3d(${-railP * max}px,0,0)`;
      bar.style.setProperty('--p', railP.toFixed(4));
      panels.forEach((p, i) => {
        const pr = p.getBoundingClientRect(), c = (pr.left + pr.width / 2) / innerWidth;
        p.style.setProperty('--draw', reduce ? 1 : clamp(1.25 - Math.abs(c - .5) * 1.6).toFixed(3));
      });
      railActive = clamp(Math.round(railP * (panels.length - 1)), 0, panels.length - 1);
      const s = String(railActive + 1).padStart(2, '0'); if (countB.textContent !== s) countB.textContent = s;
    } else {
      track.style.transform = '';
      panels.forEach(p => { const pr = p.getBoundingClientRect(); p.style.setProperty('--draw', reduce ? 1 : clamp((innerHeight - pr.top) / (innerHeight * .7)).toFixed(3)); });
    }
  };

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, n = +el.dataset.count, t0 = performance.now(), D = reduce ? 1 : 1500;
    const step = now => { const k = clamp((now - t0) / D); el.textContent = Math.round(easeOut(k) * n); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- Seven ways: planets ---------- */
  const system = $('.system'), planets = $$('.planets button'), core = $('.sun-core'), wT = $('[data-w-t]'), wD = $('[data-w-d]'), wG = $('[data-w-g]');
  let sysRot = 0, sysHover = false;
  planets.forEach((b, i) => {
    b.dataset.label = b.textContent.trim(); b.dataset.a = i / planets.length * Math.PI * 2; b.dataset.r = i % 2 ? .34 : .48;
    b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') return;
      planets.forEach(x => x.setAttribute('aria-pressed', x === b));
      core.style.setProperty('--w', getComputedStyle(b).getPropertyValue('--c').trim() || C.orchid);
      core.classList.remove('swap'); void core.offsetWidth; core.classList.add('swap');
      wT.textContent = b.dataset.label; wD.textContent = b.dataset.d; wG.setAttribute('href', '#' + b.dataset.g);
    });
  });
  system.addEventListener('pointerenter', () => sysHover = true); system.addEventListener('pointerleave', () => sysHover = false);
  const drawSystem = dt => {
    if (!reduce && !sysHover) sysRot += dt * .00008;
    const W = system.offsetWidth;
    planets.forEach(b => {
      const a = +b.dataset.a + sysRot * (+b.dataset.r < .4 ? 1.5 : 1), r = +b.dataset.r * W;
      b.style.transform = `translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)`;
    });
  };
  core.style.setProperty('--w', C.orchid);

  /* ---------- Circle: eight channels ---------- */
  const eight = $('.eight'), linesG = $('.eight .lines');
  const eCols = [C.orchid, C.aqua, C.coral, C.amber, C.cobalt, C.emerald, C.gold, C.orchid];
  const mid = document.createElement('div'); mid.className = 'mid'; eight.prepend(mid);
  const pts = Array.from({ length: 8 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 4; return [Math.cos(a) * 80, Math.sin(a) * 80]; });
  const dots = pts.map(([x, y], i) => {
    const d = document.createElement('i'); if (i >= 3) d.className = 'z'; d.style.setProperty('--c', eCols[i]); eight.appendChild(d);
    pts.forEach(([x2, y2], j) => { if (j > i) { const l = document.createElementNS('http://www.w3.org/2000/svg', 'line'); l.setAttribute('x1', x); l.setAttribute('y1', y); l.setAttribute('x2', x2); l.setAttribute('y2', y2); l.setAttribute('stroke', eCols[i]); l.setAttribute('opacity', '.35'); linesG.appendChild(l); } });
    return d;
  });
  const drawEight = t => {
    const w = eight.offsetWidth, rot = reduce ? 0 : t * .00006;
    linesG.setAttribute('transform', `rotate(${rot * 57.3})`);
    dots.forEach((d, i) => { const a = -Math.PI / 2 + i * Math.PI / 4 + rot, s = 1 + (reduce ? 0 : .25 * Math.sin(t * .002 + i)); d.style.transform = `translate(${Math.cos(a) * .4 * w}px, ${Math.sin(a) * .4 * w}px) scale(${s})`; });
  };

  /* ---------- Language of Light: spectrum flower ---------- */
  const lol = $('#light'), fc = $('canvas.field'), fx = fc.getContext('2d');
  let FW = 0, FH = 0, trail = [], hold = 0, holding = false, soundOn = false, actx = null, gain = null;
  const sizeField = () => { FW = lol.offsetWidth; FH = lol.offsetHeight; fc.width = FW * DPR; fc.height = FH * DPR; };
  sizeField(); addEventListener('resize', sizeField);
  lol.addEventListener('pointermove', e => {
    const r = fc.getBoundingClientRect(), hue = (performance.now() * .05) % 360;
    for (let k = 0; k < 2; k++) trail.push({ x: e.clientX - r.left + (Math.random() - .5) * 6, y: e.clientY - r.top + (Math.random() - .5) * 6, vx: (Math.random() - .5) * .4, vy: -Math.random() * .5, life: 1, h: hue });
    if (trail.length > 420) trail.splice(0, trail.length - 420);
  }, { passive: true });
  const tune = $('.tune-btn'), ring = $('.tune-btn .ring circle'), soundBtn = $('.sound');
  tune.addEventListener('pointerdown', e => { e.preventDefault(); holding = true; e.pointerId != null && tune.setPointerCapture && tune.setPointerCapture(e.pointerId); if (soundOn) audio(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => tune.addEventListener(ev, () => holding = false));
  tune.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); holding = true; if (soundOn) audio(); } });
  tune.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') holding = false; });
  tune.addEventListener('contextmenu', e => e.preventDefault());
  soundBtn.addEventListener('click', () => { soundOn = !soundOn; soundBtn.setAttribute('aria-pressed', soundOn); soundBtn.textContent = soundOn ? 'Sound on' : 'Sound off'; if (soundOn) audio(); });
  function audio() {
    if (actx) return;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    actx = new AC(); gain = actx.createGain(); gain.gain.value = 0;
    const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
    [[174.6, 0], [261.6, .4], [392, .25], [523.3, .12]].forEach(([f, v], i) => {
      const o = actx.createOscillator(), g = actx.createGain(); o.type = i ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = (Math.random() - .5) * 8; g.gain.value = i ? v * .35 : .3; o.connect(g).connect(lp); o.start();
    });
    lp.connect(gain).connect(actx.destination);
  }
  const drawField = (t, dt) => {
    hold = clamp(hold + (holding ? dt / 2400 : -dt / 1400));
    ring.style.strokeDashoffset = 566 * (1 - hold);
    ring.style.stroke = `hsl(${(t * .06) % 360} 90% 70%)`;
    if (gain) gain.gain.setTargetAtTime(soundOn ? hold * .16 : 0, actx.currentTime, .12);
    fx.setTransform(DPR, 0, 0, DPR, 0, 0); fx.clearRect(0, 0, FW, FH);
    fx.globalCompositeOperation = 'lighter';
    for (const p of trail) { p.x += p.vx; p.y += p.vy; p.life -= dt / 2200; }
    trail = trail.filter(p => p.life > 0);
    for (const p of trail) { fx.fillStyle = `hsla(${p.h} 90% 70% / ${p.life * .6})`; fx.beginPath(); fx.arc(p.x, p.y, 1.4 + p.life * 1.8, 0, 6.283); fx.fill(); }
    // idle breath so the section is never empty, then the bloom on hold
    const br = tune.getBoundingClientRect(), fr = fc.getBoundingClientRect();
    const cx = br.left + br.width / 2 - fr.left, cy = br.top + br.height / 2 - fr.top;
    const idle = reduce ? .5 : (Math.sin(t * .0012) * .5 + .5);
    const eff = Math.max(hold, .3 + idle * .15);
    const R = 46 + eff * Math.min(FW, FH) * .17;
    const ringsN = Math.ceil(eff * 3);
    const centres = [[0, 0]];
    for (let rg = 1; rg <= 2; rg++) for (let k = 0; k < 6 * rg; k++) {
      const a = Math.floor(k / rg) * Math.PI / 3, b = (Math.floor(k / rg) + 2) * Math.PI / 3, f = k % rg;
      centres.push([Math.cos(a) * R * rg + Math.cos(b) * R * f, Math.sin(a) * R * rg + Math.sin(b) * R * f]);
    }
    fx.save(); fx.translate(cx, cy); fx.rotate(t * .00008 + hold * .8);
    centres.forEach(([x, y], i) => {
      const ri = i === 0 ? 0 : i <= 6 ? 1 : 2; if (ri >= ringsN) return;
      const local = clamp(eff * 3 - ri), hue = (i * 27 + t * .03) % 360;
      fx.strokeStyle = `hsla(${hue} 90% 68% / ${.65 * local})`; fx.lineWidth = 1.2;
      fx.beginPath(); fx.arc(x, y, R, 0, Math.PI * 2 * local); fx.stroke();
    });
    const g = fx.createRadialGradient(0, 0, 0, 0, 0, R * 3.2);
    g.addColorStop(0, `hsla(${(t * .03) % 360} 90% 70% / ${.25 * eff})`); g.addColorStop(.5, `hsla(${(t * .03 + 120) % 360} 90% 60% / ${.12 * eff})`); g.addColorStop(1, 'rgba(0,0,0,0)');
    fx.fillStyle = g; fx.beginPath(); fx.arc(0, 0, R * 3.2, 0, 6.283); fx.fill();
    fx.restore();
    fx.globalCompositeOperation = 'source-over';
  };

  /* ---------- Booking ---------- */
  const form = $('form.form'), sent = $('.sent', form), fMsg = $('#f-msg');
  const prefill = offer => {
    if (offer) { const r = form.querySelector(`input[name=offer][value="${offer}"]`); if (r) r.checked = true; }
    if (chosenArea && !fMsg.value) fMsg.value = `I'm carrying: ${chosenArea}.`;
  };
  $$('[data-offer]').forEach(a => a.addEventListener('click', () => prefill(a.dataset.offer)));
  oGo.addEventListener('click', () => prefill(oGo.dataset.offer));
  $$('[data-book]').forEach(a => a.addEventListener('click', () => prefill(chosenArea ? null : offers[cur].sel)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = $('#f-name'), em = $('#f-email');
    const bad = !n.value.trim() ? n : !/^\S+@\S+\.\S+$/.test(em.value.trim()) ? em : null;
    if (bad) { bad.focus(); bad.classList.add('bad'); setTimeout(() => bad.classList.remove('bad'), 1600); return; }
    const offer = (form.querySelector('input[name=offer]:checked') || {}).value || '';
    const where = (form.querySelector('input[name=where]:checked') || {}).value || '';
    const body = `Hello Emily,\n\nI'd love to book a session.\n\nName: ${n.value.trim()}\nEmail: ${em.value.trim()}\nSession: ${offer}\nWhere: ${where}\n\n${fMsg.value.trim()}\n`;
    location.href = `mailto:emilysdance@yahoo.com?subject=${encodeURIComponent('Session request: ' + offer)}&body=${encodeURIComponent(body)}`;
    sent.classList.add('show');
  });
  $('form.notify').addEventListener('submit', e => {
    e.preventDefault(); const v = e.target.email.value.trim(); if (!/^\S+@\S+\.\S+$/.test(v)) { e.target.email.focus(); return; }
    location.href = `mailto:emilysdance@yahoo.com?subject=${encodeURIComponent('Please add me to the circle list')}&body=${encodeURIComponent('Hello Emily,\n\nPlease tell me when the next group channeling circle is.\n\n' + v)}`;
  });

  /* ---------- FAQ ---------- */
  $$('.qa button').forEach(b => b.addEventListener('click', () => {
    const qa = b.parentElement, open = qa.hasAttribute('data-open');
    qa.toggleAttribute('data-open', !open); b.setAttribute('aria-expanded', !open);
  }));

  /* ---------- Nav + menu ---------- */
  const nav = $('.nav'), burger = $('.burger');
  burger.addEventListener('click', () => {
    const o = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    if (lenis) o ? lenis.stop() : lenis.start();
  });
  const closeMenu = () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', false); burger.setAttribute('aria-label', 'Open menu'); if (lenis) lenis.start(); };
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Veil on long jumps ---------- */
  const veil = document.createElement('div'); veil.className = 'veil'; document.body.appendChild(veil);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); const el = id === '#top' ? document.body : $(id); if (!el) return;
    e.preventDefault(); closeMenu();
    const far = Math.abs(el.getBoundingClientRect().top) > innerHeight * 1.6;
    if (reduce || !far) { scrollToEl(el); return; }
    veil.style.setProperty('--vx', (e.clientX || innerWidth / 2) + 'px'); veil.style.setProperty('--vy', (e.clientY || innerHeight / 2) + 'px');
    veil.classList.add('on');
    setTimeout(() => { scrollToEl(el, true); requestAnimationFrame(() => veil.classList.remove('on')); }, 420);
  }));

  /* ---------- Cursor + magnetic ---------- */
  if (fine && !reduce) {
    root.classList.add('has-cursor');
    const cu = document.createElement('div'); cu.className = 'cursor'; cu.innerHTML = '<span class="cursor-label"></span>';
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    document.body.append(cu, dot);
    const label = $('.cursor-label', cu);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate3d(${mx}px,${my}px,0)`; cu.classList.remove('hide'); dot.classList.remove('hide'); cu.classList.add('live'); dot.classList.add('live'); }, { passive: true });
    document.addEventListener('pointerleave', () => { cu.classList.add('hide'); dot.classList.add('hide'); });
    (function loop() { cx = lerp(cx, mx, .2); cy = lerp(cy, my, .2); cu.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('a, button, label');
      cu.classList.toggle('hot', !!t);
      label.textContent = t ? (t.matches('.tune-btn') ? 'Hold' : t.closest('.swatches, .planets') ? 'Tap' : t.closest('.btn, .go') ? 'Open' : '') : '';
    });
    $$('.btn, .tune-btn').forEach(b => {
      const k = b.matches('.tune-btn') ? .16 : .26;
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * k}px ${(e.clientY - r.top - r.height / 2) * k}px`; });
      b.addEventListener('pointerleave', () => { b.style.transition = 'translate .7s cubic-bezier(.22,1,.36,1), transform .5s'; b.style.translate = ''; setTimeout(() => b.style.transition = '', 700); });
    });
  }

  /* ---------- One loop ---------- */
  const hero = $('.hero'), mcta = $('.mcta'), book = $('#book'), sun = $('.sun'), finale = $('.finale');
  const vis = new Map();
  const vio = new IntersectionObserver(es => es.forEach(e => vis.set(e.target, e.isIntersecting)), { rootMargin: '100px' });
  [hero, orbSec, lol, system, eight].forEach(el => { vis.set(el, false); vio.observe(el); });
  const toned = $$('main > [data-tone], main > .rail');
  const prog = (el, s = 1, e = 0) => { const r = el.getBoundingClientRect(); return clamp((innerHeight * s - r.top) / (r.height + innerHeight * (s - e))); };
  let lastY = -1, lastT = performance.now();

  function frame(t) {
    const dt = Math.min(64, t - lastT); lastT = t;
    const y = scrollY;
    if (!document.hidden) drawStars(t, y);
    if (vis.get(hero)) {
      drawAura(t); drawOrbit(dt);
      if (ink) ink(t, px, py, auraNow, bNow);
      if (autoOn && t - autoT0 > CYCLE) setOffer((cur + 1) % offers.length);
    }
    if (vis.get(orbSec)) drawOrb(t, dt);
    if (vis.get(system)) drawSystem(dt);
    if (vis.get(eight)) drawEight(t);
    if (vis.get(lol) || hold > 0 || trail.length) drawField(t, dt);

    if (y !== lastY) {
      if (!document.body.classList.contains('menu-open')) nav.classList.toggle('hide', y > lastY && y > innerHeight * .8);
      updateRail();
      sun.style.setProperty('--rise', (60 - prog(finale, 1, .3) * 55).toFixed(1) + '%');
      if (vis.get(hero) && !reduce) { $('.hero-left').style.transform = `translate3d(0, ${y * -.12}px, 0)`; $('.hero-right').style.transform = `translate3d(0, ${y * -.06}px, 0)`; portal.style.transform = `translate3d(0, ${y * .08}px, 0)`; }
      const br = book.getBoundingClientRect();
      const ar = orbSec.getBoundingClientRect(), inView = r => r.top < innerHeight && r.bottom > 0;
      mcta.classList.toggle('show', y > innerHeight * .9 && !inView(br) && !inView(ar) && !inView(lol.getBoundingClientRect()));
      lastY = y;
    }
    // the sky takes the colour of whatever sits in the middle of the screen
    const midY = innerHeight * .5;
    for (const s of toned) {
      const r = s.getBoundingClientRect();
      if (r.top <= midY && r.bottom >= midY) {
        let n = s.dataset.tone;
        if (s === rail) n = wide.matches ? panels[railActive].dataset.tone : (panels.find(p => { const pr = p.getBoundingClientRect(); return pr.top <= midY && pr.bottom >= midY; }) || panels[0]).dataset.tone;
        if (s === orbSec && auraTone) n = auraTone;
        if (s === hero) n = ['orchid', 'aqua', 'coral', 'amber'][cur];
        setTone(n); break;
      }
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', () => { lastY = -1; });
  requestAnimationFrame(frame);
})();
