// Build a single self-contained HTML file from index.html by inlining every
// slide partial. At runtime index.html pulls slides in over fetch (js/includes.js),
// which needs an HTTP server; this produces a file you can open directly from disk.
//
// It walks the markup replacing each
//   <div data-include="slides/<name>.html"></div>
// with the contents of that file, repeating until none remain (so an included
// file may itself contain further data-include elements, matching includes.js).
//
// Usage: node scripts/build-static.js  ->  writes static-slides.html

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "index.html");
const outputPath = path.join(root, "static-slides.html");

// Matches an element carrying a data-include attribute, capturing the path.
// Mirrors includes.js: the whole element (outerHTML) is replaced by the file.
// const includeRe = /<([a-zA-Z0-9-]+)\b[^>]*\bdata-include="([^"]+)"[^>]*>\s*<\/\1>/;
const includeRe = /<div data-include="([^"]+)"><\/div>/;

function inlineIncludes(html) {
  let match;
  while ((match = includeRe.exec(html))) {
    const [whole, includePath] = match;
    const filePath = path.join(root, includePath);
    let replacement;
    try {
      replacement = fs.readFileSync(filePath, "utf8").trimEnd();
    } catch (err) {
      console.error(`[build-static] failed to read ${includePath}: ${err.message}`);
      replacement = `<section><h2>Missing include</h2><p class="muted">${includePath}</p></section>`;
    }
    html = html.slice(0, match.index) + replacement + html.slice(match.index + whole.length);
  }
  return html;
}

function main() {
  let html = fs.readFileSync(inputPath, "utf8");

  // includes.js stays in: main.js still calls loadIncludes(), which now finds no
  // data-include elements and resolves immediately. Removing it would throw.
  html = inlineIncludes(html);

  fs.writeFileSync(outputPath, html);
  console.log(`Wrote ${path.relative(root, outputPath)}`);
}

main();
