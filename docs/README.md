# Claudiv Documentation

> **Universal Declarative Generation Platform** — From Anything to Anything, Through Natural Language.

Write `.cdml` files with freeform tags. Add `gen` to trigger AI generation. Get working code in any language.

```xml
<app target="html">
  <hero-section gen>
    Modern landing page with gradient hero, features grid, and contact form
  </hero-section>
</app>
```

```bash
claudiv gen app    # → generates app.html
```

## Guides

- **[Features Summary](FEATURES-SUMMARY.md)** — Complete feature overview and workflow
- **[Attribute Syntax](ATTRIBUTE-SYNTAX.md)** — Full syntax reference (`gen`, `retry`, `undo`, `lock`, `unlock`)
- **[Lock/Unlock Guide](LOCK-UNLOCK-GUIDE.md)** — Selective regeneration patterns
- **[Schema Guide](SCHEMA-GUIDE.md)** — IDE autocomplete setup with XML Schema

## Quick Reference

### Action Attributes

| Attribute | Purpose |
|-----------|---------|
| `gen` | Generate new implementation |
| `retry` | Regenerate (not satisfied) |
| `undo` | Revert to previous version |
| `lock` | Protect children from regeneration |
| `unlock` | Override parent lock |

### CLI Commands

```bash
claudiv new <name>       # Create a new .cdml file
claudiv gen <name>       # Generate code from .cdml
claudiv reverse <file>   # Reverse-engineer file → .cdml
claudiv watch <name>     # Watch and regenerate on changes
```

## More

See the main [README](../README.md) for installation, architecture, and full examples.
