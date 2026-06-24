// HTML partial loader. reveal.js has no native include for HTML slides, so each
// slide lives in its own file under slides/ and is pulled in here before
// Reveal.initialize. Any element with data-include="path" is replaced by the
// fetched file's markup. Runs recursively so an included file can itself
// contain further data-include elements.
//
// Requires serving over HTTP (fetch); we already do for the notes plugin.

async function loadIncludes(root = document) {
  let pending = [...root.querySelectorAll("[data-include]")];
  while (pending.length) {
    await Promise.all(
      pending.map(async (el) => {
        const url = el.getAttribute("data-include");
        el.removeAttribute("data-include"); // guard against reprocessing
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          el.outerHTML = await res.text();
        } catch (err) {
          console.error(`[includes] failed to load ${url}:`, err);
          el.outerHTML = `<section><h2>Missing include</h2><p class="muted">${url}</p></section>`;
        }
      }),
    );
    pending = [...root.querySelectorAll("[data-include]")]; // catch nested
  }
}

window.loadIncludes = loadIncludes;
