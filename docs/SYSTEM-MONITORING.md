# Claudiv System Monitoring & State Capture

## Overview

Claudiv can capture, monitor, and generate system configurations in .cdml format. This enables:
- **System state snapshots** → .cdml
- **Live monitoring** of file operations → structured reports
- **Configuration generation** from .cdml specs

## Use Cases

### 1. Capture Current System State

Generate a .cdml snapshot of your current system configuration:

```xml
<system-snapshot target="system-state" gen>
  Capture current system state including:
  - Startup programs
  - Running services
  - Environment variables
  - System configurations
  - File mappings
</system-snapshot>
```

**Generates:** `system.cdml`

```xml
<system-state captured="2026-02-14T01:00:00.000Z">
  <hostname>myserver</hostname>
  <os>Linux 5.15.167.4-microsoft-standard-WSL2</os>

  <startup-programs>
    <program name="docker" enabled="true">
      /usr/bin/dockerd
    </program>
    <program name="nginx" enabled="true">
      /usr/sbin/nginx
    </program>
  </startup-programs>

  <services>
    <service name="docker" status="running" enabled="true" />
    <service name="nginx" status="running" enabled="true" />
    <service name="postgresql" status="stopped" enabled="false" />
  </services>

  <environment>
    <var name="PATH">/usr/local/bin:/usr/bin:/bin</var>
    <var name="NODE_ENV">production</var>
    <!-- Sensitive vars like API keys are automatically filtered -->
  </environment>

  <configs>
    <config file="/etc/nginx/nginx.conf" modified="2026-02-01T10:00:00.000Z">
      <![CDATA[
      server {
        listen 80;
        server_name example.com;
        ...
      }
      ]]>
    </config>
  </configs>

  <file-mappings>
    <mapping type="symlink">
      <source>/var/www/app</source>
      <target>/home/deploy/app</target>
    </mapping>
  </file-mappings>
</system-state>
```

### 2. Live Monitoring with Hooks

Monitor file system changes in real-time and generate structured reports:

```xml
<monitor target="live-monitoring" gen>
  <config>
    <track-file-operations>true</track-file-operations>
    <paths>
      /var/log
      /etc
      /home/user/projects
    </paths>
    <start-time>2026-02-14T01:00:00Z</start-time>
    <report-format>markdown</report-format>
  </config>

  Monitor all file operations from now until stopped.
  Generate structured report when monitoring stops.
</monitor>
```

**Usage:**
```bash
# Start monitoring
claudiv monitor app.cdml

# ... system activity happens ...

# Stop monitoring (Ctrl+C)
# Generates: monitoring-report.md
```

**Generated Report:**

```markdown
# System Monitoring Report

**Monitoring Period**: 2026-02-14T01:00:00.000Z - 2026-02-14T02:00:00.000Z
**Total Operations**: 1,247

## Operations by Type

### create (342)

| Timestamp | Path | User | Process |
|-----------|------|------|---------|
| 2026-02-14T01:05:23Z | /var/log/nginx/access.log | www-data | nginx |
| 2026-02-14T01:05:24Z | /home/user/test.txt | user | vim |
...

### modify (678)

| Timestamp | Path | User | Process |
|-----------|------|------|---------|
| 2026-02-14T01:10:15Z | /etc/nginx/nginx.conf | root | nano |
...

### delete (227)

| Timestamp | Path | User | Process |
|-----------|------|------|---------|
| 2026-02-14T01:15:00Z | /tmp/cache-file.tmp | root | cleanup.sh |
...
```

### 3. System Hooks for Live Updates

Define hooks that trigger on specific events:

