# Claudiv Document & Media Format Support

## Overview

Claudiv supports **bidirectional conversion** with document and media formats:
- **Extract → .cdml**: PDF, Excel, PowerPoint, Images (OCR), Audio (transcription)
- **Generate ← .cdml**: All document and media formats

## Document Formats

### 1. PDF

#### Extract from PDF

```bash
# Convert PDF to .cdml
claudiv reverse document.pdf → document.cdml
```

**Generated .cdml:**

```xml
<document target="pdf" source="document.pdf">
  <metadata>
    <title>System Architecture Design</title>
    <author>Engineering Team</author>
    <pages>15</pages>
    <created>2026-02-01</created>
  </metadata>

  <page number="1">
    <heading level="1">System Architecture</heading>
    <paragraph>
      This document describes the microservices architecture...
    </paragraph>
    <image src="page1-diagram.png" ocr="true">
      Architecture diagram showing 5 microservices
    </image>
  </page>

  <page number="2">
    <heading level="2">Components</heading>
    <list type="unordered">
      <item>API Gateway</item>
      <item>User Service</item>
      <item>Order Service</item>
    </list>
  </page>
</document>
```

#### Generate PDF from .cdml

```xml
<report target="pdf" gen>
  <metadata>
    <title>Q1 Performance Report</title>
    <author>Data Team</author>
  </metadata>

  <cover-page>
    <title>Q1 2026 Performance Report</title>
    <subtitle>Company Performance Analysis</subtitle>
    <logo>company-logo.png</logo>
  </cover-page>

  <section title="Executive Summary">
    Revenue increased 23% YoY, driven by new product launches...

    <chart type="bar">
      Revenue by quarter: Q1 2025, Q2 2025, Q3 2025, Q4 2025, Q1 2026
    </chart>
  </section>

  <section title="Detailed Analysis">
    <subsection title="Revenue Breakdown">
      <table>
        <header>Product | Q1 2025 | Q1 2026 | Growth</header>
        <row>Product A | $1.2M | $1.5M | 25%</row>
        <row>Product B | $800K | $1.1M | 37%</row>
      </table>
    </subsection>
  </section>

  Generate professional PDF report with charts and tables
</report>
```

**Generates:** `report.pdf` (formatted, styled, with embedded charts)

### 2. Excel / Spreadsheets

#### Extract from Excel

```bash
claudiv reverse data.xlsx → data.cdml
```

**Generated .cdml:**

```xml
<spreadsheet target="excel" source="data.xlsx">
  <sheet name="Sales Data">
    <headers>
      <col>Date</col>
      <col>Product</col>
      <col>Revenue</col>
      <col>Units</col>
    </headers>

    <data>
      <row>2026-01-01 | Product A | $1,200 | 50</row>
      <row>2026-01-02 | Product B | $800 | 30</row>
      <row>2026-01-03 | Product A | $1,500 | 62</row>
    </data>

    <formulas>
      <cell>E2 = SUM(C2:C100)</cell>
      <cell>E3 = AVERAGE(C2:C100)</cell>
    </formulas>

    <charts>
      <chart type="line" range="A1:C100">
        Revenue trend over time
      </chart>
    </charts>
  </sheet>

  <sheet name="Summary">
    <pivot-table source="Sales Data">
      Summarize by product and month
    </pivot-table>
  </sheet>
</spreadsheet>
```

#### Generate Excel from .cdml

```xml
<analytics target="excel" gen>
  <sheet name="User Metrics">
    <columns>
      User ID | Name | Email | Signup Date | Last Active | Total Orders
    </columns>

    <data-source>
      SELECT users.id, users.name, users.email,
             users.created_at, users.last_active,
             COUNT(orders.id) as total_orders
      FROM users LEFT JOIN orders ON users.id = orders.user_id
      GROUP BY users.id
    </data-source>

    <formatting>
      <header>bold, background=blue, color=white</header>
      <alternating-rows>true</alternating-rows>
      <freeze-panes>row=1</freeze-panes>
    </formatting>

    <formulas>
      <column>Days Since Active = TODAY() - [Last Active]</column>
      <footer>Total Users = COUNT([User ID])</footer>
    </formulas>
  </sheet>

  <sheet name="Charts">
    <chart type="pie">
      <data>sheet=User Metrics, range=E:E</data>
      <title>Users by Last Active</title>
      <categories>Active (7 days) | Dormant (30 days) | Inactive (90+ days)</categories>
    </chart>

    <chart type="bar">
      <data>sheet=User Metrics, range=F:F</data>
      <title>Orders per User Distribution</title>
    </chart>
  </sheet>

  Generate Excel analytics dashboard with data and charts
</analytics>
```

