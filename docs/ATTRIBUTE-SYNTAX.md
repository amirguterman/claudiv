# CDML Syntax Reference

## Component Structure

Every component `.cdml` file has four sections:

```xml
<component name="my-service" fqn="acme:cloud:arm:my-service">
  <interface> ... </interface>
  <constraints> ... </constraints>
  <requires> ... </requires>
  <implementation> ... </implementation>
</component>
```

### Interface Section
What other components see. Can contain explicit facets or inferred sections:

```xml
<interface implements="sql-database">
  <facet type="compute">
    <os type="linux" distro="ubuntu" arch="arm64" />
    <resources ram="8g" cpu="4" />
  </facet>
  <facet type="network">
    <ports><map external="80" internal="5174" /></ports>
  </facet>
</interface>
```

Or with inferred facets from well-known children:
```xml
<interface>
  <endpoints>
    <users-add description="Add user">
      <address route="/api/users" method="post" />
    </users-add>
  </endpoints>
  <events>
    <user-created><payload user-id="int" /></user-created>
  </events>
</interface>
```

### Constraints Section
Environment requirements:
```xml
<constraints os="linux" distro="ubuntu" arch="amd64">
  <ram max="512m" />
  <ports><map external="80" internal="5174" /></ports>
  <services>
    <redis port="6379" />
    <mysql port="3306" database="my-db" />
  </services>
</constraints>
```

### Requires Section
Dependencies by interface only:
```xml
<requires>
  <dependency fqn="redis#api" usage="cache" />
  <dependency fqn="mysql#api" facet="data" usage="persistence" />
  <dependency fqn="other-service#api:users-add" />
</requires>
```

### Implementation Section
Internal details, never exposed:
```xml
<implementation target="typescript" framework="express">
  <modules>
    <user-controller>HTTP handler for CRUD</user-controller>
    <user-service>Business logic</user-service>
  </modules>
</implementation>
```

## FQN Grammar

```
fqn        = [project ":"] scope-path ["#" fragment] ["@" version]
scope-path = segment (":" segment)*
fragment   = aspect-or-section [":" sub-path]
segment    = kebab-case-identifier
```

### Fragment Types
- `#api` / `#interface` -- public interface
- `#impl` / `#implementation` -- internal (own scope only)
- `#infra`, `#data`, `#security`, `#monitoring` -- aspect views

## Plan Directives

### Plan Attribute
```xml
<cloud plan="custom private cloud">
  <existing-child>Immutable</existing-child>
</cloud>
```

### Plan Element
```xml
<cloud>
  <plan>custom private cloud</plan>
  <existing-child>Immutable</existing-child>
</cloud>
```

### Plan Questions (temporary)
```xml
<plan:questions>
  <select question="auth method?">
    <a>jwt</a><b>oauth</b><answer></answer>
  </select>
  <input question="what port?"><answer></answer></input>
  <yesno question="rate limiting?"><answer></answer></yesno>
</plan:questions>
```

## Aspect Files
```xml
<aspect component="acme:cloud:arm:my-service" type="infrastructure">
  <deployment strategy="rolling-update" replicas-min="2" />
  <scaling metric="cpu" threshold="70%" />
</aspect>
```

Naming: `<name>.<aspect>.cdml` (e.g., `my-service.infra.cdml`)

## System Projects
```xml
<system name="my-system">
  <portal type="webapp">Dashboard</portal>
  <api type="rest" submodule="true">Backend API</api>
</system>
```

## Project Manifest
```xml
<project name="acme-platform">
  <auto-discover>
    <directory path="services/" pattern="*.cdml" />
    <directory path="aspects/" pattern="*.*.cdml" />
  </auto-discover>
</project>
```

## Environment Cascade
Files are merged most-general to most-specific:
```
system.cdml                    -- base
system.env.cdml                -- base environment
system.env.linux.cdml          -- Linux
system.env.linux.arm64.cdml    -- Linux ARM64
```

Use `<element remove="true" />` for explicit removal during merge.

## Context Manifest
```xml
<claudiv-context for="my-service.cdml" auto-generated="true">
  <global>
    <refs><code file="package.json" role="project-config" /></refs>
    <facts><fact>Uses TypeScript strict mode</fact></facts>
  </global>
  <scope path="my-service > implementation > user-controller">
    <interfaces>
      <fulfills fqn="my-service#api:users-add" />
      <depends fqn="mysql#api" facet="data" usage="persistence" />
    </interfaces>
    <refs><code file="src/controllers/user.ts" role="implementation" /></refs>
    <facts><fact decision="plan:2025-02-18">Cursor-based pagination</fact></facts>
    <tools><tool name="Write" scope="src/controllers/**" /></tools>
  </scope>
</claudiv-context>
```
