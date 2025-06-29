# Wooden Design Requirements

This project aims to provide a web-based tool for designing wooden materials with realistic textures and lighting. The following requirements summarize the desired features and constraints.

## Functional Requirements

- **Texture Input**: Users can select wood-plank models from a built-in library or drag-and-drop custom textures in glTF format.
- **Optical Property Controls**: Real-time adjustment of PBR parameters including roughness, metalness/specular tint, anisotropy, and sheen/clear-coat. Preset finishes (matte, satin, gloss) are available.
- **3D Preview Canvas**: A WebGL viewport with orbit controls and HDR lighting renders the wood model responsively on desktop and mobile.
- **State Persistence & Sharing**: Design settings are encoded in the URL for easy sharing via the page address.
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

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application uses Vite for development. Run `npm run dev` and open <http://localhost:5173>. Share your current design simply by copying the browser URL, which encodes all parameters.

## Material Parameters

The viewer exposes a set of physical material properties. They can be adjusted
through the on-page controls or by specifying them in the URL. Below is a quick
reference for each parameter.

| Parameter            | Description                                                        | Example                            |
| -------------------- | ------------------------------------------------------------------ | ---------------------------------- |
| `roughness`          | `0` gives a mirror-like finish, `1` results in a fully matte look. | `?roughness=0.2` for shiny varnish |
| `metalness`          | `0` behaves like wood or plastic, `1` turns the surface metallic.  | `?metalness=1`                     |
| `clearcoat`          | Strength of an extra transparent coat, useful for varnish.         | `?clearcoat=0.5`                   |
| `clearcoatRoughness` | How glossy the clearcoat itself is.                                | `?clearcoatRoughness=0.1`          |
| `specularIntensity`  | Scales the brightness of highlights.                               | `?specularIntensity=1.5`           |
| `specularColor`      | Hex color used to tint highlights.                                 | `?specularColor=%23ffffff`         |
| `sheenColor`         | Color of the fabric-like sheen effect.                             | `?sheenColor=%23ff8800`            |
| `sheenRoughness`     | Roughness of the sheen component.                                  | `?sheenRoughness=0.6`              |
| `anisotropy`         | Amount of directional reflection, simulating grain.                | `?anisotropy=0.8`                  |
| `anisotropyRotation` | Rotation of the anisotropic direction (radians).                   | `?anisotropyRotation=1.57`         |

You can combine these parameters in the query string to share a particular
look. For example:

```
?roughness=0.2&clearcoat=0.7&anisotropy=0.5
```

will load the page with a shiny, varnished appearance that shows wood grain.

## Building for GitHub Pages

To generate a static version of the site run:

```bash
npm run build
```

The built files are written to the `dist/` directory and can be deployed to GitHub Pages.
On each push to `main`, a GitHub Actions workflow automatically runs
`npm run build` and publishes this directory, so you normally do not need to
commit the built files.

### Linting and Formatting

Run the linter and formatter with:

```bash
npm run lint
npm run format
```

Open your browser's developer console to view helpful logs when models or textures are loaded. If something fails to appear, these logs can help you troubleshoot issues.
