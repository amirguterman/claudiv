# Claudiv Documentation

> Declarative AI Interaction Platform -- Interface-first components with diff-based change detection.

## Guides

- **[CDML Syntax Reference](ATTRIBUTE-SYNTAX.md)** -- Component structure, FQN grammar, plan directives, aspects, environment cascade
- **[Features Summary](FEATURES-SUMMARY.md)** -- Complete v0.3.0 feature overview

## Quick Reference

### Component Structure
```xml
<component name="..." fqn="...">
  <interface> ... </interface>
  <constraints> ... </constraints>
  <requires> ... </requires>
  <implementation> ... </implementation>
</component>
```

### CLI Commands
```
claudiv new vite <name>      Scaffold Vite project
claudiv new system <name>    Create system project
claudiv dev [file]           Watch and process changes
claudiv gen [file]           One-shot generation
claudiv init                 Initialize in existing project
```

## More

See the main [README](../README.md) for installation, architecture, and getting started.
