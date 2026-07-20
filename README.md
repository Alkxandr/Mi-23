# Para nosotros

Una experiencia romántica de scroll storytelling, preparada para publicarse sin servidor en GitHub Pages. Está construida únicamente con HTML, CSS y JavaScript nativos.

## Estado del proyecto

**Fases 1–11 — Proyecto completo, revisado y listo para personalizar/publicar.**

La experiencia se construirá en capítulos, de modo que el video sea el clímax y no la introducción:

1. Arquitectura y configuración
2. Dirección UX y narrativa
3. Estructura HTML semántica
4. Sistema visual y responsive
5. Interacciones JavaScript
6. Animaciones cinematográficas
7. Galería y lightbox
8. Reproductor de video
9. Contador de la relación
10. Optimización, SEO y accesibilidad
11. Revisión integral

## Dirección UX — Fase 2

### Principio narrativo

La experiencia no cuenta una cronología: revela una certeza. Cada capítulo reduce el ruido visual y emocional hasta dejar espacio para el video, que funciona como la declaración central. Después, el cierre devuelve la emoción al visitante mediante una celebración íntima.

### Recorrido emocional

| Capítulo | Sensación | Gesto de la persona que visita | Recurso visual |
| --- | --- | --- | --- |
| 1. El umbral | Intriga y calma | Pulsa «Comenzar» | Luna, estrellas, neblina y profundidad | 
| 2. El reencuentro | Destino | Observa dos luces acercarse | Dos destellos que forman un corazón |
| 3. Las señales | Intuición | Continúa con el scroll | Luna y tres trazos fugaces |
| 4. Volver a empezar | Calidez | Descubre frases que aparecen | Ritmo de palabras y fotografías | 
| 5. Lo cotidiano | Alegría | Explora la galería | Tarjetas grandes y lightbox | 
| 6. Elegirnos | Certeza | Se detiene ante la promesa | Luz dorada, anillo abstracto | 
| 7. Cerca a la distancia | Conexión | Sigue una línea entre dos lugares | Mapa mínimo, pulsos luminosos | 
| 8. La película | Culminación | Inicia el video | Reproductor inmersivo de cristal | 
| 9. La respuesta | Gratitud | Abre el final | Estrellas descendentes y celebración |

### Lenguaje visual

- **Color:** un fondo azul noche casi negro preserva la intimidad. Los morados y rosas viven en halos borrosos, y el dorado solo señala momentos de elección.
- **Tipografía:** una serif editorial para las frases principales y una sans-serif limpia para controles, contador y etiquetas. El contraste entre ambas evita una estética infantil.
- **Movimiento:** lento al comenzar, fluido durante el reencuentro y contenido al llegar al video. Se respetará `prefers-reduced-motion` para que la experiencia siga siendo cómoda.
- **Espacio:** una sola idea por pantalla. Las frases aparecerán en bloques breves, con silencio visual entre capítulos.
- **Interacción:** no habrá menú. Solo scroll, un inicio consciente, la galería, los controles de música y el gesto final.

### Guion de microcopy

Las frases serán originales, breves y editables. Este es el guion inicial que se llevará a la interfaz en la Fase 3:

```text
1  No todas las historias terminan cuando creemos.
2  Algunas rutas se alejan / para aprender a volver.
3  Tres señales atravesaron la noche. / Y una de ellas abrió el camino.
4  Una conversación. / Una sonrisa. / Sin darnos cuenta, volvimos a empezar.
5  No fueron los lugares. / Fueron los momentos.
6  No hizo falta prometer el mundo. / Bastó con elegirnos.
7  Hay kilómetros entre nosotros. / Pero nunca han podido alejarnos.
9  Gracias por regresar. / Gracias por quedarte. / Gracias por elegirme.
```

### Diseño responsive

- **Móvil:** lectura a una mano, controles grandes y galerías horizontales donde sea conveniente.
- **Tablet:** más aire alrededor del contenido y composición en dos columnas solo cuando no afecte la narrativa.
- **Escritorio:** parallax sutil, luces amplias y fotografías de mayor presencia.

### Decisiones de accesibilidad y rendimiento

- Contraste alto para todo texto importante y controles operables con teclado.
- Las fotos y el video cargarán solo al aproximarse a su capítulo.
- La música y el video siempre requieren una acción explícita.
- Se evitarán bibliotecas externas y animaciones que bloqueen la lectura o el desplazamiento.

## Estructura

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/       # Fotos, portada social y miniatura del video
│   ├── videos/       # Video principal
│   ├── audio/        # Música opcional, activada solo por la persona que visita
│   ├── icons/        # Favicon e iconos propios
│   └── fonts/        # Fuentes locales, si se eligen
└── README.md
```

## Personalizar los recuerdos

### Imágenes

Guarda las fotos optimizadas en `assets/images/`. Se usarán con carga diferida (`loading="lazy"`) en la galería. Recomendación: WebP, menos de 500 KB por imagen y al menos 1600 px en el lado largo.

Para el enlace compartido en WhatsApp o redes, agrega una imagen horizontal de **1200 × 630 px** con el nombre `og-cover.jpg` en la misma carpeta. Antes de compartir públicamente, convierte las rutas de `og:image` y `twitter:image` en `index.html` a la URL completa de la imagen publicada.

### Video

Coloca el archivo final en `assets/videos/video-principal.mp4`. El reproductor mostrará una miniatura propia antes de iniciarlo. Para una carga ágil, exporta el video en H.264, con audio AAC y resolución 1080p o menor.

### Música

Coloca la pista en `assets/audio/nuestra-cancion.mp3`. La música nunca se reproducirá automáticamente: aparecerá un control flotante para iniciarla o pausarla.

### Textos

Las frases narrativas se concentrarán al inicio de `script.js`, como una pequeña configuración editable. Así podrás personalizar el relato sin tocar la lógica de animaciones.

### Contador

La fecha oficial se configurará en `script.js` en formato ISO local:

```js
const RELATIONSHIP_START = "2026-05-20T00:00:00-05:00";
```

Sustituye el ejemplo por su fecha oficial. El contador mostrará años, meses, días, horas, minutos y segundos.

## Publicar con GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos conservando esta estructura.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Elige la rama `main` y la carpeta `/ (root)`.
5. Guarda los cambios. GitHub mostrará la URL pública cuando termine de publicar.

No se requiere backend ni instalación de dependencias.

## Antes de compartir

- Reemplaza fotos, video, música y fecha de inicio.
- Crea `assets/images/video-poster.webp` para la miniatura del video.
- Crea `assets/images/og-cover.jpg` para la vista previa al compartir.
- Comprueba la experiencia en un teléfono y en un computador.
- Abre la URL publicada en una ventana privada para confirmar que todos los recursos cargan correctamente.

## Revisión final

La estructura, el JavaScript y los enlaces internos fueron revisados. Antes de publicar, añade estos recuerdos personales (se dejaron fuera intencionalmente):

- `assets/audio/nuestra-cancion.mp3`
- `assets/videos/video-principal.mp4`
- `assets/images/video-poster.webp`
- `assets/images/og-cover.jpg`
- `assets/images/momento-01.webp` a `momento-03.webp`
- `assets/images/galeria-01.webp` a `galeria-04.webp`

Cuando estén en su lugar, recarga la página y prueba el video, música, galería y botón final en tu teléfono antes de compartir el enlace.
