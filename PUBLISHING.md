# Publishing Guide for Claudiv

## Pre-Release Checklist

- [ ] All packages build successfully (`pnpm run build`)
- [ ] Manual testing completed
- [ ] README and docs updated
- [ ] CHANGELOG updated
- [ ] Version numbers updated in package.json

## Package Versions

| Package | Version | Description |
|---------|---------|-------------|
| @claudiv/core | 0.3.0 | Core engine: types, FQN, differ, context engine, executor |
| @claudiv/cli | 0.3.0 | CLI: new vite/system, dev, gen, init commands |
| @claudiv/vite-sdk | 0.2.0 | Vite SDK: framework detection, init, dev/gen runners |

## Publishing Process

### 1. Verify Build

```bash
pnpm run clean
pnpm run build
```

### 2. Test Locally

```bash
cd packages/cli && pnpm link --global
claudiv --version
claudiv new system test-system
claudiv new vite test-app
```

### 3. Update Versions

```bash
cd packages/core && npm version minor   # 0.3.0
cd ../cli && npm version minor          # 0.3.0
cd ../vite-sdk && npm version minor     # 0.2.0
```

### 4. Publish (core first)

```bash
cd packages/core && npm publish --access public
cd ../cli && npm publish --access public
cd ../vite-sdk && npm publish --access public
```

### 5. Verify

```bash
npm info @claudiv/core
npm info @claudiv/cli
npm info @claudiv/vite-sdk
```

### 6. Tag Release

```bash
git tag -a v0.3.0 -m "Release v0.3.0: Declarative AI Platform"
git push origin main --follow-tags
```

## Version Strategy

Follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward-compatible)
- PATCH: Bug fixes

## Pre-Release Versions

```bash
npm version prerelease --preid=alpha
npm publish --tag alpha
```

## Emergency Rollback

```bash
npm deprecate @claudiv/cli@0.3.0 "Critical bug - use previous version"
# Or publish hotfix:
npm version patch && npm publish
```

## npm Access

```bash
npm whoami                              # Verify login
npm owner ls @claudiv/cli              # List owners
npm owner add USERNAME @claudiv/cli    # Add collaborator
```
