// Orchestrator: pull in the slide partials, then start reveal.js, then wire the
// animation hooks. Loaded last (after the vendored reveal.js + notes plugin and
// our includes.js / anim.js helpers).

(async function () {
  await loadIncludes(); // inject slides/*.html before Reveal reads the DOM

  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: "slide",
    plugins: [RevealNotes],
  });

  registerAnim(Reveal);
})();