**Generates:** `analytics.xlsx` (formatted, with pivot tables and charts)

### 3. PowerPoint / Presentations

#### Extract from PowerPoint

```bash
claudiv reverse presentation.pptx → presentation.cdml
```

**Generated .cdml:**

```xml
<presentation target="powerpoint" source="presentation.pptx">
  <metadata>
    <title>Q1 Product Roadmap</title>
    <author>Product Team</author>
    <theme>Corporate Blue</theme>
  </metadata>

  <slide number="1" layout="title">
    <title>Q1 2026 Product Roadmap</title>
    <subtitle>New Features & Enhancements</subtitle>
    <image>company-logo.png</image>
  </slide>

  <slide number="2" layout="content">
    <title>Key Objectives</title>
    <bullets>
      <item>Launch OAuth2 authentication</item>
      <item>Implement real-time notifications</item>
      <item>Mobile app beta release</item>
    </bullets>
    <notes>
      Speaker notes: Emphasize security focus for Q1
    </notes>
  </slide>

  <slide number="3" layout="comparison">
    <title>Before vs After</title>
    <left>
      <image>old-ui.png</image>
      <caption>Current UI</caption>
    </left>
    <right>
      <image>new-ui.png</image>
      <caption>Redesigned UI</caption>
    </right>
  </slide>
</presentation>
```

#### Generate PowerPoint from .cdml

```xml
<deck target="powerpoint" theme="modern" gen>
  <title-slide>
    <title>AI-Powered Development</title>
    <subtitle>How Claudiv Transforms Coding</subtitle>
    <presenter>Your Name</presenter>
    <date>2026-02-14</date>
  </title-slide>

  <slide layout="section-header">
    <title>What is Claudiv?</title>
  </slide>

  <slide layout="content">
    <title>Key Features</title>
    <bullets animation="fade">
      <item>Universal code generation</item>
      <item>Bidirectional conversion</item>
      <item>MCP integration</item>
      <item>System monitoring</item>
    </bullets>
  </slide>

  <slide layout="demo">
    <title>Live Demo</title>
    <video>demo.mp4</video>
    <caption>Watch Claudiv generate a full-stack app</caption>
  </slide>

  <slide layout="chart">
    <title>Developer Productivity Increase</title>
    <chart type="bar">
      Traditional: 40 hours
      Claudiv: 8 hours
      Improvement: 5x faster
    </chart>
  </slide>

  <slide layout="code">
    <title>Example .cdml Spec</title>
    <code language="xml">
      <app target="react" gen>
        Create dashboard with user stats
      </app>
    </code>
  </slide>

  <slide layout="closing">
    <title>Thank You</title>
    <contact>
      Email: hello@claudiv.dev
      GitHub: github.com/claudiv
    </contact>
  </slide>

  Generate professional presentation with animations
</deck>
```

**Generates:** `presentation.pptx` (with theme, animations, transitions)

### 4. Markdown

#### Extract from Markdown

```bash
claudiv reverse README.md → README.cdml
```

#### Generate Markdown Documentation

```xml
<documentation target="markdown" gen>
  <frontmatter>
    title: Claudiv API Reference
    author: Claudiv Team
    version: 1.0.0
  </frontmatter>

  <section title="Installation">
    ```bash
    npm install -g claudiv
    ```

    Claudiv requires Node.js 20+ and Claude Code CLI.
  </section>

  <section title="Quick Start">
    Create your first .cdml file:

    ```xml
    <app target="html" gen>
      Make a blue button
    </app>
    ```

    Run:
    ```bash
    claudiv app.cdml
    ```
  </section>

  <section title="API Reference">
    <subsection title="Config">
      Configuration options for .cdml files.

      <table>
        | Option | Type | Description |
        |--------|------|-------------|
        | target | string | Output format |
        | framework | string | Framework to use |
      </table>
    </subsection>
  </section>

  Generate complete API documentation
</documentation>
```

