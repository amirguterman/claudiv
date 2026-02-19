# Claudiv v0.3.0 Features

## Core Features

### Diff-Based Change Detection
No action attributes. Edit `.cdml` -> Claudiv diffs against cache -> processes only changed elements. Uses htmlparser2 + cheerio for structural comparison.

### Transactional Processing
Every change is atomic: diff -> context assembly -> Claude execution -> commit or rollback. No partial state. Context manifest (`context.cdml`) updated atomically with generated files.

### Interface-First Components
Four-section components: interface, constraints, requires, implementation. Dependencies reference interfaces only -- zero knowledge of sibling internals.

### Fully Qualified Names (FQN)
Cross-file component addressing with scope resolution. Supports relative, absolute, cross-project, versioned, and fragment references.

### Context Engine
Assembles surgically precise prompts from `.claudiv/context.cdml`. Maps scopes to code artifacts, interface contracts, and architectural facts. Zero raw conversation history.

### View-Filtered Interface Projection
Dependencies see only the facets they need. `facet="compute"` returns OS/resources; `facet="network"` returns ports/IPs. The `usage` attribute provides purpose annotation.

### Plan Directives
`plan="..."` triggers one-level-deep expansion proposals. `<plan:questions>` enables interactive Q&A. Answers become persistent `<fact>` entries in context.

### Multi-Aspect Views
Components can have aspect files (infra, api, data, security, monitoring). Each aspect gets filtered context with only relevant dependency facets.

### Environment Cascade
Platform/distro-specific overrides via naming convention. Element-level merge with explicit removal support.

### Headless Claude Execution
Every invocation is stateless: `claude --print` (CLI mode) or direct API call. No system prompts, no session state, no context compaction.

## CLI Features

### `claudiv new vite <name>`
Scaffolds Vite project -> installs @claudiv/vite-sdk -> runs init.

### `claudiv new system <name>`
Creates system project with manifest and context.

### `claudiv dev`
File watcher with transactional processing pipeline.

### `claudiv gen`
One-shot generation with scope filtering and dry-run support.

### `claudiv init`
Bootstraps Claudiv in existing project.

## Vite SDK Features

### npm Script Integration
`claudiv:init`, `claudiv:dev`, `claudiv:gen`, `claudiv:mode` scripts added to user's package.json.

### Framework Detection
Auto-detects Vite projects from config files or package.json dependencies.

### Project Scanning
Maps existing source files to .cdml scopes during initialization.
