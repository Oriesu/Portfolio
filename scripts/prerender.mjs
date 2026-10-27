/**
 * Sincroniza las tarjetas del catálogo de projects.js con index.html.
 * Reutiliza el renderizador de script.js; no instala dependencias.
 *
 * Uso: node scripts/prerender.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInContext, createContext } from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const context = createContext({
  window: { matchMedia: () => ({ matches: false }) },
  document: {
    querySelector: () => null,
    querySelectorAll: () => [],
  },
});

runInContext(read('projects.js'), context, { filename: 'projects.js' });
runInContext(read('script.js'), context, { filename: 'script.js' });
const markup = runInContext("projects.map(projectCard).join('\\n')", context);

const filepath = resolve(root, 'index.html');
const input = read('index.html');
const start = '<!-- portfolio-projects:start -->';
const end = '<!-- portfolio-projects:end -->';
const i = input.indexOf(start);
const j = input.indexOf(end);
if (i < 0 || j <= i) {
  throw new Error('No se encuentran las marcas de tarjetas estáticas en index.html');
}
const updated = input.slice(0, i + start.length) + '\n' + markup + '\n            ' + input.slice(j);

if (process.argv.includes('--check')) {
  if (updated !== input) {
    console.error('Las tarjetas estáticas no coinciden con projects.js. Ejecuta: node scripts/prerender.mjs');
    process.exitCode = 1;
  } else {
    console.log('Las tarjetas estáticas están sincronizadas.');
  }
} else {
  if (updated !== input) writeFileSync(filepath, updated);
  console.log('Tarjetas estáticas actualizadas.');
}
