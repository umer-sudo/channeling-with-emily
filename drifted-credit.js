/*
 * "Powered by Drifted Marketing" footer credit (badge C, Arc Gap, brand-font wordmark, 27 Oct 2026).
 *
 * This file is the ONLY place the badge design lives. The page holds a plain link,
 *   <a class="dm-credit-c" data-drifted-credit href="...">Powered by Drifted Marketing</a>
 * which works without JavaScript; this script fills it with the badge. To swap the design,
 * replace BADGE_MARKUP with the inner markup of the new snippet (everything between the
 * opening <a ...> and </a>) from ~/dev/drifted-studio/work/2026-10-27-footer-credit/snippets/.
 * Add the class dm-credit-c--light on the link if the footer is light.
 */
(function () {
  var UTM_SOURCE = "emily";
  var HREF = "https://driftedmarketing.com/?utm_source=" + UTM_SOURCE + "&utm_medium=footer-credit";
  var BADGE_MARKUP = `<style>
.dm-credit-c{--lime:#AFE304;--glow:#AFE304;--core:#F7FFE3;--face:#F2F0EA;--ink:#F2F0EA;--sub:#F2F0EA80;--lit:#DEFF7E;all:initial;box-sizing:border-box;display:inline-flex;align-items:center;height:48px;padding:0 4px;position:relative;cursor:pointer;-webkit-tap-highlight-color:transparent;font:600 14px/1.1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);vertical-align:middle}
.dm-credit-c--light{--lime:#0A0A0B57;--glow:#AFE304;--core:#0A0A0B;--face:#0A0A0B;--ink:#0A0A0B;--sub:#0A0A0B8c;--lit:#4B600A}
.dm-credit-c *{box-sizing:border-box}
.dm-credit-c svg{display:block;max-width:none;flex:none;overflow:visible}.dm-credit-c-m{width:76px;height:48px}
.dm-credit-c-t{display:flex;flex-direction:column;gap:4px;white-space:nowrap;padding-left:2px}
.dm-credit-c-k{font-size:8.5px;font-style:normal;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--sub)}
.dm-credit-c-w{width:134.7px;height:10.5px;fill:var(--ink);transition:fill .12s,filter .12s}.dm-credit-c-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.dm-credit-c-a{opacity:.16;animation:dm-credit-c-snap 4.2s -3.45s linear infinite}
.dm-credit-c-sh{animation:dm-credit-c-kick 4.2s -3.45s linear infinite}
.dm-credit-c-a>g{animation:dm-credit-c-k .21s steps(1,end) infinite}
.dm-credit-c-a>g:nth-child(2){animation-delay:-.07s}
.dm-credit-c-a>g:nth-child(3){animation-delay:-.14s}
.dm-credit-c:hover .dm-credit-c-a,.dm-credit-c:focus-visible .dm-credit-c-a{animation:dm-credit-c-hold .9s linear infinite}
.dm-credit-c:hover .dm-credit-c-a>g{animation-duration:.12s}
.dm-credit-c:hover .dm-credit-c-a>g:nth-child(2){animation-delay:-.04s}
.dm-credit-c:hover .dm-credit-c-a>g:nth-child(3){animation-delay:-.08s}
.dm-credit-c:hover .dm-credit-c-sh,.dm-credit-c:focus-visible .dm-credit-c-sh{animation:dm-credit-c-buzz .12s steps(1,end) infinite}
.dm-credit-c:hover .dm-credit-c-w,.dm-credit-c:focus-visible .dm-credit-c-w{fill:var(--lit);filter:drop-shadow(0 0 5px color-mix(in srgb,var(--glow) 70%,transparent))}
.dm-credit-c:focus-visible{outline:2px solid var(--glow);outline-offset:3px;border-radius:4px}
@keyframes dm-credit-c-k{0%{opacity:1}33.3%,100%{opacity:0}}
@keyframes dm-credit-c-snap{0%,84%{opacity:.16}85%{opacity:1}87%{opacity:.1}89%{opacity:1}92%,100%{opacity:.16}}
@keyframes dm-credit-c-kick{0%,84%{transform:none}85%,91%{transform:translate(-.6px,-.5px)}92%,100%{transform:none}}
@keyframes dm-credit-c-hold{0%{opacity:1}46%{opacity:1}48%{opacity:.35}50%{opacity:1}100%{opacity:1}}
@keyframes dm-credit-c-buzz{0%{transform:translate(-.7px,-.5px)}50%{transform:translate(.3px,.2px)}}
@media (prefers-reduced-motion:reduce){.dm-credit-c *{animation:none!important;transition:none!important}.dm-credit-c-a{opacity:.16}.dm-credit-c-a>g+g{opacity:0}.dm-credit-c:hover .dm-credit-c-a{opacity:1}}
</style><svg class="dm-credit-c-m" viewBox="0 0 76 48" aria-hidden="true" focusable="false"><defs><filter id="dm-credit-c-blur" x="-20%" y="-80%" width="140%" height="260%"><feGaussianBlur stdDeviation="1.8"/></filter><path id="dm-credit-c-p" fill-rule="evenodd" d="M14 10 H48 C74 10 88 26 88 50 C88 74 74 90 48 90 H14 Z M46 40 H54 C64 40 70 47 70 58 C70 69 64 76 54 76 H46 Z"/><path id="dm-credit-c-1" d="M36 25 L39.5 22 L42 26.5 L47 20.5 L48.5 24 L54 18.5 L57.5 27 L61 23 L65.5 25.5 L70 21.5 L76 24 M47 20.5 L49 15 L52 13 M57.5 27 L59 31.5"/><path id="dm-credit-c-2" d="M36 25 L40 27.5 L43.5 21 L47.5 25 L50 17.5 L55.5 26 L58 22.5 L63 28.5 L67 22 L71 25.5 L76 23.5 M50 17.5 L48 12.5 M63 28.5 L66 33 L65 36"/><path id="dm-credit-c-3" d="M36 25 L41.5 23 L44 29 L49 22.5 L53 25 L56.5 16.5 L60 24 L64.5 21 L68 27 L72 22.5 L76 25 M56.5 16.5 L60 12 M44 29 L42 33.5"/></defs><g transform="translate(3 6) scale(.36)"><g class="dm-credit-c-sh"><use href="#dm-credit-c-p" fill="var(--lime)" transform="rotate(-3.5 50 50) translate(-9 -7.8)"/></g><use href="#dm-credit-c-p" fill="var(--face)"/></g><g class="dm-credit-c-a" fill="none" stroke-linejoin="round" stroke-linecap="round"><g><use href="#dm-credit-c-1" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-1" stroke="var(--core)" stroke-width="1.2"/></g><g><use href="#dm-credit-c-2" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-2" stroke="var(--core)" stroke-width="1.2"/></g><g><use href="#dm-credit-c-3" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-3" stroke="var(--core)" stroke-width="1.2"/></g></g></svg><span class="dm-credit-c-t"><span class="dm-credit-c-k">Powered by</span><svg class="dm-credit-c-w" viewBox="0 0 1347 105" aria-hidden="true" focusable="false"><path d="M9 105v-105h47q19 0 31 6 13 6 18 18 6 12 6 29 0 17-6 28-5 12-18 18-12 6-31 6zm30-25h14q27 0 27-27 0-9-3-15-3-6-9-9-6-3-15-3h-14zm84 25v-79h28v19l-1-3q4-9 11-13 6-5 15-5 2 0 5 1 3 0 5 1l-1 24q-6-1-11-1-4 0-8 1-4 2-7 5-3 3-5 9-2 5-2 13v28zm72 0v-79h30v79zm15-85q-8 0-13-5-5-4-5-13 0-8 5-13 5-5 13-5 8 0 13 5 5 5 5 13 0 9-5 13-5 5-13 5zm34 85v-88q0-11 6-16 6-5 18-5h20v20h-11q-2 0-3 1 0 1 0 3v85zm-9-58v-21h51v21zm91 58q-12 0-18-5-6-5-6-16v-37h-10v-21h10v-14l30-8v22h13v21h-13v34q0 2 0 3 1 1 3 1h12v20zm71 3q-12 0-22-6-10-5-16-14-7-9-7-22 0-13 6-22 6-10 16-15 10-5 23-5 7 0 14 2 7 2 13 7 5 5 9 15 4 9 4 23h-66v-14h39l-1 3q-1-6-2-9-2-4-5-6-3-1-6-1-5 0-8 3-3 3-4 8-1 5-1 11 0 9 3 15 3 6 10 6 5 0 8-3 4-2 6-7l25 6q-2 9-9 14-6 6-14 8-8 3-15 3zm80 0q-11 0-18-5-7-5-11-15-4-9-4-22 0-14 4-23 4-9 11-14 8-5 18-5 10 0 16 4 6 5 11 14h-3v-46h29v109h-28v-15l1 1q-5 9-11 13-7 4-15 4zm11-22q4 0 8-2 3-3 5-7 2-5 2-11 0-10-4-15-4-5-11-5-6 0-10 5-3 6-3 15 0 10 3 15 4 5 10 5zm81 19l6-105h48l15 86h-2l14-86h49l6 105h-30l-4-84-15 84h-38l-16-84h1l-5 84zm174 2q-8 0-15-2-6-2-11-8-4-5-4-14 0-9 5-15 6-6 16-9 10-3 22-3h10l-1 3v-5q0-6-2-9-2-3-7-3-5 0-7 3-3 2-4 7l-29-4q2-7 7-12 4-6 13-9 8-3 21-3 11 0 20 3 8 3 12 11 5 8 5 23v20q0 2 1 3 0 1 3 1h2v20h-12q-11 0-17-5-5-5-5-16v-2l5 3q0 3-2 7-2 4-5 7-3 4-8 6-5 2-13 2zm9-18q4 0 7-2 3-2 4-5 2-4 2-8v-3h-7q-6 0-9 2-4 2-5 4-1 2-1 4 0 1 0 3 1 2 3 3 1 2 6 2zm60 16v-79h28v19l-1-3q4-9 11-13 6-5 15-5 2 0 5 1 2 0 5 1l-1 24q-6-1-11-1-4 0-8 1-4 2-7 5-3 3-5 9-2 5-2 13v28zm72 0v-109h29v57l26-27h31l-28 30 29 49h-32l-16-29-10 11v18zm130 3q-12 0-22-6-10-5-16-14-6-9-6-22 0-13 6-22 6-10 16-15 10-5 22-5 7 0 14 2 7 2 13 7 6 5 10 15 3 9 3 23h-65v-14h39l-1 3q-1-6-3-9-2-4-4-6-3-1-6-1-5 0-8 3-3 3-4 8-2 5-2 11 0 9 3 15 4 6 11 6 4 0 8-3 3-2 5-7l26 6q-3 9-9 14-6 6-14 8-8 3-16 3zm79-3q-12 0-18-5-6-5-6-16v-37h-10v-21h10v-14l30-8v22h14v21h-14v34q0 2 0 3 1 1 3 1h13v20zm33 0v-79h30v79zm15-85q-8 0-13-5-5-4-5-13 0-8 5-13 5-5 13-5 8 0 13 5 5 5 5 13 0 9-5 13-5 5-13 5zm30 85v-79h28v19-3q4-9 10-13 7-5 16-5 10 0 15 5 6 4 9 12 2 8 2 18v46h-29v-45q0-7-2-11-2-3-7-3-7 0-10 6-3 7-3 21v32zm129 31q-21 0-31-5-10-5-10-16 0-7 4-11 4-3 8-5-3-2-4-5-1-3-1-6 0-5 3-8 3-4 8-5-6-4-9-10-3-5-3-12 0-9 4-15 5-7 13-10 8-4 19-4 10 0 18 4 8 3 13 10 5 6 5 15 0 8-5 14-5 7-13 10-8 4-18 4h-4q-6 0-6 3 0 2 6 2h16q7 0 13 2 5 2 9 5 4 4 6 8 2 5 2 10 0 13-10 19-10 6-32 6zm1-17h1q12 0 12-7 0-3-2-5-2-2-8-2h-8q-2 0-5 2-3 2-3 5 0 4 3 5 3 2 10 2zm0-55q4 0 6-3 2-3 2-8 0-5-2-8-2-3-6-3-4 0-7 3-2 3-2 8 0 5 2 8 3 3 7 3zm10-26v-8q0-11 6-16 6-5 18-5h6v21h-10q-2 0-3 0 0 1 0 4v4z"/></svg><span class="dm-credit-c-sr">Drifted Marketing</span></span>`;
  function mount() {
    var links = document.querySelectorAll("a[data-drifted-credit]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      a.classList.add("dm-credit-c");
      a.setAttribute("href", HREF);
      a.setAttribute("rel", "noopener");
      a.setAttribute("aria-label", "Powered by Drifted Marketing");
      a.innerHTML = BADGE_MARKUP;
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
