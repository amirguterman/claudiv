# Claudiv External Integrations & Automation

## Overview

Claudiv connects to external systems via **MCP (Model Context Protocol)** servers, enabling:
- QA automation and testing
- Debugging and diagnostics
- Desktop GUI control
- Remote repository operations
- Project management (Jira, GitHub Issues)
- Communication (Slack, Email)
- And any MCP-enabled service

## MCP Integration Architecture

```xml
<claudiv-config>
  <mcp-servers>
    <!-- Desktop Control -->
    <server name="desktop" url="http://localhost:3100/mcp">
      Provides GUI automation capabilities
    </server>

    <!-- Atlassian (Jira, Confluence) -->
    <server name="atlassian" url="http://localhost:3101/mcp">
      Jira issues, Confluence pages
    </server>

    <!-- Slack -->
    <server name="slack" url="http://localhost:3102/mcp">
      Send messages, manage channels
    </server>

    <!-- Email -->
    <server name="email" url="http://localhost:3103/mcp">
      Send/receive emails
    </server>

    <!-- Remote Git -->
    <server name="github" url="http://localhost:3104/mcp">
      Repository operations, PRs, issues
    </server>
  </mcp-servers>
</claudiv-config>
```

## 1. QA Automation & Testing

### Generate Test Suites

```xml
<qa-automation target="test-suite" framework="playwright" gen>
  <test-scenario name="User Login Flow">
    1. Navigate to /login
    2. Enter email: test@example.com
    3. Enter password: ********
    4. Click "Login" button
    5. Verify redirected to /dashboard
    6. Verify "Welcome back" message displayed
  </test-scenario>

  <test-scenario name="Shopping Cart">
    1. Add 3 items to cart
    2. Navigate to /cart
    3. Verify cart shows 3 items
    4. Update quantity of item #2 to 5
    5. Verify total price updated
    6. Click "Checkout"
  </test-scenario>

  Generate complete Playwright test suite with:
  - Page object models
  - Test fixtures
  - Retry logic
  - Screenshot on failure
</qa-automation>
```

**Generates:** `tests/e2e/user-flows.spec.ts`

### Execute Tests via MCP

```xml
<test-execution target="qa-automation" mcp-server="desktop">
  <run-tests>
    <suite>tests/e2e/user-flows.spec.ts</suite>
    <browser>chromium</browser>
    <headless>false</headless>
    <record-video>true</record-video>
  </run-tests>

  Execute tests and generate structured report
</test-execution>
```

**Generated Report:**

```markdown
# Test Execution Report

**Suite**: User Flows
**Browser**: Chromium
**Duration**: 45.3s

## Results

✅ User Login Flow (12.1s)
  - Navigate to /login ✓
  - Enter credentials ✓
  - Click login ✓
  - Verify dashboard ✓

❌ Shopping Cart (15.2s)
  - Add items ✓
  - Navigate to cart ✓
  - Verify cart contents ✓
  - Update quantity ✗ (timeout)
    Screenshot: screenshots/cart-update-fail.png

**Pass Rate**: 50% (1/2 tests)
**Failures**: 1
```

## 2. Debugging & Diagnostics

### Generate Debug Traces

```xml
<debugging target="debug-trace" gen>
  <issue>
    User reports "Cart update fails" on production
  </issue>

  <capture>
    - Network requests during cart update
    - Browser console logs
    - Redux state changes
    - API response payloads
    - Stack traces
  </capture>

  Generate comprehensive debug report with reproduction steps
</debugging>
```

### Interactive Debugging Session

```xml
<debug-session target="debugging" mcp-server="desktop">
  <breakpoints>
    <file>src/cart/CartService.ts</file>
    <line>42</line>
  </breakpoints>

  <actions>
    1. Run app in debug mode
    2. Navigate to /cart
    3. Trigger cart update
    4. Pause at breakpoint
    5. Inspect variables: cartItems, totalPrice
    6. Step through updateQuantity() function
    7. Capture state at each step
  </actions>

  Generate debugging report with variable snapshots
</debug-session>
```

## 3. Desktop GUI Control via MCP

### Automate Desktop Applications

```xml
<desktop-automation target="gui-automation" mcp-server="desktop" gen>
  <application>Visual Studio Code</application>

  <workflow>
    1. Launch VSCode
    2. Open folder: /home/user/projects/myapp
    3. Open file: src/index.ts
    4. Search for: "function login"
    5. Replace with: "async function login"
    6. Save file
    7. Run command: "npm test"
    8. Capture test output
  </workflow>

  Automate VSCode editing and testing workflow
</desktop-automation>
```

### Screenshot & OCR

```xml
<desktop-capture target="documentation" mcp-server="desktop" gen>
  <capture-workflow>
    1. Open application: Chrome
    2. Navigate to: https://app.example.com
    3. Take screenshot: step1-login.png
    4. Click button: "Sign Up"
    5. Take screenshot: step2-signup.png
    6. Fill form fields
    7. Take screenshot: step3-complete.png
  </capture-workflow>

  <ocr>true</ocr>
  <annotations>true</annotations>

  Generate user guide with annotated screenshots
</desktop-capture>
```

