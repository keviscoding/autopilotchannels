# HeadStart Channels / Autopilot Channels

React + TypeScript + Vite marketing site for HeadStart Channels, including free training funnel, course access, and internal ops tools.

## Features

### Public Pages
- Landing page with social proof and CTAs
- Free training registration and watch pages (email-gated)
- Course access (protected)
- Webinar registration and confirmation
- Toolkit page

### Internal Ops Tools

#### Ops Tracking Dashboard (`/ops/tracking`)
Real-time lead tracking and content performance dashboard.

**Access**: Protected by access code (see `src/ops/opsConfig.ts`)

**Live Data Refresh**:
- Auto-fetches from Google Sheet Lead List every 30 minutes via Google Visualization CSV API
- Manual refresh button for immediate updates
- Falls back to bundled `public/ops/tracking-data.json` if live fetch fails
- No API keys or backend required

**Requirements**:
- Sheet must remain "Anyone with the link can view" for gviz access
- CORS already configured for production domain

**Features**:
- Video performance metrics (applicants, booked, won, cash)
- Lead list with attribution tracking
- Test lead filtering (`Is test` = Y)
- Cash collection (manual entry on sheet)

**Configuration**: `src/ops/opsConfig.ts`
- `LIVE_SHEET_CONFIG.spreadsheetId`: Google Sheet ID
- `LIVE_SHEET_CONFIG.sheetName`: Sheet tab name (default: "Lead List")
- `LIVE_SHEET_CONFIG.autoRefreshMs`: Refresh interval (default: 30 minutes)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tech Stack
- React 19
- TypeScript
- Vite
- React Router (HashRouter)
- MailerLite (email capture)

---

# React + TypeScript + Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
