# Changelog

All notable changes to @claudiv/cli will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-02-15

### Added

- **`claudiv modify` command** - Modify existing .cdml files with natural language instructions
  - Usage: `claudiv modify myapp --spec make it prettier`
  - Automatically appends modification request and triggers regeneration

- **`--chat` flag** - Chat-based development mode
  - Multi-turn chat: `claudiv dev myapp --chat` - Interactive conversation about your project
  - Targeted chat: `claudiv dev myapp --chat "add dark mode"` - Single-turn chat with generation
  - Commands in multi-turn mode: `gen`, `exit`, `help`

- **`--plan` flag** - Force planning mode with auto-confirmation
  - Usage: `claudiv gen myapp --plan`
  - Creates implementation plan before executing

- **Interactive prompts** - Terminal dialogs for missing information
  - Detects AI-related keywords in specs (ai, api, provider, openai, claude, gemini)
  - Prompts for: AI provider selection, API key, model selection
  - Formats responses into spec attributes

- **Multi-word flag support** - Improved `--spec` and `--chat` flag parsing
  - No quotes needed: `claudiv new myapp --spec paint app with tools`
  - Automatically captures all remaining arguments
  - Smart XML detection: XML specs used as-is, plain text wrapped in elements

- **New module: `src/prompts.ts`** - Interactive prompt system
  - `requiresPrompts()` - Detects when prompts are needed
  - `promptAIProvider()` - Provider selection dialog
  - `promptModel()` - Model selection based on provider
  - `formatProviderAttributes()` - Format responses into attributes

- **New module: `src/chat.ts`** - Chat mode implementations
  - `startChatSession()` - Multi-turn interactive chat
  - `startTargetedChat()` - Single-turn targeted chat with generation

### Changed

- **Version bumped to 0.2.0** - Significant new features warrant minor version bump
- **Enhanced help text** - Comprehensive examples for all new commands and flags
- **Updated `cmdNew()`** - Smart handling of plain text vs XML specs
- **Flag parsing system** - Redesigned to support multi-word capture modes

### Fixed

- Plain text specs now properly wrapped in element tags
- Multi-word specifications captured correctly without quotes

## [0.1.4] - 2026-02-14

### Added
- Initial CLI implementation with `new`, `gen`, `dev`, and `reverse` commands
- File watching with Chokidar
- Vite dev server integration
- Claude API and CLI integration
- Lock/unlock system for selective regeneration

### Changed
- Improved error handling and logging
- Enhanced dev server with auto-open browser

## [0.1.0] - 2026-02-01

### Added
- Initial release of @claudiv/cli
- Basic CDML file watching
- Code generation via Claude
- Development server with hot reload
- Support for multiple target languages (HTML, Python, Bash, etc.)

[0.2.0]: https://github.com/claudiv-ai/cli/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/claudiv-ai/cli/compare/v0.1.0...v0.1.4
[0.1.0]: https://github.com/claudiv-ai/cli/releases/tag/v0.1.0