### 5. CSS / Styling

#### Extract from CSS

```bash
claudiv reverse styles.css → styles.cdml
```

**Generated .cdml:**

```xml
<stylesheet target="css" source="styles.css">
  <variables>
    <var name="primary-color">#007bff</var>
    <var name="font-family">'Arial', sans-serif</var>
  </variables>

  <component name="button">
    <base>
      padding: 10px 20px
      background: var(--primary-color)
      color: white
      border-radius: 4px
    </base>

    <hover>
      background: darken(var(--primary-color), 10%)
    </hover>

    <active>
      transform: scale(0.98)
    </active>
  </component>

  <component name="card">
    <base>
      box-shadow: 0 2px 4px rgba(0,0,0,0.1)
      padding: 20px
      border-radius: 8px
    </base>
  </component>
</stylesheet>
```

#### Generate CSS from Design Spec

```xml
<design-system target="css" preprocessor="scss" gen>
  <theme name="modern-blue">
    <colors>
      <primary>#007bff</primary>
      <secondary>#6c757d</secondary>
      <success>#28a745</success>
      <danger>#dc3545</danger>
    </colors>

    <typography>
      <family>Inter, system-ui, sans-serif</family>
      <sizes>
        <h1>2.5rem</h1>
        <h2>2rem</h2>
        <body>1rem</body>
      </sizes>
    </typography>

    <spacing>
      <xs>4px</xs>
      <sm>8px</sm>
      <md>16px</md>
      <lg>24px</lg>
      <xl>32px</xl>
    </spacing>
  </theme>

  <components>
    <button variant="primary">
      Rounded corners, subtle shadow, hover lift effect
    </button>

    <card elevation="medium">
      White background, soft shadow, responsive padding
    </card>

    <input focus-style="outline">
      Blue focus ring, smooth transition
    </input>
  </components>

  Generate complete CSS design system with variables
</design-system>
```

**Generates:** `design-system.css` or `design-system.scss`

## Media Formats

### 1. Images (OCR)

#### Extract Text from Images

```bash
claudiv reverse diagram.png --ocr → diagram.cdml
```

**Generated .cdml:**

```xml
<image-content source="diagram.png" ocr="true">
  <detected-text>
    System Architecture Diagram

    Components:
    - API Gateway (Port 3000)
    - Auth Service (Port 3001)
    - User Service (Port 3002)
    - Database (PostgreSQL)
  </detected-text>

  <structure>
    <diagram type="system-architecture">
      <component name="API Gateway" port="3000">
        Routes requests to microservices
      </component>
      <component name="Auth Service" port="3001">
        Handles authentication
      </component>
      <component name="User Service" port="3002">
        Manages user data
      </component>
      <database type="postgresql">
        Stores application data
      </database>

      <connections>
        <connect from="API Gateway" to="Auth Service" />
        <connect from="API Gateway" to="User Service" />
        <connect from="User Service" to="Database" />
      </connections>
    </diagram>
  </structure>

  <interpretation>
    This is a microservices architecture with an API Gateway
    routing to two services: Auth and User. PostgreSQL database
    is accessed by User Service.
  </interpretation>
</image-content>
```

#### Generate Diagrams as Images

```xml
<architecture target="png" gen>
  <diagram type="system-design" style="clean-modern">
    <component name="Web App" icon="browser">
      User-facing React application
    </component>

    <component name="API Gateway" icon="server">
      Routes and load balances requests
    </component>

    <component name="Services" icon="microservice">
      <service>Auth</service>
      <service>Users</service>
      <service>Orders</service>
    </component>

    <component name="Database" icon="database">
      PostgreSQL cluster
    </component>

    <component name="Cache" icon="redis">
      Redis for session storage
    </component>

    <connections style="arrows">
      <connect from="Web App" to="API Gateway" label="HTTPS" />
      <connect from="API Gateway" to="Services" label="gRPC" />
      <connect from="Services" to="Database" label="SQL" />
      <connect from="Services" to="Cache" label="Redis Protocol" />
    </connections>
  </diagram>

  Generate system architecture diagram as PNG
</architecture>
```