## 4. Remote Git Operations

### Clone Entire Repository

```xml
<remote-git target="filesystem" mcp-server="github" gen>
  <repository>https://github.com/user/myapp</repository>

  <actions>
    1. Clone repository
    2. Checkout branch: develop
    3. Generate .cdml representation of entire codebase
    4. Include: directory structure, file contents, git history
  </actions>

  Generate complete myapp.cdml from remote repository
</remote-git>
```

**Generated:** `myapp.cdml`

```xml
<repository url="https://github.com/user/myapp" branch="develop">
  <structure>
    <dir name="src">
      <file name="index.ts" target="typescript">
        <content><![CDATA[
          import express from 'express';
          const app = express();
          ...
        ]]></content>
      </file>
    </dir>
  </structure>

  <git-history>
    <commit hash="a1b2c3d" author="user" date="2026-02-01">
      feat: add user authentication
    </commit>
  </git-history>
</repository>
```

### Create Pull Requests

```xml
<pull-request target="github" mcp-server="github" gen>
  <repository>user/myapp</repository>
  <base>main</base>
  <head>feature/new-auth</head>

  <title>Add OAuth2 authentication</title>

  <description>
    ## Changes
    - Implement OAuth2 flow
    - Add Google and GitHub providers
    - Update login UI

    ## Testing
    - All existing tests pass
    - Added new OAuth tests
    - Manual testing completed

    ## Screenshots
    [Include screenshots from desktop-capture]
  </description>

  <reviewers>john, sarah</reviewers>
  <labels>feature, auth</labels>

  Create pull request and assign reviewers
</pull-request>
```

## 5. Jira Integration

### Create Issues from .cdml

```xml
<jira-issues target="jira" mcp-server="atlassian" gen>
  <project>MYAPP</project>

  <issue type="bug" priority="high">
    <summary>Cart update fails on production</summary>
    <description>
      ## Steps to Reproduce
      1. Add items to cart
      2. Update quantity
      3. Observe failure

      ## Expected
      Quantity should update

      ## Actual
      Request times out

      ## Debug Info
      [Attach debug-trace from debugging section]
    </description>
    <assignee>john@example.com</assignee>
    <labels>production, urgent</labels>
  </issue>

  <issue type="story">
    <summary>Implement OAuth2 authentication</summary>
    <description>
      As a user, I want to login with Google/GitHub
      so that I don't need to create a new account.

      ## Acceptance Criteria
      - [ ] Google OAuth integration
      - [ ] GitHub OAuth integration
      - [ ] Existing users can link accounts

      ## Technical Notes
      [Link to design doc]
    </description>
    <story-points>8</story-points>
    <sprint>Sprint 24</sprint>
  </issue>

  Create Jira issues and link them
</jira-issues>
```

### Query Issues

```xml
<jira-query target="report" mcp-server="atlassian" gen>
  <jql>
    project = MYAPP AND status = "In Progress" AND assignee = currentUser()
  </jql>

  <format>markdown</format>

  Generate status report of my current work items
</jira-query>
```

**Generated:** `my-tasks.md`

```markdown
# My Current Tasks

## In Progress (5)

### MYAPP-123: Cart update fixes
**Priority**: High | **Due**: 2026-02-15
[View in Jira](https://jira.example.com/browse/MYAPP-123)

### MYAPP-124: OAuth2 implementation
**Priority**: Medium | **Due**: 2026-02-20
[View in Jira](https://jira.example.com/browse/MYAPP-124)
...
```

## 6. Slack Integration

### Send Notifications

```xml
<slack-notification target="slack" mcp-server="slack" gen>
  <channel>#deployments</channel>

  <message>
    🚀 **Deployment Complete**

    **Environment**: Production
    **Version**: v2.3.0
    **Deployed by**: @user
    **Status**: ✅ Success

    **Changes**:
    - OAuth2 authentication
    - Cart bug fixes
    - Performance improvements

    **Tests**: All passing (142/142)
    **Rollback**: Available via `/rollback v2.2.9`

    [View deployment logs](https://ci.example.com/deploy/123)
  </message>

  <mentions>@devops @team-leads</mentions>
  <thread-reply>DEPLOY-456</thread-reply>

  Send deployment notification to Slack
</slack-notification>
```

### Create Slack Workflows

```xml
<slack-workflow target="slack" mcp-server="slack" gen>
  <trigger>
    <keyword>!deploy</keyword>
    <channel>#ops</channel>
  </trigger>

  <actions>
    1. Parse command: !deploy <environment> <version>
    2. Validate permissions
    3. Trigger deployment pipeline
    4. Monitor progress
    5. Send status updates
    6. Notify on completion
  </actions>

  Create ChatOps deployment workflow
</slack-workflow>
```

## 7. Email Integration

### Send Automated Emails

