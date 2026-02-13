# Claudiv Universal Architecture

## Vision: Universal Declarative Generation Platform

Claudiv (.cdml) is not just a code generator - it's a **universal bidirectional converter** that can transform ANY input into ANY output through natural language specifications.

## Core Capabilities

### 1. Universal Generation (Forward)

Generate ANY output type from .cdml specifications:

```xml
<!-- Generate Python API -->
<api target="python" framework="fastapi" gen>
  Create REST API with user endpoints
</api>

<!-- Generate Architecture Diagram -->
<system-design target="mermaid" gen>
  Microservices architecture for e-commerce platform
</system-design>

<!-- Generate Project Plan -->
<plan target="markdown" gen>
  6-month roadmap for mobile app development
</plan>

<!-- Generate Database Schema -->
<database target="database-schema" dialect="postgresql" gen>
  User authentication and authorization system
</database>

<!-- Generate Bash Script -->
<automation target="bash" gen>
  Daily backup script for PostgreSQL database
</automation>

<!-- Generate Kubernetes Config -->
<infra target="kubernetes" gen>
  Deployment config for Node.js microservice
</infra>

<!-- Generate API Protocol -->
<api-spec target="api-protocol" gen>
  REST API specification for booking system
</api-spec>
```

### 2. Reverse Generation (Backward)

Generate .cdml specifications FROM existing code/docs/systems:

```bash
# From existing codebase
claudiv reverse api.py → api.cdml
claudiv reverse Button.tsx → Button.cdml
claudiv reverse backup.sh → backup.cdml

# From websites
claudiv reverse https://example.com → example.cdml

# From API specifications
claudiv reverse api.postman.json → api-protocol.cdml
claudiv reverse openapi.yaml → api.cdml

# From documentation
claudiv reverse README.md → concept.cdml

# From diagrams
claudiv reverse architecture.mermaid → system-design.cdml
```

### 3. Meta-Configuration

.cdml files can configure HOW Claudiv itself operates:

```xml
<claudiv-config>
  <!-- Specify which Claude model to use -->
  <model>opus</model>

  <!-- Enable agents for complex generation -->
  <use-agents>true</use-agents>

  <!-- Define permissions -->
  <permissions>
    <bash>git, npm, docker</bash>
    <filesystem>read-write</filesystem>
    <network>true</network>
  </permissions>

  <!-- Configure reverse generation -->
  <reverse-generation>
    <enabled>true</enabled>
    <use-agent>true</use-agent>
    <sources>websites, postman, openapi</sources>
  </reverse-generation>

  <!-- Specify tools Claude can use -->
  <tools>Bash, WebFetch, Grep, Read</tools>
</claudiv-config>

<!-- Now generate with these settings -->
<app target="react" gen>
  Build e-commerce dashboard
</app>
```

## Supported Target Types

### Programming Languages
- HTML, React, Vue, Svelte
- Python (Flask, FastAPI, Django)
- JavaScript, TypeScript
- Go, Rust, Java, C#, Ruby, PHP
- Bash scripts

### Documentation & Concepts
- Markdown documentation
- Conceptual designs
- Project plans
- Architectural documents
- Workflow definitions
- Rules and guidelines
- Memos and notes

### Data & APIs
- API protocols (REST, GraphQL)
- OpenAPI specifications
- Protobuf definitions
- Database schemas
- Migrations

### Diagrams & Visual
- Mermaid diagrams
- PlantUML
- System design diagrams
- Flowcharts
- Entity-relationship diagrams

### Infrastructure & Config
- Dockerfiles
- Kubernetes manifests
- Terraform configurations
- Ansible playbooks
- CI/CD pipelines
- Environment configurations

### Filesystem & Structure
- Directory structures
- File trees
- Filesystem layouts

## Architecture

### Generator Registry

Each target type has a dedicated generator implementing:

```typescript
interface Generator {
  // Forward: .cdml → target
  generate(cdml: string): Promise<Output>;

  // Backward: target → .cdml
  reverse(source: string): Promise<string>;

  // Apply: .cdml changes → existing target
  apply(cdml: string, existing: string): Promise<string>;
}
```

### Example Workflow

**1. Forward Generation:**
```xml
<backup target="bash" gen>
  Backup PostgreSQL database to S3 bucket
  - Use pg_dump
  - Compress with gzip
  - Upload to s3://backups/
  - Delete old backups (>30 days)
</backup>
```
→ Generates `backup.sh`

**2. Reverse Generation:**
```bash
claudiv reverse backup.sh
```
→ Generates `backup.cdml` with semantic structure

**3. Modify & Regenerate:**
```xml
<backup target="bash" retry>
  <!-- Original spec extracted from backup.sh -->
  <!-- Now modify: -->
  Also send Slack notification on completion
</backup>
```
→ Updates `backup.sh` with new feature

## Use Cases

### 1. Rapid Prototyping
Describe anything in natural language, get working implementation instantly.

### 2. Documentation as Code
Maintain .cdml specs as living documentation, generate actual code from them.

### 3. Legacy Migration
Reverse-engineer legacy systems to .cdml, then regenerate in modern stack.

### 4. API Design
Design APIs declaratively in .cdml, generate OpenAPI, client SDKs, servers.

### 5. Infrastructure as Specification
Describe infrastructure needs naturally, generate Terraform/Kubernetes configs.

### 6. Project Planning
Specify project structure, generate directory trees, scaffolding, boilerplate.

### 7. Architecture Design
Describe system architecture, generate diagrams, documentation, implementation.

## Future Enhancements

- **Visual Designer**: Drag-and-drop UI for building .cdml specs
- **Real-time Collaboration**: Multiple users editing .cdml in real-time
- **Version Control Integration**: Git-aware diffing and merging of .cdml files
- **Plugin System**: Community-contributed generators for niche targets
- **AI Model Selection**: Choose best model per target type
- **Streaming Generation**: Real-time updates as Claude generates
- **Multi-file Projects**: Generate entire project structures from single .cdml

---

**Claudiv: From Anything to Anything, Through Natural Language**