**Generates:** `architecture.png` (clean, professional diagram)

### 2. Audio Transcription

#### Extract from Audio

```bash
claudiv reverse meeting.mp3 → meeting.cdml
```

**Generated .cdml:**

```xml
<audio-transcription source="meeting.mp3" duration="45:23">
  <metadata>
    <speakers>3</speakers>
    <language>en-US</language>
    <recorded>2026-02-14T10:00:00Z</recorded>
  </metadata>

  <transcript>
    <speaker id="1" name="John" timestamp="00:00:15">
      Let's discuss the Q1 roadmap. First item is OAuth2 integration.
    </speaker>

    <speaker id="2" name="Sarah" timestamp="00:00:32">
      We've completed the design. Ready to start implementation next week.
    </speaker>

    <speaker id="1" name="John" timestamp="00:00:45">
      Great. What's the timeline?
    </speaker>

    <speaker id="2" name="Sarah" timestamp="00:00:50">
      Two sprints. We'll have Google and GitHub providers.
    </speaker>

    <action-item speaker="2" timestamp="00:01:15">
      Sarah to create Jira tickets for OAuth2 implementation
    </action-item>

    <decision timestamp="00:05:30">
      Approved: OAuth2 as Q1 priority, 2-sprint timeline
    </decision>
  </transcript>

  <summary>
    Meeting discussed Q1 roadmap with focus on OAuth2 integration.
    Sarah's team will implement Google and GitHub OAuth in 2 sprints.
    Action items and decisions recorded above.
  </summary>

  <topics>
    <topic>OAuth2 Integration</topic>
    <topic>Q1 Roadmap</topic>
    <topic>Sprint Planning</topic>
  </topics>
</audio-transcription>
```

#### Generate Audio from Text

```xml
<podcast target="audio-transcription" voice="professional-male" gen>
  <intro music="upbeat-tech.mp3" duration="5s">
    Welcome to The Developer Podcast, episode 42.
  </intro>

  <segment>
    <speaker>Today we're discussing Claudiv, the universal
    code generation platform. Claudiv lets you describe
    what you want in natural language, and generates
    working code automatically.</speaker>

    <pause duration="1s" />

    <speaker>Let's see an example. Say you want to build
    a dashboard. You simply write: "Create a dashboard
    with user stats and charts." Claudiv generates
    the complete React component, styled and functional.</speaker>
  </segment>

  <outro music="upbeat-tech.mp3" duration="5s">
    Thanks for listening. Subscribe for more episodes.
  </outro>

  Generate podcast audio with voice synthesis
</podcast>
```

**Generates:** `podcast.mp3` (synthetic voice, with music)

## Complete Example: Multi-Format Workflow

```xml
<documentation-pipeline gen>
  <steps>
    <!-- 1. Extract from PowerPoint presentation -->
    <extract source="presentation.pptx" target="cdml">
      Convert slides to structured .cdml
    </extract>

    <!-- 2. Generate PDF report -->
    <generate target="pdf">
      Professional report from presentation content
    </generate>

    <!-- 3. Generate Markdown docs -->
    <generate target="markdown">
      GitHub README and documentation
    </generate>

    <!-- 4. Generate Excel data -->
    <generate target="excel">
      Charts and metrics as spreadsheet
    </generate>

    <!-- 5. Generate images -->
    <generate target="png">
      Architecture diagrams from slides
    </generate>

    <!-- 6. Generate audio -->
    <generate target="audio-transcription">
      Podcast episode explaining the content
    </generate>

    <!-- 7. Upload to Confluence -->
    <upload target="confluence" mcp-server="atlassian">
      Create Confluence page with all artifacts
    </upload>
  </steps>

  Transform presentation → multiple formats → publish
</documentation-pipeline>
```

**Result:** Complete documentation suite in all formats from single source!

---

**Claudiv: Omni-Format Generation Platform**

*PDF, Excel, PowerPoint, Images, Audio, CSS, Markdown - extract from anything, generate to anything, via natural language specifications.*