```xml
<email-campaign target="email" mcp-server="email" gen>
  <template name="weekly-digest">
    <subject>Your Weekly Development Summary</subject>

    <body format="html">
      <h1>Week of {{ weekStart }}</h1>

      <h2>Completed</h2>
      <ul>
        {{ #each completedIssues }}
        <li>{{ this.title }} ({{ this.assignee }})</li>
        {{ /each }}
      </ul>

      <h2>In Progress</h2>
      {{ progressChart }}

      <h2>Upcoming Deadlines</h2>
      {{ deadlinesTable }}
    </body>
  </template>

  <recipients>
    <group>team@example.com</group>
    <cc>manager@example.com</cc>
  </recipients>

  <schedule>
    <frequency>weekly</frequency>
    <day>Friday</day>
    <time>17:00</time>
  </schedule>

  <data-sources>
    <jira>project = MYAPP AND updated >= -7d</jira>
    <github>commits in last 7 days</github>
  </data-sources>

  Generate and schedule weekly digest emails
</email-campaign>
```

## Complete Integration Example

### End-to-End Automated Workflow

```xml
<workflow target="automation" gen>
  <name>Bug Report to Fix Deployment</name>

  <steps>
    <!-- 1. User reports bug via Slack -->
    <slack-trigger mcp-server="slack">
      <channel>#bugs</channel>
      <pattern>!bug *</pattern>
    </slack-trigger>

    <!-- 2. Create Jira issue -->
    <create-jira-issue mcp-server="atlassian">
      <parse-from-slack />
      <assign-to-queue />
    </create-jira-issue>

    <!-- 3. Reproduce issue (desktop automation) -->
    <reproduce-bug mcp-server="desktop">
      <follow-steps-from-report />
      <capture-screenshots />
      <record-video />
    </reproduce-bug>

    <!-- 4. Generate debug trace -->
    <debug-trace>
      <capture-network />
      <capture-console />
      <capture-state />
    </debug-trace>

    <!-- 5. Attach to Jira -->
    <update-jira mcp-server="atlassian">
      <attach-screenshots />
      <attach-debug-trace />
      <update-description />
    </update-jira>

    <!-- 6. Clone repository -->
    <clone-repo mcp-server="github">
      <branch>bugfix/{{ jiraKey }}</branch>
    </clone-repo>

    <!-- 7. Generate fix (AI) -->
    <generate-fix target="typescript">
      <analyze-debug-trace />
      <propose-solution />
      <generate-tests />
    </generate-fix>

    <!-- 8. Run tests (desktop automation) -->
    <run-tests mcp-server="desktop">
      <suite>generated tests</suite>
      <verify-fix />
    </run-tests>

    <!-- 9. Create pull request -->
    <create-pr mcp-server="github">
      <title>Fix: {{ jiraKey }} - {{ issueSummary }}</title>
      <link-jira-issue />
      <assign-reviewers />
    </create-pr>

    <!-- 10. Notify team (Slack) -->
    <notify-slack mcp-server="slack">
      <channel>#bugs</channel>
      <message>
        ✅ Bug {{ jiraKey }} fixed and PR created
        [View PR]({{ prUrl }})
      </message>
    </notify-slack>

    <!-- 11. Send email to reporter -->
    <send-email mcp-server="email">
      <to>{{ bugReporter }}</to>
      <subject>Bug {{ jiraKey }} has been fixed</subject>
      <body>
        Your reported bug has been fixed and is under review.
        Expected in next release.
      </body>
    </send-email>
  </steps>

  Fully automated bug-to-fix-to-deployment workflow
</workflow>
```

## MCP Server Configuration

### Required MCP Servers

```bash
# Install MCP servers
npm install -g @modelcontextprotocol/server-desktop
npm install -g @modelcontextprotocol/server-atlassian
npm install -g @modelcontextprotocol/server-slack
npm install -g @modelcontextprotocol/server-email
npm install -g @modelcontextprotocol/server-github

# Start servers
mcp-server-desktop --port 3100
mcp-server-atlassian --port 3101 --token $JIRA_TOKEN
mcp-server-slack --port 3102 --token $SLACK_TOKEN
mcp-server-email --port 3103 --smtp $SMTP_CONFIG
mcp-server-github --port 3104 --token $GITHUB_TOKEN
```

### Claudiv Config

```xml
<claudiv-config>
  <mcp-servers>
    <server name="desktop" url="http://localhost:3100/mcp" />
    <server name="atlassian" url="http://localhost:3101/mcp">
      <auth token="env:JIRA_TOKEN" />
    </server>
    <server name="slack" url="http://localhost:3102/mcp">
      <auth token="env:SLACK_TOKEN" />
    </server>
    <server name="email" url="http://localhost:3103/mcp">
      <auth smtp="env:SMTP_CONFIG" />
    </server>
    <server name="github" url="http://localhost:3104/mcp">
      <auth token="env:GITHUB_TOKEN" />
    </server>
  </mcp-servers>
</claudiv-config>
```

---

**Claudiv: The Universal Automation Platform**

*From system state to Slack messages, from desktop GUIs to remote repos - describe anything, automate everything.*
