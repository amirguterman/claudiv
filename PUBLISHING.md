# Publishing Guide for Claudiv

This guide outlines the process for publishing new versions of Claudiv packages to npm.

---

## 📋 Pre-Release Checklist

### 1. **Code Quality**
- [ ] All packages build successfully
- [ ] Manual testing completed
- [ ] No console errors or warnings
- [ ] All features documented

### 2. **Documentation**
- [ ] README.md updated with new features
- [ ] CHANGELOG.md updated with version changes
- [ ] Examples work correctly
- [ ] Demo GIFs updated (if applicable)

### 3. **Version Management**
- [ ] Version numbers updated in package.json
- [ ] Git tags created
- [ ] Commit messages follow conventional commits

---

## 🚀 Publishing Process

### Step 1: Verify Build

```bash
# Clean and rebuild all packages
npm run clean
npm run build

# Verify no build errors
echo $?  # Should output 0
```

### Step 2: Test Locally

```bash
# Link CLI for local testing
cd packages/cli
npm link

# Test basic commands
claudiv --version
claudiv --help
claudiv new test-app --spec paint app
claudiv gen test-app

# Unlink when done
npm unlink -g @claudiv/cli
```

### Step 3: Update Version Numbers

```bash
# For CLI package
cd packages/cli
npm version patch   # or minor/major

# For Core package
cd ../core
npm version patch   # Keep in sync with CLI

# This automatically updates package.json and creates git tags
```

### Step 4: Update CHANGELOG

Edit `packages/cli/CHANGELOG.md`:

```markdown
## [0.2.1] - 2026-02-15

### Fixed
- Bug fixes here

### Added
- New features here
```

### Step 5: Commit Changes

```bash
# From project root
git add .
git commit -m "chore: bump version to 0.2.1"

# Tag the release
git tag -a v0.2.1 -m "Release v0.2.1: Brief description"
```

### Step 6: Build Final Version

```bash
# Clean build from scratch
npm run clean
npm run build

# Verify dist/ directories exist and are populated
ls -la packages/cli/dist/
ls -la packages/core/dist/
```

### Step 7: Publish to npm

**Important:** Ensure you're logged in to npm:

```bash
npm whoami
# If not logged in: npm login
```

**Publish packages:**

```bash
# Publish core first (CLI depends on it)
cd packages/core
npm publish --access public

# Then publish CLI
cd ../cli
npm publish --access public
```

**Verify publication:**

```bash
# Check on npm
npm info @claudiv/core
npm info @claudiv/cli

# Test installation
npm install -g @claudiv/cli@latest
claudiv --version
```

### Step 8: Push to Git

```bash
# Push commits
git push origin main

# Push tags
git push origin --tags

# Or both at once
git push origin main --follow-tags
```

### Step 9: Create GitHub Release

1. Go to: https://github.com/claudiv-ai/claudiv/releases
2. Click "Draft a new release"
3. Select tag: `v0.2.1`
4. Title: `v0.2.1 - Brief Description`
5. Description: Copy from CHANGELOG.md
6. Attach binaries (if any)
7. Click "Publish release"

---

## 🔄 Automated Publishing (GitHub Actions)

The repository includes GitHub Actions for automated publishing:

### Workflow: `.github/workflows/publish.yml`

**Triggers:**
- Pushing tags matching `v*.*.*`
- Manual workflow dispatch

**Steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run tests
5. Build packages
6. Publish to npm

**To use:**

```bash
# Create and push a tag
git tag -a v0.2.1 -m "Release v0.2.1"
git push origin v0.2.1

# GitHub Actions automatically:
# - Builds packages
# - Runs tests
# - Publishes to npm
```

---

## 📊 Version Strategy

Follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.2.0): New features (backward-compatible)
- **PATCH** (0.2.1): Bug fixes

### When to Bump

**MAJOR version:**
- Breaking API changes
- Removed features
- Changed CLI command structure

**MINOR version:**
- New features
- New commands or flags
- Significant enhancements

**PATCH version:**
- Bug fixes
- Documentation updates
- Performance improvements

---

## 🧪 Pre-Release Versions

For testing before official release:

```bash
# Alpha release
npm version prerelease --preid=alpha
npm publish --tag alpha

# Beta release
npm version prerelease --preid=beta
npm publish --tag beta

# Users install with:
npm install -g @claudiv/cli@alpha
npm install -g @claudiv/cli@beta
```

---

## 🚨 Emergency Rollback

If a published version has critical issues:

### Option 1: Deprecate

```bash
npm deprecate @claudiv/cli@0.2.1 "Critical bug - use 0.2.0 instead"
```

### Option 2: Unpublish (within 72 hours)

```bash
npm unpublish @claudiv/cli@0.2.1
```

**Note:** Unpublishing is not recommended and only works within 72 hours of publishing.

### Option 3: Publish Hotfix

```bash
# Fix the issue
npm version patch
npm publish

# Users update with:
npm update -g @claudiv/cli
```

---

## 📝 Post-Release Checklist

After successful publication:

- [ ] Verify package on npm: https://www.npmjs.com/package/@claudiv/cli
- [ ] Test installation: `npm install -g @claudiv/cli@latest`
- [ ] Create GitHub release with notes
- [ ] Announce on relevant channels (if applicable)
- [ ] Update homepage/documentation
- [ ] Share demo GIFs (if available)

---

## 🔐 npm Access Control

### Organization Access

```bash
# Add collaborator to @claudiv scope
npm owner add USERNAME @claudiv/cli
npm owner add USERNAME @claudiv/core

# List current owners
npm owner ls @claudiv/cli
```

### Two-Factor Authentication

**Highly recommended:**

```bash
# Enable 2FA
npm profile enable-2fa

# Publish with 2FA
npm publish --otp=123456
```

---

## 📚 Additional Resources

- **npm Publishing Guide**: https://docs.npmjs.com/cli/v8/commands/npm-publish
- **Semantic Versioning**: https://semver.org/
- **Conventional Commits**: https://www.conventionalcommits.org/
- **GitHub Releases**: https://docs.github.com/en/repositories/releasing-projects-on-github

---

## Current Version Status

**Latest Published:**
- `@claudiv/cli`: 0.2.0
- `@claudiv/core`: 0.1.0

**Next Version:**
- Target: 0.2.1 (or as needed)
- Status: Development
- ETA: TBD

---

**Questions?** See [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue.
