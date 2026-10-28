/*
 * "Powered by Drifted Marketing" footer credit (badge C, Arc Gap, 27 Oct 2026).
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
.dm-credit-c{--lime:#AFE304;--glow:#AFE304;--core:#F7FFE3;--face:#F2F0EA;--ink:#F2F0EA;--sub:#F2F0EA80;--lit:#DEFF7E;all:initial;box-sizing:border-box;display:inline-flex;align-items:center;height:48px;padding:0 4px;cursor:pointer;-webkit-tap-highlight-color:transparent;font:italic 900 14px/1.1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);vertical-align:middle}
.dm-credit-c--light{--lime:#0A0A0B57;--glow:#AFE304;--core:#0A0A0B;--face:#0A0A0B;--ink:#0A0A0B;--sub:#0A0A0B8c;--lit:#4B600A}
.dm-credit-c *{box-sizing:border-box}
.dm-credit-c svg{display:block;width:76px;height:48px;max-width:none;flex:none;overflow:visible}
.dm-credit-c-t{display:flex;flex-direction:column;gap:2px;white-space:nowrap;padding-left:2px}
.dm-credit-c-k{font-size:8.5px;font-style:normal;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--sub)}
.dm-credit-c-n{letter-spacing:-.02em;transition:color .12s,text-shadow .12s}
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
.dm-credit-c:hover .dm-credit-c-n,.dm-credit-c:focus-visible .dm-credit-c-n{color:var(--lit);text-shadow:0 0 12px color-mix(in srgb,var(--glow) 60%,transparent)}
.dm-credit-c:focus-visible{outline:2px solid var(--glow);outline-offset:3px;border-radius:4px}
@keyframes dm-credit-c-k{0%{opacity:1}33.3%,100%{opacity:0}}
@keyframes dm-credit-c-snap{0%,84%{opacity:.16}85%{opacity:1}87%{opacity:.1}89%{opacity:1}92%,100%{opacity:.16}}
@keyframes dm-credit-c-kick{0%,84%{transform:none}85%,91%{transform:translate(-.6px,-.5px)}92%,100%{transform:none}}
@keyframes dm-credit-c-hold{0%{opacity:1}46%{opacity:1}48%{opacity:.35}50%{opacity:1}100%{opacity:1}}
@keyframes dm-credit-c-buzz{0%{transform:translate(-.7px,-.5px)}50%{transform:translate(.3px,.2px)}}
@media (prefers-reduced-motion:reduce){.dm-credit-c *{animation:none!important;transition:none!important}.dm-credit-c-a{opacity:.16}.dm-credit-c-a>g+g{opacity:0}.dm-credit-c:hover .dm-credit-c-a{opacity:1}}
</style><svg viewBox="0 0 76 48" aria-hidden="true" focusable="false"><defs><filter id="dm-credit-c-blur" x="-20%" y="-80%" width="140%" height="260%"><feGaussianBlur stdDeviation="1.8"/></filter><path id="dm-credit-c-p" fill-rule="evenodd" d="M14 10 H48 C74 10 88 26 88 50 C88 74 74 90 48 90 H14 Z M46 40 H54 C64 40 70 47 70 58 C70 69 64 76 54 76 H46 Z"/><path id="dm-credit-c-1" d="M36 25 L39.5 22 L42 26.5 L47 20.5 L48.5 24 L54 18.5 L57.5 27 L61 23 L65.5 25.5 L70 21.5 L76 24 M47 20.5 L49 15 L52 13 M57.5 27 L59 31.5"/><path id="dm-credit-c-2" d="M36 25 L40 27.5 L43.5 21 L47.5 25 L50 17.5 L55.5 26 L58 22.5 L63 28.5 L67 22 L71 25.5 L76 23.5 M50 17.5 L48 12.5 M63 28.5 L66 33 L65 36"/><path id="dm-credit-c-3" d="M36 25 L41.5 23 L44 29 L49 22.5 L53 25 L56.5 16.5 L60 24 L64.5 21 L68 27 L72 22.5 L76 25 M56.5 16.5 L60 12 M44 29 L42 33.5"/></defs><g transform="translate(3 6) scale(.36)"><g class="dm-credit-c-sh"><use href="#dm-credit-c-p" fill="var(--lime)" transform="rotate(-3.5 50 50) translate(-9 -7.8)"/></g><use href="#dm-credit-c-p" fill="var(--face)"/></g><g class="dm-credit-c-a" fill="none" stroke-linejoin="round" stroke-linecap="round"><g><use href="#dm-credit-c-1" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-1" stroke="var(--core)" stroke-width="1.2"/></g><g><use href="#dm-credit-c-2" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-2" stroke="var(--core)" stroke-width="1.2"/></g><g><use href="#dm-credit-c-3" stroke="var(--glow)" stroke-width="4.5" filter="url(#dm-credit-c-blur)"/><use href="#dm-credit-c-3" stroke="var(--core)" stroke-width="1.2"/></g></g></svg><span class="dm-credit-c-t"><span class="dm-credit-c-k">Powered by</span><span class="dm-credit-c-n">Drifted Marketing</span></span>`;
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
