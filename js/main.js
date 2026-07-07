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
    // Wider than the 960×700 default so long single-line captions (the five
    // instruments on the title slide) fit without wrapping; reveal scales the
    // whole box to fit the viewport.
    width: 1250,
    height: 700,
    transition: "slide",
    plugins: [RevealNotes],
  });

  registerAnim(Reveal);
})();
