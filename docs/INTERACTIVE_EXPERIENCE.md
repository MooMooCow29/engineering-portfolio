# Interactive experience architecture

The `portfolio-v2` branch uses a two-layer portfolio:

1. an immersive Three.js engineering workbench for exploration;
2. the conventional evidence-led portfolio below it for fast recruiter scanning and accessible fallback.

The workbench is intentionally original. It borrows architectural ideas common to immersive WebGL portfolios (camera states, CSS3D monitor content, independent UI and world layers) but uses Karanveer Singh's own engineering projects, imagery and interaction model.

## Runtime layers

### `assets/lab.js`

Main experience coordinator. It owns:

- the Three.js scene and renderer;
- scene objects and project hotspots;
- intro and inspection camera transitions;
- drag / zoom exploration;
- project focus states;
- entry into and exit from the monitor terminal;
- the real-project evidence wall.

### `assets/experience/monitor-surface.js`

Creates the CSS3D monitor surface. It:

- instantiates a `CSS3DRenderer`;
- places a same-origin iframe into the physical monitor plane;
- keeps the terminal visible in the 3D scene;
- only enables pointer interaction when the camera enters monitor mode.

### `lab-os/index.html`

The monitor application itself. It acts as an engineering terminal for:

- selected projects;
- experience;
- technical writing;
- about/profile information;
- external links.

Project links intentionally use `target="_top"` so a user can move from the in-scene terminal to a full case study.

## Interaction states

The current workbench has four meaningful states:

- **Entry** — cinematic boot and call to enter.
- **Overview** — drag, zoom and hover across the desk.
- **Project inspection** — camera moves to a physical engineering object and exposes a project evidence panel.
- **Monitor terminal** — camera aligns with the physical monitor and enables the CSS3D KaranOS interface.

Keyboard shortcuts:

- `Enter` — enter the workbench / open a focused project.
- `0` or `M` — enter the monitor terminal.
- `1` to `6` — focus a project.
- `Esc` — return to the workbench.

## Project-to-object mapping

| Scene object | Project |
| --- | --- |
| Oscilloscope | pySignalScope |
| Controller PCB | Advanced 2WD Robot Controller |
| Robot platform | Obstacle Avoidance Robot |
| ePaper display | Batteryless ePaper research |
| Auxiliary avionics display | AURORA-VX |
| Vehicle electronics module | Formula Student Electrical Systems |
| Main monitor | KaranOS engineering terminal |

## Real evidence in the 3D environment

The wall frames use portfolio-owner-supplied project assets rather than decorative stock imagery. Current wall evidence includes:

- manufactured PCB;
- physical robot;
- AURORA-VX engineering console;
- pySignalScope measurement visualisation.

Each frame is also a project hotspot.

## Adding a future interactive project

1. Add the project record to the portfolio data layer.
2. Add or reuse a physical object in `assets/lab.js`.
3. Add the object to `projectMap` with:
   - `projectId`
   - `href`
   - camera position
   - camera target
   - display number and type
4. Call `register(mesh, id)` on at least one mesh.
5. Add the shortcut to `renderLabIntro()` in `assets/app.js`.
6. Add project-specific evidence imagery only when it actually belongs to the project.
7. Bump the asset cache version in `index.html` and `build.mjs`.

## Performance and fallback

- Pixel ratio is capped and reduced further on coarse-pointer devices.
- Shadows are reduced on lower-cost devices.
- `prefers-reduced-motion` bypasses long camera animation.
- If the 3D imports fail, the standard portfolio remains available.
- The evidence-led conventional portfolio remains the source of truth for detailed project claims.
