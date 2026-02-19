# Claudiv

### *Claude in a Div*

> **Declarative AI Interaction Platform** — Interface-first components, diff-based change detection, headless Claude execution.

## How It Works

Claudiv watches `.cdml` files for changes, diffs them against cached state, constructs surgically precise context for each scope, and executes headless Claude invocations. No conversation history, no system prompt overhead.

```xml
<component name="my-service" fqn="acme:cloud:arm:my-service">
  <interface>
    <endpoints>
      <users-add description="Add a new user">
        <address route="/api/users" method="post" />
        <request><schema name="string" age="int" /></request>
        <response status="201"><schema id="int" name="string" /></response>
      </users-add>
    </endpoints>
  </interface>

  <constraints os="linux" arch="amd64">
    <ram max="512m" />
  </constraints>

  <requires>
    <dependency fqn="redis#api" usage="cache" />
    <dependency fqn="mysql#api" usage="persistence" />
  </requires>

  <implementation target="typescript" framework="express">
    <modules>
      <user-controller>HTTP handler for user CRUD</user-controller>
      <user-service>Business logic</user-service>
    </modules>
  </implementation>
</component>
```

## Key Concepts

### Interface-First Components

Each component is a self-contained `.cdml` file with four sections: interface (what others see), constraints (environment needs), requires (dependencies by interface only), implementation (internal, never exposed).

### Fully Qualified Names (FQN)

Components reference each other with resolvable addresses:

```
my-service                            — relative
my-service#api                        — interface view
my-service#api:users-add              — specific endpoint
system:cloud:arm:my-service           — absolute
acme-platform:system:cloud:arm:service — cross-project
redis@7.2#api                         — versioned
```

### Diff-Based Change Detection

No `gen`/`retry`/`undo` attributes. Edit your `.cdml` file, Claudiv diffs against cached state, and only changed elements are processed.

### View-Filtered Interface Projection

Dependencies see only the facets they need:

```xml
<dependency fqn="vm-arm" facet="compute" usage="deployment target" />
<!-- Only gets OS/resources. Network, storage: NOT included -->
```

### Context Engine (`.claudiv/context.cdml`)

The architectural centerpiece. Maps scopes to code artifacts, interface contracts, and architectural facts:

```xml
<claudiv-context for="my-service.cdml" auto-generated="true">
  <global>
    <refs>
      <code file="package.json" role="project-config" />
    </refs>
  </global>
  <scope path="my-service > implementation > user-controller">
    <interfaces>
      <fulfills fqn="my-service#api:users-add" />
      <depends fqn="mysql#api" facet="data" usage="user persistence" />
    </interfaces>
    <refs>
      <code file="src/controllers/user.ts" role="implementation" />
    </refs>
    <facts>
      <fact>Uses express Router with async error wrapper</fact>
    </facts>
  </scope>
</claudiv-context>
```

### Transactional Processing

Every change is a transaction:

1. Diff detected -- classify (plan directive, plan answers, content change)
2. Resolve scope from context manifest
3. Assemble prompt: target (.cdml change) + current (code from refs) + contracts + facts
4. Execute headless Claude
5. COMMIT (write files + update context.cdml refs + facts) or ROLLBACK

### Plan Directives

Add `plan="..."` to have Claude propose structure:

```xml
<cloud plan="custom private cloud">
  <existing-component>Already defined</existing-component>
</cloud>
```

Claude proposes one-level-deep expansion. If input needed, `<plan:questions>` appears temporarily. Answers become `<fact>` entries in context.

### Multi-Aspect Component Views

```
services/my-service.cdml              — base component
aspects/my-service.infra.cdml         — deployment, scaling
aspects/my-service.data.cdml          — schema, migrations
aspects/my-service.security.cdml      — auth, RBAC
```

### Environment Cascade

```
my-system.cdml                        — base
my-system.env.cdml                    — base environment
my-system.env.linux.cdml              — Linux overrides
my-system.env.linux.arm64.cdml        — Linux ARM64 overrides
```

## Installation

```bash
npm install -g @claudiv/cli
```

Requirements: Node.js 20+, Claude Code CLI (for CLI mode) or Anthropic API key (for API mode)

## CLI Commands

```
claudiv new vite <name>      Scaffold Vite project with Claudiv
claudiv new system <name>    Create system project
claudiv dev [file]           Watch .cdml files, diff, process changes
claudiv gen [file]           One-shot generation
claudiv init                 Initialize Claudiv in existing project
```

### Quick Start -- Vite Project

```bash
claudiv new vite my-app     # Scaffolds Vite + installs @claudiv/vite-sdk + init
cd my-app
npm run claudiv:dev         # Watch .cdml files for changes
```

### Quick Start -- System Project

```bash
claudiv new system my-system
# Edit my-system.cdml to add components
claudiv dev my-system.cdml
```

## Vite SDK Integration

Install `@claudiv/vite-sdk` in an existing Vite project. It adds `claudiv:*` npm scripts:

```bash
npm install --save-dev @claudiv/vite-sdk
npm run claudiv:init        # Scan project, generate .cdml + context
npm run claudiv:dev         # Watch and process changes
npm run claudiv:gen         # One-shot generation
```

## Monorepo Structure

```
claudiv/
├── packages/
│   ├── core/          @claudiv/core — types, FQN, differ, context engine,
│   │                  executor, projector, plan processor, scanner,
│   │                  environment cascade, project registry, aspects
│   ├── cli/           @claudiv/cli — CLI with new vite/system, dev, gen, init
│   └── vite-sdk/      @claudiv/vite-sdk — framework SDK with bin scripts
├── docs/
├── turbo.json
└── pnpm-workspace.yaml
```

## Architecture

```
.cdml file change detected
    ↓
diffCdml(cached, current) → CdmlDiffResult
    ↓
Classify: plan directives | plan answers | content changes
    ↓
For each change → BEGIN TRANSACTION:
  1. Resolve scope from .claudiv/context.cdml
  2. Resolve dependencies → view-filtered facets
  3. Read current code from <refs>
  4. Assemble prompt: target + current + contracts + facts
  5. Execute headless Claude (claude --print)
  6. Validate: response only affects target scope
  7. COMMIT or ROLLBACK
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT

## Author

Amir Guterman — [GitHub](https://github.com/amirguterman) | [claudiv.org](https://claudiv.org)
