# Attribute-Based Syntax Implementation

## Overview

The system uses **attributes** (`gen`, `retry`, `undo`, `lock`, `unlock`) directly on elements to trigger AI actions.

## New Syntax

### 1. Generate (gen)

```xml
<!-- Simple: content-based -->
<create-button gen>Make a blue button</create-button>

<!-- Attribute-based: structured specs -->
<my-button
  title="Get Lucky Number"
  color="blue"
  size="large"
  click="show message"
  gen />

<!-- Mixed: attributes + content -->
<login-form username="email" password="required" gen>
  Add validation and error messages
</login-form>
```

**After processing:**
- `gen` attribute is removed
- `<ai>` child element is added with response

```xml
<my-button title="Get Lucky Number" color="blue" size="large" click="show message">
  <ai>
    <changes>Created interactive button</changes>
    <details>...</details>
  </ai>
</my-button>
```

### 2. Retry (retry)

```xml
<my-button color="pink" retry>Change to pink button
  <ai>Previous response...</ai>
</my-button>
```

Regenerates the response with the same spec.

### 3. Undo (undo)

```xml
<my-button undo>Revert changes
  <ai>Previous response...</ai>
</my-button>
```

Reverts to the previous implementation.

### 4. Lock (lock)

```xml
<website gen="">
  <nav-menu lock="">
    <!-- This component will NOT be regenerated -->
    <ai>Previous implementation...</ai>
  </nav-menu>
  <main-content>
    <!-- This will be regenerated -->
  </main-content>
</website>
```

Prevents an element and all its children from being regenerated when a parent has `gen` or `retry`.

### 5. Unlock (unlock)

```xml
<website lock="" gen="">
  <header unlock="">
    <!-- This WILL be regenerated (overrides parent lock) -->
  </header>
  <sidebar>
    <!-- This will NOT be regenerated (locked by parent) -->
  </sidebar>
</website>
```

Overrides a parent's `lock` attribute, allowing a specific child to be regenerated.

**Lock/Unlock Pattern:**
- `lock` on parent = lock everything by default
- `unlock` on child = override parent lock for that specific child
- Useful for iterative development and selective regeneration

See [LOCK-UNLOCK-GUIDE.md](LOCK-UNLOCK-GUIDE.md) for detailed examples.

## Key Features

### Freeform Tag Names
- **Any tag name works** - use whatever makes sense for organization
- Tag names act as **semantic headers** that help:
  - You organize your thinking
  - AI understand the structure and intent

```xml
<create-responsive-navbar gen>...</create-responsive-navbar>
<feature-panel gen>...</feature-panel>
<user-dashboard gen>...</user-dashboard>
```

### Attributes = Specifications
- Attributes are **part of the specification**
- They're included in the prompt sent to AI
- Use them for structured data

```xml
<button
  title="Submit Form"
  color="green"
  size="large"
  icon="checkmark"
  validation="required fields"
  gen />
```

AI receives:
```
Element: button
Specifications:
  title: Submit Form
  color: green
  size: large
  icon: checkmark
  validation: required fields
```

### Content = Description
- Text content and nested elements provide additional context
- Mix freeform text with structured nested tags

```xml
<feature gen>
  Create a dashboard with real-time updates
  <charts>Line chart for activity over time</charts>
  <stats>User stats: posts, followers, engagement</stats>
  <refresh>Auto-refresh every 30 seconds</refresh>
</feature>
```

## How It Works

1. **User adds `gen` attribute:**
   ```xml
   <create-button color="blue" gen>Make a button</create-button>
   ```

2. **System detects the pattern:**
   - Finds element with `gen` attribute
   - Extracts element name: "create-button"
   - Extracts spec attributes: `{color: "blue"}`
   - Extracts user message: "Make a button"

3. **Builds prompt:**
   ```
   Element: create-button
   Specifications:
     color: blue
   Description:
   Make a button
   ```

4. **Sends to Claude** with full hierarchy context

5. **Receives response** and updates element:
   - Removes `gen` attribute
   - Adds `<ai>` child with response
   ```xml
   <create-button color="blue">Make a button
     <ai>
       <changes>Created blue button</changes>
       <details>...</details>
     </ai>
   </create-button>
   ```

## Benefits

✅ **Simple** - Attributes are self-documenting
✅ **Flexible** - Any tag name, any attributes, any content
✅ **Structured** - Attributes provide structured specifications
✅ **Semantic** - Tag names organize thinking and help AI

## Testing

Build the project:
```bash
npm run build
```

Run the development server:
```bash
npm run dev
# or
npm run dev:cli
# or
npm run dev:api
```

Test with a simple `.cdml` file:
```xml
<app target="html">
  <test-button color="purple" size="large" gen>
    Create a purple button with text "Test Button"
  </test-button>
</app>
```

The system will:
1. Detect the `gen` attribute
2. Remove it after processing
3. Add `<ai>` child with response
4. Generate the output file (e.g., `app.html` for `target="html"`)

## Next Steps

The attribute-based syntax is now fully implemented! You can:
- Test with various patterns
- Use attributes for structured specifications
- Mix attributes with content for rich descriptions
- Use any tag names for semantic organization
