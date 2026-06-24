// Bespoke SVG animation hooks.
//
// Most reveals are pure CSS: an SVG element with class="fragment" gets `.visible`
// toggled by reveal.js on a click, and CSS (see viz.css) runs the motion.
//
// This module covers the other case — where clicking one element must animate a
// *different* one. Such a fragment carries:
//   data-anim="<class>"          class to toggle on the target
//   data-anim-target="<selector>" target within the slide (default: first svg)
// On reverse navigation the class is removed again.

function registerAnim(Reveal) {
  Reveal.on("fragmentshown", (e) => triggerAnim(e.fragment, false));
  Reveal.on("fragmenthidden", (e) => triggerAnim(e.fragment, true));
}

function triggerAnim(fragmentEl, remove) {
  const animClass = fragmentEl.dataset.anim;
  if (!animClass) return;
  const section = fragmentEl.closest("section");
  if (!section) return;
  const sel = fragmentEl.dataset.animTarget;
  const targets = sel
    ? section.querySelectorAll(sel)
    : [section.querySelector("svg")];
  targets.forEach((t) => t && t.classList.toggle(animClass, !remove));
}

window.registerAnim = registerAnim;
