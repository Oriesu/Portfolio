# Portfolio — Oriesu

Portfolio personal de **Javi (Oriesu)**, estudiante de Ingeniería Informática y Administración y Dirección de Empresas y desarrollador de software.

**Sitio público:** https://oriesu.netlify.app/

## Proyectos destacados

| Proyecto | Descripción | Enlace |
| --- | --- | --- |
| a11y-engine | Motor de auditoría de accesibilidad web; en desarrollo, repositorio privado. | [Portfolio](https://oriesu.netlify.app/#proyectos) |
| UrOwnKeyboard | Gestor de distribuciones de teclado para Linux, con editor y CLI. | [Código](https://github.com/Oriesu/UrOwnKeyboard) |
| Wombo Combo | Juego social con aplicación móvil y versión web. | [Web](https://wombocombo.netlify.app/) |
| Fonycon | Sitio web corporativo publicado. | [Web](https://fonycon.es/) |
| Dvorak para programar | Distribución de teclado para programación en español. | [Código](https://github.com/Oriesu/Dvorak-para-programacion-en-espanol) |
| Skylbot | Bot colaborativo para Discord. | [Código](https://github.com/nestx0/Skylbot) |

## Tecnologías del portfolio

Sitio estático con **HTML, CSS y JavaScript** sin frameworks de interfaz. Incluye filtros interactivos, diseño adaptable y enlaces a proyectos publicados.

## Desarrollo local

No requiere instalar dependencias de terceros:

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000/`.

## Actualizar los proyectos

1. Edita `projects.js`, el catálogo de proyectos.
2. Regenera las tarjetas HTML estáticas con Node.js 18 o posterior:

```bash
node scripts/prerender.mjs
node scripts/prerender.mjs --check
```

3. Publica los cambios de `projects.js` e `index.html` juntos.

Las tarjetas están **prerenderizadas en `index.html`** para que los enlaces y descripciones sean accesibles sin ejecutar JavaScript. `script.js` conserva el filtrado y la experiencia interactiva. El script de generación reutiliza el renderizador existente para evitar duplicar manualmente el contenido. En caso de fallo de JavaScript, las tarjetas siguen visibles; los filtros se ocultan si JavaScript está desactivado.

## Descubrimiento y SEO

La página incluye título y descripción, URL canónica, Open Graph, datos estructurados básicos, `robots.txt` y `sitemap.xml`. Esto mejora el acceso al contenido por rastreadores, pero **no garantiza que los buscadores la indexen o posicionen**.

## Autor

[Javi / Oriesu en GitHub](https://github.com/Oriesu) · [Linktree](https://linktr.ee/Oriesu)
