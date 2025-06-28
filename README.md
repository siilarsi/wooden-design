# Wooden Design Requirements

This project aims to provide a web-based tool for designing wooden materials with realistic textures and lighting. The following requirements summarize the desired features and constraints.

## Functional Requirements

- **Texture Input**: Users can select wood-plank models from a built-in library or drag-and-drop custom textures in glTF format.
- **Optical Property Controls**: Real-time adjustment of PBR parameters including roughness, metalness/specular tint, anisotropy, and sheen/clear-coat. Preset finishes (matte, satin, gloss) are available.
- **3D Preview Canvas**: A WebGL viewport with orbit controls and HDR lighting renders the wood model responsively on desktop and mobile.
- **State Persistence & Sharing**: Design settings are encoded in the URL for easy sharing with a "Copy link" button.
- **User Interface**: Clean, utility-first styling with a sidebar or floating panel for controls.

## Non-Functional Requirements

- **Performance**: Initial page load within 2 seconds on 3G and maintain 30 FPS during adjustments.
- **Accessibility & SEO**: Static-site generation ensures pre-rendered metadata, and all controls include ARIA labels.
- **Deployment**: Hosted on GitHub Pages with automated CI/CD.
- **Maintainability**: Type-safe codebase, linting, formatting, and modular components.

## Technical Requirements

- **Framework & Language**: Static-site generation via Astro, Gatsby, or Next.js with React and TypeScript.
- **3D & Rendering**: Implemented using `react-three-fiber` and `@react-three/drei` with GLSL-based PBR shaders and HDR environment maps.
- **State Management & Controls**: Global state managed with Zustand (or React Context) and Leva (or dat.GUI) for parameter tweaking.
- **Build & Tooling**: Vite for development, ESLint, Prettier, and TypeScript checks.

## Getting Started

Open `index.html` in a modern browser. Use the dropdown to switch between sample plank models.
You can drag and drop an image onto the drop zone or, as an alternative,
use the **Upload Texture** button to load your own wood texture.

Use the sliders to tweak roughness and metalness in real time. Click **Copy Link** to share your current design via the encoded URL parameters.

Newer builds expose additional controls for specular tint and sheen. Adjust the
specular intensity and color to tune highlights, and modify the sheen color and
roughness for velvet-like finishes.

## Local Development

The demo must be served via HTTP because browsers restrict file-based module
loading and requests due to CORS policies. Start a simple server in this
directory with:

```bash
python3 -m http.server
```

Once the server is running, open
<http://localhost:8000/index.html> in your browser.

Open your browser's developer console to view helpful logs when models or
textures are loaded. If something fails to appear, these logs can help you
troubleshoot issues.
