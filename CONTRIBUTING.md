# Contributing to Claudiv

## Getting Started

1. Fork and clone:
   ```bash
   git clone https://github.com/YOUR_USERNAME/claudiv.git
   cd claudiv
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build all packages (core must build first):
   ```bash
   pnpm run build
   ```

## Project Structure

```
claudiv/
├── packages/
│   ├── core/          @claudiv/core -- types, FQN, differ, context engine,
│   │                  executor, projector, plan processor, scanner,
│   │                  environment, project registry, aspects
│   ├── cli/           @claudiv/cli -- CLI commands, system manager,
│   │                  transactional processing, file watcher
│   └── vite-sdk/      @claudiv/vite-sdk -- Vite framework SDK with
│                      detector, init, dev/gen runners, bin scripts
├── docs/              Documentation
├── turbo.json         Turborepo config
└── pnpm-workspace.yaml
```

### Build Order

`core` must build first -- `cli` and `vite-sdk` depend on `core/dist/`.

### Key Source Files

**Core:**
- `types.ts` -- All type definitions
- `sdk-types.ts` -- SDK interface
- `fqn.ts` -- FQN parser/resolver
- `differ.ts` -- CDML diff engine
- `context-engine.ts` -- Prompt assembly from context manifest
- `executor.ts` -- Headless Claude execution
- `parser.ts` -- CDML parser with interface/constraints extraction

**CLI:**
- `bin/claudiv.js` -- Entry point (JS, not TS)
- `src/index.ts` -- Engine with transactional processing
- `src/system-manager.ts` -- System component creation
- `src/config.ts` -- Configuration loader
- `src/updater.ts` -- Transactional updates

**Vite SDK:**
- `src/sdk.ts` -- ClaudivSDK implementation
- `src/detector.ts` -- Vite framework detector
- `src/init.ts` -- Project initialization
- `src/dev-runner.ts` -- Dev mode watcher
- `src/gen-runner.ts` -- One-shot generation

## Making Changes

### Branch Naming
- `feat/description`, `fix/description`, `docs/description`, `chore/description`

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(core): add FQN version resolution
fix(cli): handle missing context manifest
docs: update CDML syntax reference
```

### Testing
```bash
# Build all packages
pnpm run build

# Link CLI for local testing
cd packages/cli && pnpm link --global

# Test commands
claudiv new system test-system
claudiv dev test-system.cdml
```

## Pull Request Process

1. Create feature branch from `main`
2. Make changes, commit with conventional messages
3. Ensure `pnpm run build` passes
4. Open PR with description of changes

## Code Style

- TypeScript for all source code
- 2 spaces, single quotes, trailing commas
- `interface` over `type` for object shapes
- kebab-case filenames

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
