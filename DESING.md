# Guía de Diseño - Slack Clone

## Tipografía

### Fuente Principal

**Lato** (Google Fonts)

- Fuente utilizada por Slack en su interfaz de chat
- Pesos: 400 (Regular), 700 (Bold), 900 (Black)
- URL: https://fonts.google.com/specimen/Lato

### Implementación

```css
font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Fallbacks

Si Lato no carga, el sistema usa:

1. `-apple-system` - Fuente del sistema en macOS/iOS
2. `BlinkMacSystemFont` - Fuente del sistema en Chrome/Edge
3. `Segoe UI` - Fuente del sistema en Windows
4. `sans-serif` - Fuente genérica sans-serif del navegador