```xml
<monitoring target="live-monitoring">
  <hooks>
    <!-- Alert on config changes -->
    <hook type="file" event="modify" path="/etc/**/*.conf">
      <action>notify</action>
      <action>log</action>
    </hook>

    <!-- Track service restarts -->
    <hook type="service" event="start">
      <filter>nginx|docker|postgresql</filter>
      <action>log</action>
      <action>report</action>
    </hook>

    <!-- Monitor network activity -->
    <hook type="network" event="all">
      <action>log</action>
    </hook>
  </hooks>

  <report-interval>5m</report-interval>
  <output>monitoring-live.md</output>
</monitoring>
```

### 4. Reverse: Generate System Configs

From a .cdml system state spec, generate actual system configurations:

```xml
<system target="system-config" gen>
  <services>
    <service name="nginx" enabled="true" auto-start="true">
      Configure nginx as reverse proxy for Node.js app
    </service>

    <service name="postgresql" enabled="true" auto-start="true">
      PostgreSQL 15 with UTF-8 encoding
    </service>
  </services>

  <startup-programs>
    <program name="app-server">
      /home/deploy/app/start.sh
    </program>
  </startup-programs>

  <environment>
    <var name="NODE_ENV">production</var>
    <var name="DATABASE_URL">postgresql://localhost/myapp</var>
  </environment>
</system>
```

**Generates:**
- `/etc/systemd/system/nginx.service`
- `/etc/systemd/system/postgresql.service`
- `/etc/systemd/system/app-server.service`
- `/etc/environment` updates
- Systemctl enable commands

### 5. Log Aggregation

Aggregate logs from multiple sources into structured report:

```xml
<log-aggregation target="log-report" gen>
  <sources>
    /var/log/nginx/access.log
    /var/log/nginx/error.log
    /var/log/syslog
    /home/user/app/logs/*.log
  </sources>

  <time-range>
    <start>2026-02-14T00:00:00Z</start>
    <end>2026-02-14T23:59:59Z</end>
  </time-range>

  <filters>
    <level>error,warning</level>
    <exclude>healthcheck</exclude>
  </filters>

  <output-format>markdown</output-format>

  Generate structured report of all errors and warnings
  from the past 24 hours, grouped by severity and source.
</log-aggregation>
```

**Generated Report:**

```markdown
# Log Aggregation Report

**Period**: 2026-02-14 (24 hours)
**Sources**: 4 log files
**Total Events**: 15,234
**Filtered Events**: 342 (errors/warnings)

## Errors by Source

### nginx (127 errors)

| Time | Level | Message |
|------|-------|---------|
| 01:23:45 | error | Connection refused to upstream |
| 02:15:30 | error | 502 Bad Gateway |
...

### Application (215 errors)

| Time | Level | Message | Stack Trace |
|------|-------|---------|-------------|
| 03:45:12 | error | Database connection timeout | ... |
...
```

## CLI Commands

```bash
# Capture system state
claudiv capture system.cdml

# Start live monitoring
claudiv monitor --paths /var/log,/etc --output report.md

# Aggregate logs
claudiv logs --sources "/var/log/**/*.log" --level error --output logs.md

# Generate system config from .cdml
claudiv apply system.cdml --dry-run  # Preview changes
claudiv apply system.cdml             # Apply (requires sudo)

# Reverse: capture specific subsystem
claudiv capture --services system-services.cdml
claudiv capture --env system-env.cdml
claudiv capture --configs system-configs.cdml
```

## Security Considerations

- **Sensitive Data**: API keys, passwords automatically filtered
- **Permissions**: System monitoring may require elevated privileges
- **Audit Trail**: All system changes logged
- **Dry Run**: Test configurations before applying

## Integration with Other Tools

### Docker Container State

```xml
<docker-state target="system-state" gen>
  Capture all running containers, images, volumes, networks
</docker-state>
```

### Kubernetes Cluster State

```xml
<k8s-state target="kubernetes" gen>
  Capture all deployments, services, pods, config maps
</k8s-state>
```

### Git Repository State

```xml
<repo-state target="filesystem" gen>
  Capture git configuration, branches, remotes, hooks
</repo-state>
```

---

**Claudiv: Your System's Universal Specification Language**
