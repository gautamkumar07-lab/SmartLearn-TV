# Contributing to SmartLearn TV

We welcome contributions from educators, designers, and developers around the world!

## Code of Conduct
Please be polite, constructive, and inclusive. We strive to create an accessible learning platform for students everywhere.

## Development Setup

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/smartlearn-tv.git
   cd smartlearn-tv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Start the Express API backend:
   ```bash
   node server/index.js
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Pull Request Guidelines
- Ensure `npm run build` passes with zero errors before submitting a PR.
- Maintain Fire TV D-Pad remote accessibility (`tv-focusable` classes) on any newly added interactive elements.
- Keep commits descriptive and follow standard conventional commit naming:
  - `feat: add new subject quiz`
  - `fix: resolve d-pad focus on modal`
  - `docs: update alexa setup instructions`
