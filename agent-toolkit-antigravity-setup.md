# Set up AWS Agent Toolkit for Antigravity

> Adapted from the official AWS Agent Toolkit setup guide:
> https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/setup-instructions/setup.md
>
> Steps 1–6 are unchanged (they're tool-agnostic AWS CLI setup). Step 7 is adapted to save the AWS rules file to `AGENTS.md` — the cross-tool rules format Antigravity reads natively (v1.20.3+) — instead of `CLAUDE.md`/`.cursor/rules/`/`.kiro/steering/`.

## Overview

Sets up AWS credentials for Antigravity by installing the AWS CLI, authenticating the user, configuring the Agent Toolkit (AWS MCP server + skill catalog), and writing AWS-specific agent rules into this project's `AGENTS.md`.

## Parameters

- **operating_system** (optional): macOS, Linux, or Windows — auto-detected if not provided
- **Region** (required): your default AWS Region. If not given upfront, you must be asked for it before proceeding

Constraints:
- OS must be detected automatically before asking the user anything
- Never ask for AWS access keys/secret keys — auth is entirely via the `aws login` browser flow
- Credentials are valid for 12 hours and renewable for 90 days without re-authenticating in the browser

## Dependencies

- Requires `curl` (macOS/Linux) or PowerShell (Windows)
- Requires internet access to `https://awscli.amazonaws.com`
- If a required tool is missing, stop and ask whether to proceed anyway
- No Node/Python/other runtime needed beyond the shell — the installer is self-contained

## General error handling

If a step fails with something not covered below, show the full error and stop — do not continue to the next step.

---

## Step 1 — Determine operating system

```bash
uname -s          # macOS/Linux
$env:OS           # PowerShell
```

| Symptom | Cause | Fix |
|---|---|---|
| Cannot determine OS | No shell access / unknown environment | Ask the user directly |

→ macOS/Linux go to Step 2 (Unix); Windows goes to Step 2 (Windows).

## Step 2 (macOS/Linux) — Install AWS CLI

```bash
curl -fsSL 'https://awscli.amazonaws.com/v2/install.sh' | bash
export PATH="$HOME/.local/bin:$PATH"

SHELL_RC="$HOME/.bashrc"
if [ "$(basename "$SHELL")" = "zsh" ]; then
  SHELL_RC="$HOME/.zshrc"
fi
echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$SHELL_RC" && source "$SHELL_RC"
```

| Symptom | Cause | Fix |
|---|---|---|
| `command not found: curl` | curl missing | Install via system package manager, retry |
| curl non-zero exit | No network / HTTP error | Check connectivity to the download URL |
| `missing required dependencies` | `unzip`/`pkgutil` missing | Install listed deps, retry |
| `unsupported OS/architecture` | Only Linux x86_64/aarch64 + macOS supported | Cannot proceed on this system |
| `musl-based Linux detected` | Alpine-type distro | Prebuilt binaries won't work — use source install |
| `--system requires root` | Missing sudo | Re-run with `sudo` or omit `--system` |
| `post-install check failed` | PATH issue | Confirm `$HOME/.local/bin` is on PATH, retry |
| Permission denied writing rc file | File permissions | `chmod u+w "$SHELL_RC"` |
| RC file doesn't exist | Fresh system | `touch "$SHELL_RC"` first, then retry |

## Step 2 (Windows) — Install AWS CLI

```powershell
irm 'https://awscli.amazonaws.com/v2/install.ps1' | iex
```

| Symptom | Cause | Fix |
|---|---|---|
| `irm`/`iex` not recognized | Running in cmd.exe | Re-run from PowerShell |
| Download/network failure | No connectivity / firewall | Verify access to the URL |
| `-System requires admin` | Not elevated | Re-run elevated, or omit `-System` |
| `msiexec failed` | MSI install error | Check Windows Event Log; ensure no other AWS CLI installer is running |
| `post-install check failed` | PATH not refreshed | Restart shell, retry |
| `LOCALAPPDATA is not set` | Rare env issue | Set it, or use `-System` |

## Step 3 — Log in to AWS

```bash
aws configure set region <your-region>
aws login --region <your-region>
```

A browser window opens for sign-in. Wait for it to complete before continuing.

| Symptom | Cause | Fix |
|---|---|---|
| Region not provided | Not specified upfront | Ask, then `aws configure set region <value>` |
| `command not found: aws` | PATH not set | Re-export PATH, retry |
| `aws login` non-zero exit | Browser closed early / timeout | Re-run `aws login` |
| Browser didn't open | Headless env / no default browser | Copy the printed URL and open it manually |

## Step 4 — Verify access

```bash
aws sts get-caller-identity
```
Should return AccountId, Arn, UserId.

| Symptom | Cause | Fix |
|---|---|---|
| `Unable to locate credentials` / `ExpiredToken` | Login didn't complete | Re-run Step 3 |
| `command not found: aws` | PATH issue | Re-export PATH, retry |

## Step 5 — Install the Agent Toolkit

```bash
aws configure agent-toolkit --yes --region us-east-1
```
> Agent Toolkit currently only runs in `us-east-1` — use it here regardless of your actual working Region.

| Symptom | Cause | Fix |
|---|---|---|
| `--yes` unrecognized | Old CLI version | Retry without the flag: `aws configure agent-toolkit --region us-east-1` |
| Exit 253 / "requires interactive terminal" | Non-interactive shell (e.g. run by an agent) | Run `aws configure agent-toolkit --region us-east-1` yourself in a real terminal (~30s wizard), then confirm back to continue |
| Credentials error | Session expired mid-setup | Re-run Step 3, then retry Step 5 |

## Step 6 — Verify installation

```bash
aws agent-toolkit list-available-skills --region us-east-1
```
Should return a JSON list of skills (name, description, version, categories).

| Symptom | Cause | Fix |
|---|---|---|
| Credentials error | Session expired | Re-run Step 3, retry |
| `invalid choice`/unrecognized arg | CLI too old | Re-run Step 2 to update, retry |

## Step 7 — Install AWS rules into Antigravity *(adapted step)*

Antigravity reads project rules from **`AGENTS.md`** at the project root (native support since v1.20.3), and optionally global rules from `~/.gemini/GEMINI.md` or workspace-scoped rules from `.agent/rules/*.md`.

Fetch the rules content and save it to `AGENTS.md` in the project root:

```bash
curl -fsSL 'https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/rules/aws-agent-rules.md' -o AGENTS.md
```

If an `AGENTS.md` already exists with other project context, append instead of overwrite:

```bash
curl -fsSL 'https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/rules/aws-agent-rules.md' >> AGENTS.md
```

For a rule that should apply to **every** project rather than just this one, save it to `~/.gemini/GEMINI.md` instead (note: `GEMINI.md` takes precedence over `AGENTS.md` on conflicting rules).

| Symptom | Cause | Fix |
|---|---|---|
| HTTP 404 / download failure | URL changed, or no connectivity | Check network; verify the URL is still valid on GitHub |
| Permission denied saving file | No write access to project root | Check/fix directory permissions |
| `mkdir` needed | `.agent/rules/` doesn't exist yet | `mkdir -p .agent/rules` |
| Antigravity doesn't pick up the file | Wrong path, or IDE needs a fresh session | Confirm `AGENTS.md` is at the project root; restart the Antigravity session |

**On success:** tell the user setup is complete and to start a new Antigravity session so it picks up `AGENTS.md` and the newly configured AWS MCP server before creating any AWS resources.

---

## Notes specific to this project (CampusPulse)

- Run this from your **local machine** (or wherever Antigravity's agent has real network/browser access) — it cannot be run inside a network-isolated chat sandbox.
- Once set up, the AWS MCP server it installs is what will let an Antigravity agent directly create/inspect the Lambda functions, DynamoDB tables, and RDS instance described in `database.md` and `module-details.md`, rather than you pasting AWS CLI output back and forth manually.
- Keep the Region you configure here consistent with the Region you actually deploy CampusPulse's resources into (the Agent Toolkit itself only runs in `us-east-1`, but that's separate from where your app's S3/Lambda/RDS/DynamoDB live).
